const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0; 
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }

    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`✅ Block ${this.index} Mined! Hash: ${this.hash} (Nonce: ${this.nonce})`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5; 
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2026", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
}

// --- RUNNING THE PROJECT ---
const myCrypto = new Blockchain();

console.log("Starting the miner...");

console.log("\n--- Mining block 1 ---");
myCrypto.addBlock(new Block(1, "20/04/2026", { amount: 50 }));

console.log("\n--- Mining block 2 ---");
myCrypto.addBlock(new Block(2, "21/04/2026", { amount: 100 }));

console.log("\n🚀 Blockchain successful! Check those leading zeros.");
