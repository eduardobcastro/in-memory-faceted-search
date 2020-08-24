const data = require("./sample.json")
const facetedSearch = require(".")

const facets = [
  { name: "Colors", field: "color" },
  { name: "Sizes", field: "size" },
  { name: "Status", field: "active", map: (item) => (item.active ? "Active" : "Disabled") },
  { name: "Ages", field: "age", map: (item) => (item.age > 25 ? "Over 25" : "Under 25") }
]

it("Builds first level index", () => {
  const tree = facetedSearch({ data, facets })
  expect(tree).toMatchSnapshot()
})

it("Builds full index", () => {
  const tree = facetedSearch({ data, facets, maxLevel: Number.MAX_VALUE })
  expect(tree).toMatchSnapshot()
});

it("Builds index with 1 level selected path", () => {
  const tree = facetedSearch({ data, facets, selectedPath: ["Sizes"] })
  expect(tree).toMatchSnapshot()
});

it("Builds index with 2 levels selected path", () => {
  const tree = facetedSearch({ data, facets, selectedPath: ["Ages", "Colors"] })
  expect(tree).toMatchSnapshot()
});

it("Builds index with selected path in a deeper level", () => {
  const tree = facetedSearch({ data, facets, selectedPath: ["Colors"], maxLevel: 3 })
  expect(tree).toMatchSnapshot()
});
