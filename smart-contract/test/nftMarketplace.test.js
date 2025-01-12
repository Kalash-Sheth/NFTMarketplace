const { expect } = require("chai");

describe("NFTMarketplace", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const [owner, recipient] = await ethers.getSigners(); // Ensure you are defining recipients from the signers
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy();
    await marketplace.deployed(); // Ensures deployment is completed and the contract is ready to interact

    const tokenURI = "https://token-uri.com/nft";
    await marketplace.mintNFT(recipient.address, tokenURI); // Mint an NFT to recipient

    expect(await marketplace.getBalance(recipient.address)).to.equal(1); // Check if the recipient got the NFT
  });
});