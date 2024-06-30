const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// Construct a Merkle tree
const merkleTree = new MerkleTree(niceList)

// Get the Merkle root
const MERKLE_ROOT = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  const { name, proof } = req.body;

  // Verifing the proof
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
