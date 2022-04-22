"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timeStamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timeStamp = timeStamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timeStamp, data) => CryptoJs.SHA256(index + previousHash + timeStamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timeStamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "33033003003", "", "Hello", 123456);
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const nextTimeStamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimeStamp, data);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
// console.log(createNewBlock("hello"), createNewBlock("bye bye"));
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timeStamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        // console.log("validateStructure");
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        // console.log("index");
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        // console.log("previousHash");
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        // console.log("hash");
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
createNewBlock("fifth block");
console.log(blockChain);
//# sourceMappingURL=index.js.map