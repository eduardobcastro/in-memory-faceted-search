module.exports = buildIndex

function buildIndex({ data, facets, selectedPath, maxLevel }) {
  const index = {}
  for (const item of data) {
    let tree = buildTree({ obj: item, facets, selectedPath, maxLevel })
    merge(index, tree)
  }
  return index
}

function buildTree({ obj, facets, currentPath = [], selectedPath = [], maxLevel }) {
  if (typeof maxLevel === "undefined") {
    if (selectedPath.length > 0) {
      maxLevel = selectedPath.length
    } else {
      maxLevel = 1
    }
  }
  const tree = { count: 1 }

  for (const f of facets) {
    const value = f.map ? f.map(obj) : obj[f.field]
    if (currentPath.indexOf(f) == -1) { // Facet not added yet
      currentPath.push(f)
      let match = currentPath.length <= maxLevel
      for (let i = 0; i < currentPath.length && i < selectedPath.length; i++) {
        if (selectedPath[i] !== currentPath[i].name) {
          match = false
        }
      }
      if (match) {
        tree[f.name] = {
          [value]: { count: 1 }
        }
        if (match) {
          tree[f.name][value] = buildTree({ obj, facets, currentPath, selectedPath, maxLevel })
        }
      }
      currentPath.pop()
    }
  }
  return tree
}

function merge(destination, source) {
  for (const k in source) {
    if (typeof source[k] === "object") {
      if (!destination[k]) {
        destination[k] = {}
      }
      merge(destination[k], source[k])
    }
    if (typeof source[k] === "number") {
      if (!destination[k]) {
        destination[k] = source[k]
      } else {
        destination[k] += source[k]
      }
    }
  }
}
