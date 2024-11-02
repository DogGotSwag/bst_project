import Tree from "./Tree.js";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateArray(min, max) {
  let arr = [];
  for (let i = 0; i < 90; i++) {
    let number = randomNumber(min, max);
    arr.push(number);
  }
  return arr;
}

function logData(node) {
  console.log(node.data);
}


//1
let tree = new Tree(generateArray(0, 90));
tree.print();

//2
console.log(tree.isBalanced());

//3
tree.levelOrder(logData);
tree.preOrder(logData);
tree.postOrder(logData);
tree.inOrder(logData);

//4
let array = generateArray(100, 200);
for (let i = 0; i < array.length; i++) {
  tree.insert(array[i]);
}
tree.print();

//5
console.log(tree.isBalanced());

//6
tree.rebalance();
tree.print();

//7
console.log(tree.isBalanced());

//8
tree.levelOrder(logData);
tree.preOrder(logData);
tree.postOrder(logData);
tree.inOrder(logData);
