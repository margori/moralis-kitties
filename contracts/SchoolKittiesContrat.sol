// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";
import "./Address.sol";

contract SchoolKittiesContract is IERC721, Ownable {
    using Address for address;

    string private _name;
    string private _symbol;
    uint32 private _maxGen0Count;

    event Birth(
        address owner,
        uint256 kittenId,
        uint256 momId,
        uint256 dadId,
        uint256 dna,
        uint256 generation
    );

    struct Kitty {
        uint256 dna;
        uint64 birthStamp;
        uint32 momId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty[] kitties;
    uint32 gen0Count;

    mapping(uint256 => address) ownerships;
    mapping(address => uint256) ownershipCount;
    mapping(uint256 => address) approved;
    mapping(address => mapping(address => bool)) operators;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxGen0Count_
    ) Ownable() {
        _name = name_;
        _symbol = symbol_;
        _maxGen0Count = uint32(maxGen0Count_);
    }

    modifier kittyExists(uint256 tokenId) {
        require(tokenId < kitties.length);
        _;
    }

    modifier isAllowed(address operator, uint256 tokenId) {
        require(
            _owns(operator, tokenId) ||
                operators[ownerships[tokenId]][operator] ||
                approved[tokenId] == operator
        );
        _;
    }

    modifier notAddressZero(address address_) {
        require(address_ != address(0));
        _;
    }

    modifier notThisContract(address address_) {
        require(address_ != address(this));
        _;
    }

    // privates

    function setName(string memory name_) public onlyOwner {
        _name = name_;
    }

    function setSymbol(string memory symbol_) public onlyOwner {
        _symbol = symbol_;
    }

    function setMaxGen0Count(uint256 maxGen0Count_) public onlyOwner {
        _maxGen0Count = uint32(maxGen0Count_);
    }

    function _createKitty(
        uint256 momId_,
        uint256 dadId_,
        uint256 generation_,
        uint256 dna_,
        address owner_
    ) private returns (uint256) {
        Kitty memory newKitty = Kitty({
            momId: uint32(momId_),
            dadId: uint32(dadId_),
            dna: dna_,
            generation: uint16(generation_),
            birthStamp: uint64(block.timestamp)
        });

        kitties.push(newKitty);
        uint256 newKittenId = kitties.length - 1;
        _tranfer(address(0), owner_, newKittenId);
        emit Birth(owner_, newKittenId, momId_, dadId_, dna_, generation_);
        return newKittenId;
    }

    function _tranfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        require(to != address(0));

        // new kitties are not owned, then no decrease
        if (from != address(0)) {
            ownershipCount[from]--;
            delete approved[tokenId];
        }
        ownershipCount[to]++;
        ownerships[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }

    function _owns(address claimant, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        return ownerships[tokenId] == claimant;
    }

    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try
                IERC721Receiver(to).onERC721Received(
                    _msgSender(),
                    from,
                    tokenId,
                    _data
                )
            returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert(
                        "ERC721: transfer to non ERC721Receiver implementer"
                    );
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    // externals

    function balanceOf(address owner) external view returns (uint256 balance) {
        balance = ownershipCount[owner];
    }

    function totalSupply() external view returns (uint256 total) {
        total = kitties.length;
    }

    function name() external view returns (string memory tokenName) {
        tokenName = _name;
    }

    function symbol() external view returns (string memory tokenSymbol) {
        tokenSymbol = _symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        address _owner = ownerships[tokenId];
        require(_owner != address(0));
        owner = _owner;
    }

    function getKitty(uint256 tokenId)
        external
        view
        returns (Kitty memory kitty)
    {
        kitty = kitties[tokenId];
    }

    function createKittyGen0(uint256 dna) public onlyOwner {
        require(gen0Count < _maxGen0Count);
        gen0Count++;
        _createKitty(0, 0, 0, dna, msg.sender);
    }

    function transfer(address to, uint256 tokenId)
        external
        notAddressZero(to)
        notThisContract(to)
    {
        require(_owns(msg.sender, tokenId));

        _tranfer(msg.sender, to, tokenId);
    }

    function approve(address _approved, uint256 _tokenId)
        external
        kittyExists(_tokenId)
        isAllowed(msg.sender, _tokenId)
    {
        approved[_tokenId] = _approved;

        emit Approval(msg.sender, _approved, _tokenId);
    }

    function getApproved(uint256 _tokenId)
        external
        view
        kittyExists(_tokenId)
        returns (address)
    {
        return approved[_tokenId];
    }

    function setApprovalForAll(address _operator, bool _approved)
        external
        notAddressZero(_operator)
    {
        require(msg.sender != _operator);

        operators[msg.sender][_operator] = _approved;

        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function isApprovedForAll(address _owner, address _operator)
        external
        view
        returns (bool)
    {
        return operators[_owner][_operator];
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    )
        public
        notAddressZero(_to)
        notThisContract(_to)
        kittyExists(_tokenId)
        isAllowed(msg.sender, _tokenId)
    {
        require(_owns(_from, _tokenId));
        _tranfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) public virtual override {
        transferFrom(_from, _to, _tokenId);
        require(
            _checkOnERC721Received(_from, _to, _tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public virtual override {
        safeTransferFrom(_from, _to, _tokenId, "");
    }
}
