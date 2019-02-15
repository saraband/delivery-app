/**
 *  City dictionary using radix tree data structure
 */

export const CITY_REF = Symbol('__CITY_REF__');
export default class CitiesDictionary {
  constructor (cities = []) {
    this.root = {};
    cities.forEach((city) => {
      this.insert(city);
    });
  }

  insert (city) {
    let currentNode = this.root;
    for (let char of city.asciiName) {
      if (currentNode[char] === undefined) {
        currentNode[char] = {};
      }
      currentNode = currentNode[char];
    }

    // Insert the city ref at the end
    if (currentNode[CITY_REF] === undefined) {
      currentNode[CITY_REF] = [city];
    } else {
      currentNode[CITY_REF] = [
        ...currentNode[CITY_REF],
        city
      ];
    }
  }

  gatherReferencesRecursive (references, node, limit) {
    // This node has references
    if (node[CITY_REF] !== undefined) {
      for (const ref of node[CITY_REF]) {
        references.push(ref);
        if (references.length >= limit) {
          return;
        }
      }
    }

    // Look for references in children nodes
    Object.values(node).forEach((childNode) => {
      this.gatherReferencesRecursive(references, childNode, limit);
    });
  }

  gatherReferences (node, limit) {
    const cities = [];
    this.gatherReferencesRecursive(cities, node, limit);
    return cities;
  }

  lookupCities (string, limit = 5) {
    let currentNode = this.root;
    for (let char of string) {
      if (currentNode[char] === undefined) {
        return undefined;
      }
      currentNode = currentNode[char];
    }

    // We found the node containing the cities
    // now we gather the references
    return this.gatherReferences(currentNode, limit);
  }
};
