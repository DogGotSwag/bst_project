import Node from "./Node.js";
import mergeSort from "./mergSort.js";
import removeDupe from "./removeDube.js";

class Tree {
  #root;
  constructor(arr) {
    this.#root = this.buildtree(arr);
  }

  buildtree(arr) {
    let newArray = mergeSort(removeDupe(arr));

    return this.buildTreeRecursion(newArray, 0, newArray.length - 1);
    return this.buildTreeQueue(newArray);
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
    let root = new Node(arr[Math.floor((0 + arr.length - 1) / 2)]);
    let queue = [{ node: root, range: [0, arr.length - 1] }];
    let front = 0;

    while (front < queue.length) {
      let current = queue[front].node;
      let [s, e] = queue[front].range;
      let m = Math.floor((s + e) / 2);

      if (s < m) {
        current.left = new Node(arr[Math.floor((s + m - 1) / 2)]);
        queue.push({ node: current.left, range: [s, m - 1] });
      }

      if (m < e) {
        current.right = new Node(arr[Math.floor((m + 1 + e) / 2)]);
        queue.push({ node: current.right, range: [m + 1, e] });
      }

      front++;
    }

    return root;
  }

  insert(value) {
    if (this.#root === null) this.#root = new Node(value);
    else this.#insertPrivate(value, this.#root);
  }

  #insertPrivate(value, currNode) {
    if (value > currNode.data) {
      if (currNode.right === null) currNode.right = new Node(value);
      else this.#insertPrivate(value, currNode.right);
    } else {
      if (currNode.left === null) currNode.left = new Node(value);
      else this.#insertPrivate(value, currNode.left);
    }
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
