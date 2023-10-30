// huffmancoding

class Node {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanTree(text) {
  const charCount = new Map();
  for (const char of text) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  const nodes = Array.from(charCount.keys()).map((char) => new Node(char, charCount.get(char)));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);

    const left = nodes.shift();
    const right = nodes.shift();

    const parent = new Node(null, left.freq + right.freq);
    parent.left = left;
    parent.right = right;

    nodes.push(parent);
  }

  return nodes[0];
}

function buildHuffmanTable(node, prefix = '', table = {}) {
  if (node.char !== null) {
    table[node.char] = prefix;
  }
  if (node.left) {
    buildHuffmanTable(node.left, prefix + '0', table);
  }
  if (node.right) {
    buildHuffmanTable(node.right, prefix + '1', table);
  }
  return table;
}

function huffmanEncode(text) {
  const root = buildHuffmanTree(text);
  const table = buildHuffmanTable(root);
  let encodedText = '';
  for (const char of text) {
    encodedText += table[char];
  }
  return encodedText;
}

function huffmanDecode(encodedText, root) {
  let decodedText = '';
  let currentNode = root;
  for (const bit of encodedText) {
    if (bit === '0') {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
    if (currentNode.char !== null) {
      decodedText += currentNode.char;
      currentNode = root;
    }
  }
  return decodedText;
}

// Example usage:
const text = 'this is an example for huffman encoding';
const encodedText = huffmanEncode(text);
console.log('Encoded Text:', encodedText);

const root = buildHuffmanTree(text);
const decodedText = huffmanDecode(encodedText, root);
console.log('Decoded Text:', decodedText);
