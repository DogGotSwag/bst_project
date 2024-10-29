import Node from "./Node.js";

class Tree {
  #root;
  constructor(arr) {
    this.#root = this.buildTreeRecursion(arr, 0, arr.length-1);
    this.#root = this.buildTreeQueue(arr);
  }

  buildTreeRecursion(arr, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTreeRecursion(arr, start, mid - 1);
    root.right = this.buildTreeRecursion(arr, mid + 1, end);

    return root;
  }

  buildTreeQueue(arr) {
    if (arr.length === 0) return null;
    let mid = Math.floor((0 + arr.length-1) / 2);
    let root = new Node(arr[mid]);
    let queue = [{ node: root, range: [0, arr.length-1] }];
    let front = 0;

    while (front < queue.length) {
      let current = queue[front].node;
      let [s,e] = queue[front].range;
      console.log(s,e);
      
      front++;
    }

    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  print() {
    this.prettyPrint(this.#root);
  }
}

export default Tree;
