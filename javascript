const crypto = require('crypto');

/**
 * Represents a single block in the chain.
 */
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0; // The 'magic number' we change to find a valid hash
        this.hash = this.calculateHash();
    }

    /**
     * Creates a SHA-256 hash of the block's contents.
     */
    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.index + 
                this.previousHash + 
                this.timestamp + 
                JSON.stringify(this.data) + 
                this.nonce
            )
            .digest('hex');
    }

    /**
     * The Mining Process: Proof of Work.
     * Continuously changes the nonce until the hash starts with a specific number of zeros.
     */
    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block Mined! Hash: ${this.hash}`);
    }
}

/**
 * Manages the chain, validation, and mining.
 */
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4; // Higher number = more time to mine
    }

    /**
     * Creates the very first block of the blockchain.
     */
    createGenesisBlock() {
        return new Block(0, "01/01/2026", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Mines a new block and adds it to the chain.
     */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    /**
     * Checks if the chain is valid (no tampered data).
     */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // 1. Check if hash is still correct based on data
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // 2. Check if it points to the correct previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// --- TEST DRIVE ---

const myCrypto = new Blockchain();

console.log("Mining block 1...");
myCrypto.addBlock(new Block(1, "20/04/2026", { amount: 50 }));

console.log("Mining block 2...");
myCrypto.addBlock(new Block(2, "21/04/2026", { amount: 100 }));

console.log("\nIs blockchain valid? " + myCrypto.isChainValid());

// Attempting to cheat (Tampering)
myCrypto.chain[1].data = { amount: 1000000 };
console.log("Is blockchain valid after tampering? " + myCrypto.isChainValid());
