/**
 *  Dictionary.js
 *  -------------
 *  This component implements a uncompressed radix trie data structure
 *  in order to quickly retrieve key for a given prefix
 *  Used for looking up cities in the autocomplete
 */

const REF_SYMBOL = Symbol('WORD_REF');

export default class Dictionary {
  constructor (arrayOfObjects, functionToGetKeyFromObject = (str) => str) {
    this.root = {};
    arrayOfObjects.forEach((wordObject) => {
      this.insert(
        functionToGetKeyFromObject(wordObject),
        wordObject
      );
    });
  }

  insert (key, ref) {
    // Make the way inside the tree
    let currentNode = this.root;
    for (let char of key) {
      if (currentNode[char] === undefined) {
        currentNode[char] = {};
      }
      currentNode = currentNode[char];
    }

    // Mark the final node as an end of key and point to the ref
    if (currentNode[REF_SYMBOL] === undefined) {
      currentNode[REF_SYMBOL] = [ref];
    } else {
      currentNode[REF_SYMBOL] = [
        ...currentNode[REF_SYMBOL],
        ref
      ];
    }
  }

  /**
   *  Lookup for a given prefix and returns a list of references
   *  to all the objects that has a key matching the prefix
   */
  lookup (key, limit = 5) {
    let currentNode = this.root;
    // Find the node for the prefix
    for (let char of key) {
      if (currentNode[char] === undefined) {
        return [];
      }
      currentNode = currentNode[char];
    }

    // Gather all references from that node
    return Dictionary.gatherReferences(currentNode, limit);
  }

  static gatherReferences (node, limit) {
    const refs = [];
    const gatherReferencesRecursive = (refs, node, limit) => {
      // Current node is marked as a final node,
      // gather references of that node
      if (node[REF_SYMBOL] !== undefined) {
        for (const ref of node[REF_SYMBOL]) {
          if (refs.length >= limit) {
            return;
          }
          refs.push(ref);
        }
      }

      // Look for references in children nodes
      Object.values(node).forEach((childNode) => {
        gatherReferencesRecursive(refs, childNode, limit);
      });
    };

    gatherReferencesRecursive(refs, node, limit);
    return refs;
  }
}