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
    // return this.buildTreeQueue(newArray);
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
    if (value === currNode.data) return;
    if (value > currNode.data) {
      if (currNode.right === null) currNode.right = new Node(value);
      else this.#insertPrivate(value, currNode.right);
    } else {
      if (currNode.left === null) currNode.left = new Node(value);
      else this.#insertPrivate(value, currNode.left);
    }
  }

  delete(value) {
    if (this.#root === null) return;
    else this.#root = this.#deletePriv(value, this.#root, null);
  }

  #deletePriv(value, currNode) {
    if (currNode === null) return null;
    if (value > currNode.data)
      currNode.right = this.#deletePriv(value, currNode.right);
    else if (value < currNode.data)
      currNode.left = this.#deletePriv(value, currNode.left);
    else {
      if (currNode.right === null) return currNode.left;
      if (currNode.left === null) return currNode.right;

      let succesor = currNode.right;
      while (succesor.left !== null) {
        succesor = succesor.left;
      }
      currNode.data = succesor.data;
      currNode.right = this.#deletePriv(succesor.data, currNode.right);
    }
    return currNode;
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

  find(value) {
    return this.#findPrivate(value, this.#root);
  }

  #findPrivate(value, root) {
    if (root === null) return undefined;
    if (value < root.data) return this.#findPrivate(value, root.left);
    if (value > root.data) return this.#findPrivate(value, root.right);
    return root;
  }

  levelOrder(callBack) {
    try {
      if (typeof callBack !== "function") throw new Error("Not a function");
      if (this.#root === null) throw new Error("Empty tree");
      let q = [];
      q.push(this.#root);
      let front = 0;

      while (front < q.length) {
        let node = q[front];
        callBack(node);
        if (node.left !== null) q.push(node.left);
        if (node.right !== null) q.push(node.right);
        front++;
      }
    } catch (e) {
      console.error(`levelOrder Error: ${e.message}`);
    }
  }

  levelOrderRecursion(callBack) {
    try {
      if (typeof callBack !== "function" || typeof callBack === undefined)
        throw new Error("Not a function");
      if (this.#root !== null)
        this.levelOrderRecursionPrivate(callBack, [this.#root]);
    } catch (e) {
      console.error(`levelOrderRecursion Error: ${e.message}`);
    }
  }

  levelOrderRecursionPrivate(callBack, queue) {
    let front = 0;
    let newQueue = [];
    while (front < queue.length) {
      let node = queue[front];
      callBack(node);
      if (node.left !== null) newQueue.push(node.left);
      if (node.right !== null) newQueue.push(node.right);
      front++;
    }

    if (newQueue.length > 0)
      this.levelOrderRecursionPrivate(callBack, newQueue);
  }

  inOrder(callBack) {
    try {
      if (typeof callBack !== "function") throw new Error("Not a function");
      if (this.#root === null) throw new Error("Empty tree");
      this.#inOrderPrivate(callBack, this.#root);
    } catch (e) {
      console.error(`inOrder Error: ${e.message}`);
    }
  }
  #inOrderPrivate(callBack, root) {
    if (root === null) return;
    this.#inOrderPrivate(callBack, root.left);
    callBack(root);
    this.#inOrderPrivate(callBack, root.right);
  }

  preOrder(callBack) {
    try {
      if (typeof callBack !== "function") throw new Error("Not a function");
      if (this.#root === null) throw new Error("Empty tree");
      this.#preOrderPrivate(callBack, this.#root);
    } catch (e) {
      console.error(`inOrder Error: ${e.message}`);
    }
  }
  #preOrderPrivate(callBack, root) {
    if (root === null) return;
    callBack(root);
    this.#preOrderPrivate(callBack, root.left);
    this.#preOrderPrivate(callBack, root.right);
  }

  postOrder(callBack) {
    try {
      if (typeof callBack !== "function") throw new Error("Not a function");
      if (this.#root === null) throw new Error("Empty tree");
      this.#postOrderPrivate(callBack, this.#root);
    } catch (e) {
      console.error(`inOrder Error: ${e.message}`);
    }
  }
  #postOrderPrivate(callBack, root) {
    if (root === null) return;
    this.#postOrderPrivate(callBack, root.left);
    this.#postOrderPrivate(callBack, root.right);
    callBack(root);
  }

  height(root) {
    if (root === null) return -1;
    let leftHeight = 1 + this.height(root.left);
    let rightHeight = 1 + this.height(root.right);
    
    if(leftHeight > rightHeight) return leftHeight;
    return rightHeight;
  }
}

export default Tree;
