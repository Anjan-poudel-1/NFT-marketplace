// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;
import './interfaces/IERC165.sol';
import './interfaces/IERC721.sol';
import './ERC165.sol';
/*
building a minting function 
    a. nft to point out to an address
    b. keep track og the token ids
    c. Keep track of token owner addresses
    d. Keep track og how many tokens an owner has
    e. create an event that emits a transfer log - contract address, 
    where it is being minted to , the id
*/

contract ERC721 is ERC165,IERC721{

   

    //To keep track of which token id is related to whom
    mapping(uint =>address) private _tokenOwner;

    //To keep track of the number of token particular id has
    mapping(address=>uint) private _ownedTokensCount;

    //Mapping from token Id to approved addresses
    mapping(uint=>address) private _tokenApprovals;


 constructor(){
        _registerInterface(bytes4(keccak256('balanceOf(bytes4)')^ keccak256('ownerOf(bytes4)') ^ keccak256('transferFrom(bytes4)')));
    }


    function balanceOf(address _owner) public override view returns(uint) {
        require(_owner!=address(0), 'Owner shouldnt be here');
        return _ownedTokensCount[_owner];
    }

    function ownerOf(uint _tokenId) public override view returns(address){

        address owner =  _tokenOwner[_tokenId];
        require(owner!=address(0));
        return owner;


    }

    function  _mint(address to , uint tokenId) internal virtual{

        require(to!= address(0), 'ERC721 : minting to the zero address');
        require(!_exists(tokenId), 'ERC721: token already minted');
      
      //Adding 1 to the owner count of token
        _tokenOwner[tokenId] = to;

        //Minting
        //Adding 1 to the owner count of token
        uint currentCount = _ownedTokensCount[to];
        _ownedTokensCount[to] = currentCount+1;

        emit Transfer(address(0),to,tokenId);
        
    }

      function _transferFrom(address _from, address _to, uint256 _tokenId) internal{
         
          require(_from!=address(0),"Invalid transfer address");
          address tempOwner = ownerOf(_tokenId);
          require(tempOwner==_from,"Owner doesnt have the NFT");

         
          _tokenOwner[_tokenId] = _to;
          _ownedTokensCount[_from] -= 1; 
          _ownedTokensCount[_to] += 1; 

              emit Transfer(_from,_to,_tokenId);
      }

      function transferFrom(address _from, address _to, uint256 _tokenId) public override{
         require(isApprovedOrOwner(msg.sender, _tokenId));
          _transferFrom(_from,_to,_tokenId);
      }

        //require that the person approving is the owner
        //we are approving an address to a token
        //require that we cannot send token from owner to owner

      function approve(address _to , uint _tokenId) public{
            address owner = ownerOf(_tokenId);
            require(_to!=owner,'You cant approve your address');
            require(msg.sender==owner,'You are not the owner');

            emit Approval(owner, _to, _tokenId);
      }

      function  isApprovedOrOwner(address spender,uint tokenId) internal view returns(bool){
          require(_exists(tokenId),'token doesnot exist');
          address owner = ownerOf(tokenId);
          return (spender==owner);

      }



    function _exists(uint tokenId) internal view returns(bool){
        address owner = _tokenOwner[tokenId];
        return (owner!=address(0));
    }

}