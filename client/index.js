const web3 = new Web3(Web3.givenProvider);

let user;
let instance;
const contractAddress = '0x028F98445e50B19D0A8bE84824cc23cFFb873C3e';

$(document).ready(() => {
  window.ethereum.enable().then((accounts) => {
    console.log('Connected to ethereum network');

    user = accounts[0];
    instance = new web3.eth.Contract(abi, contractAddress, { from: user });

    instance.events.Birth().on('data', function (event) {
      showMessage('Kitty created successfully');
    });
  });
});
