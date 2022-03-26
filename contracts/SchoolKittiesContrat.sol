// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./IERC721.sol";
import "./Ownable.sol";

contract SchoolKittiesContract is IERC721, Ownable {
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

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxGen0Count_
    ) Ownable() {
        _name = name_;
        _symbol = symbol_;
        _maxGen0Count = uint32(maxGen0Count_);
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

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0));
        require(to != address(this));
        require(_owns(msg.sender, tokenId));

        _tranfer(msg.sender, to, tokenId);
    }
}
