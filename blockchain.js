const crypto = require('crypto');
const { performance } = require('perf_hooks');

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
        const startTime = performance.now(); 
        let hashAttempts = 0;

        console.log(`⛏️  Mining Block ${this.index} (Difficulty: ${difficulty})...`);

        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            hashAttempts++;
            this.hash = this.calculateHash();

            // --- HEARTBEAT: This shows you progress while it works ---
            if (this.nonce % 500000 === 0) {
                console.log(`   Still searching... Nonce: ${this.nonce.toLocaleString()}`);
            }
        }

        const endTime = performance.now(); 
        const durationInSeconds = (endTime - startTime) / 1000;
        const hps = (hashAttempts / durationInSeconds).toFixed(2);

        console.log(`✅ Block Mined!`);
        console.log(`🔗 Hash: ${this.hash}`);
        console.log(`⏱️  Time: ${durationInSeconds.toFixed(3)}s`);
        console.log(`🔢 Nonce: ${this.nonce}`);
        console.log(`🚀 Speed: ${hps} Hashes/Sec (HPS)\n`);
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

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}

const myCrypto = new Blockchain();
myCrypto.addBlock(new Block(1, "20/04/2026", { amount: 50 }));
myCrypto.addBlock(new Block(2, "21/04/2026", { amount: 100 }));

console.log(`Is blockchain valid? ${myCrypto.isChainValid() ? "YES" : "NO"}`);
