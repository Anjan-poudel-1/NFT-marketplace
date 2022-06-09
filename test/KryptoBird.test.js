const {assert} = require('chai');

const KryptoBird = artifacts.require('KryptoBird');
require('chai').use(require('chai-as-promised')).should();

contract('KryptoBird testing',async(accounts)=>{

    let contract;
    beforeEach(async()=>{
        contract = await KryptoBird.deployed();
    })


describe('deployment',()=>{

  
    it('deployment successful',async()=>{
       let address = contract.address;
       assert.ok(address);
    });

    it('Test Metadata',async()=>{
        let name =await contract.name();
        let symbol =await contract.symbol();
        assert(name,'KryptoBird');
        assert(symbol,'KBIRDZ');
    })



})

describe('minting',()=>{
   it('Create a new token',async()=>{
       let result1= await contract.mint('New data');
       let result2= await contract.mint('New data2');

       let totalSupply = await contract.totalSupply();
     
       assert.equal(totalSupply,2);

       //for events .. here transfer event runs
       const event = result1.logs[0].args;
    //    console.log(event);
       assert.equal(event._from,'0x0000000000000000000000000000000000000000');
       assert.equal(event._to,accounts[0]);

       //For failure
       await contract.mint('New data').should.be.rejected;

   })

})

describe('indexing',()=>{
    it('Lists KryptoBirdz',async()=>{
        //Mint new tokens
        await contract.mint('New data3');

        const totalSupply  = await contract.totalSupply();

        //Loop through the tokens 

        let result = [];
        let KryptoBird;
        let temparr = await (contract.getKryptoArr());
        for(i = 0; i <totalSupply; i++){
            KryptoBird = temparr[i];
            result.push(KryptoBird);
        }

        let expected = ['New data','New data2','New data3'];

        assert.equal(result.join(','),expected.join(','));

    })
})

})