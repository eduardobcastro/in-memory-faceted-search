const data = require("./sample.json")
const facetedSearch = require(".")

const facets = [
  { name: "Colors", field: "color" },
  { name: "Sizes", field: "size" },
  { name: "Status", field: "active", map: (item) => (item.active ? "Active" : "Disabled") },
  { name: "Ages", field: "age", map: (item) => (item.age > 25 ? "Over 25" : "Under 25") }
]

const tree = facetedSearch({ data, facets, selectedPath: ["Colors"], maxLevel: 3 })

console.log(JSON.stringify(tree, null, 4))
