// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract NFTMarketplace is ERC721URIStorage {
    using EnumerableSet for EnumerableSet.UintSet;

    uint256 private _tokenIdTracker;
    mapping(address => EnumerableSet.UintSet) private _ownedTokens;

    constructor() ERC721("NFTMarketplace", "NFTMKT") {
        _tokenIdTracker = 0;
    }

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIdTracker += 1;
        uint256 newItemId = _tokenIdTracker;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _ownedTokens[recipient].add(newItemId);
        return newItemId;
    }

    function transferNFT(address from, address to, uint256 tokenId) public {
        super.transferFrom(from, to, tokenId);
        _ownedTokens[from].remove(tokenId);
        _ownedTokens[to].add(tokenId);
    }

    function getBalance(address owner) public view returns (uint256) {
        return _ownedTokens[owner].length();
    }

    function getTokenIDs(address owner) public view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](_ownedTokens[owner].length());
        for (uint i = 0; i < _ownedTokens[owner].length(); i++) {
            ids[i] = _ownedTokens[owner].at(i);
        }
        return ids;
    }

    // New function to retrieve metadata of owned tokens
    function getOwnedTokensMetadata(address owner) public view returns (string[] memory) {
        uint256[] memory ids = getTokenIDs(owner);
        string[] memory uris = new string[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            uris[i] = tokenURI(ids[i]);
        }
        return uris;
    }
}
