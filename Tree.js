import Node from "./Node.js";

class Tree {
  #root;
  constructor(arr) {
    this.#root = this.buildTreeRecursion(arr);
    // this.#root = this.buildTreeQueue(arr);
  }

  buildTreeRecursion(arr) {}

  buildTreeQueue(arr) {}
}

export default Tree;
