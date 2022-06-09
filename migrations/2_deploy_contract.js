const KryptoBird = artifacts.require("KryptoBird");
//getting it from the json file KryptoBird. It hasnt been made.Will be built once compiled
module.exports = function(deployer){
    deployer.deploy(KryptoBird);
}

