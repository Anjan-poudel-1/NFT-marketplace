// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import './ERC721Connector.sol';

contract KryptoBird is ERC721Connector{

    //array to store NFTs.
    string[] public kryptoBirdz;
    mapping (string => bool) kryptoExists;


    function getKryptoArr() public view returns(string[] memory){

        return kryptoBirdz;
    }

    function mint(string memory kryptobird) public{

        require(!kryptoExists[kryptobird],"Error, the kyrptobird already exist");
        
        kryptoBirdz.push(kryptobird);
        uint _id =kryptoBirdz.length-1;
        _mint(msg.sender, _id);

        kryptoExists[kryptobird] = true;

    }

constructor() ERC721Connector('KryptoBird','KBIRDZ'){

}
    

}