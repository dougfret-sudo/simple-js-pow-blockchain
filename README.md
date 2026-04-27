🚀 Simple Proof-of-Work Blockchain
A lightweight JavaScript implementation of a Proof-of-Work (PoW) blockchain. This project demonstrates the fundamental concepts of decentralized data security, including cryptographic hashing, mining difficulty, and chain validation.
🛠️ Features
Proof-of-Work (PoW) Algorithm: Implements a mining mechanism to secure the network.
SHA-256 Hashing: Uses the native Node.js crypto module for immutable block linking.
Tamper Detection: Built-in validation to detect unauthorized data changes.
Difficulty Adjustment: Configurable mining difficulty to simulate real-world blockchain behavior.
🧠 How It Works: Proof-of-Work
In this blockchain, adding a new block isn't free. The Mining Chain ensures security through a computational challenge:
The Challenge: To add a block, a miner must find a hash that starts with a specific number of zeros (the difficulty).
The Nonce: Since the block's data is fixed, we use a nonce (number used once). We increment this number thousands of times and re-hash until the "target" is met.
Security: If an attacker changes data in an old block, its hash changes. Because every subsequent block contains the previous hash, the entire chain becomes invalid unless the attacker re-mines every single following block—an impossible task as the chain grows.
[ BLOCK 0 (Genesis) ]        [ BLOCK 1 ]                [ BLOCK 2 ]

| Hash: 0000abc...  | <--- | Prev Hash: 0000abc... | <--- | Prev Hash: 0000xyz... |
| Data: "Genesis"   |      | Data: "First Trans"   |      | Data: "Second Trans"  |
| Nonce: 45021      |      | Nonce: 88231          |      | Nonce: 12093          |
