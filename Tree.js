import Node from "./Node.js";

class Tree {
  #root;
  constructor(arr) {
    this.#root = this.buildTreeRecursion(arr, 0, arr.length);
    // this.#root = this.buildTreeQueue(arr);
  }

  buildTreeRecursion(arr, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTreeRecursion(arr, start, mid - 1);
    root.right = this.buildTreeRecursion(arr, mid + 1, end);

    return root;
  }

  buildTreeQueue(arr) {}
}

export default Tree;
