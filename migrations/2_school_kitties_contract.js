const SchoolKittiesContract = artifacts.require('SchoolKittiesContract');

module.exports = function (deployer) {
  deployer.deploy(SchoolKittiesContract, 'School Kitties', 'SKI', 10);
};
