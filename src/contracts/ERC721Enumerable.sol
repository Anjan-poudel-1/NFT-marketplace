// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import './ERC721.sol';
import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is IERC721Enumerable,ERC721{


    uint[] private _allTokens; 

    //mapping from tokenId to position in _allTokens array 

    mapping(uint=>uint) private _allTokensIndex;
    //mapping of owner to list of all owner token ids

    mapping(address=>uint[]) private _ownedTokens;

    //mapping from token ID to index of the owner tokens list
    mapping(uint=>uint) private _ownedTokensIndex; 

     constructor(){
        _registerInterface(bytes4(keccak256('totalSupply(bytes4)')^ keccak256('tokenByIndex(bytes4)') ^ keccak256('tokenOfOwnerByIndex(bytes4)')));
    }


    function totalSupply() public override view returns (uint256){
        return _allTokens.length;
    }

    /// @notice Enumerate valid NFTs
    /// @dev Throws if `_index` >= `totalSupply()`.
    /// @param _index A counter less than `totalSupply()`
    /// @return The token identifier for the `_index`th NFT,
    ///  (sort order not specified)
    function tokenByIndex(uint256 _index) external override view returns (uint256){
        require((totalSupply()>_index &&  _index>0),"Index out of bounds");
        return _allTokens[_index];
    }

    /// @notice Enumerate NFTs assigned to an owner
    /// @dev Throws if `_index` >= `balanceOf(_owner)` or if
    ///  `_owner` is the zero address, representing invalid NFTs.
    /// @param _owner An address where we are interested in NFTs owned by them
    /// @param _index A counter less than `balanceOf(_owner)`
    /// @return The token identifier for the `_index`th NFT assigned to `_owner`,
    ///   (sort order not specified)
    function tokenOfOwnerByIndex(address _owner, uint256 _index) external override view returns (uint256){
         uint totalCountOfOwnerArr = balanceOf(_owner);
         require(totalCountOfOwnerArr>_index && _index>0);
         return _ownedTokens[_owner][_index];
    }


    //Overriding
    function  _mint(address to , uint tokenId) internal override(ERC721){


        //add token to the totalsupply
        _addTokensToAllTokenEnumeration(tokenId);
        _addTokensToOwnerEnumeration(tokenId,to);

        super._mint(to,tokenId);
        //add tokens to the owner

    }
    function  _addTokensToOwnerEnumeration(uint tokenId,address to) private{
                uint[] storage tempOwnedArr = _ownedTokens[to];
                
                _ownedTokensIndex[tokenId] = tempOwnedArr.length;

                tempOwnedArr.push(tokenId);

                _ownedTokens[to] = tempOwnedArr;
    }

    function _addTokensToAllTokenEnumeration(uint tokenId) private{
                _allTokensIndex[tokenId] = _allTokens.length;  
                _allTokens.push(tokenId);

                //For owner 

               


    }


}