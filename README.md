# faceted-search
Builds a faceted search index for a given list of records

## Example of usage
Refer to [sample](./sample.json)
```javascript
const data = require("./sample.json")
const facetedSearch = require("in-memory-faceted-search")

const facets = [
  { name: "Colors", field: "color" },
  { name: "Sizes", field: "size" },
  { name: "Status", field: "active", map: (item) => (item.active ? "Active" : "Disabled") },
  { name: "Ages", field: "age", map: (item) => (item.age > 25 ? "Over 25" : "Under 25") }
]

const tree = facetedSearch({ data, facets })
console.log(JSON.stringify(tree, null, 4))
```
Output:
```javascript
{
    "count": 100,
    "Colors": {
        "red": {
            "count": 27
        },
        "blue": {
            "count": 25
        },
        "green": {
            "count": 23
        },
        "brown": {
            "count": 25
        }
    },
    "Sizes": {
        "big": {
            "count": 29
        },
        "small": {
            "count": 34
        },
        "medium": {
            "count": 37
        }
    },
    "Status": {
        "Disabled": {
            "count": 56
        },
        "Active": {
            "count": 44
        }
    },
    "Ages": {
        "Over 25": {
            "count": 72
        },
        "Under 25": {
            "count": 28
        }
    }
}
```
You can also specify a selection path:
```javascript
const tree = facetedSearch({ data, facets, selectedPath: ["Status", "Ages"] })
```
Output:
```javascript
{
    "count": 100,
    "Status": {
        "Disabled": {
            "count": 56,
            "Ages": {
                "Over 25": {
                    "count": 40
                },
                "Under 25": {
                    "count": 16
                }
            }
        },
        "Active": {
            "count": 44,
            "Ages": {
                "Over 25": {
                    "count": 32
                },
                "Under 25": {
                    "count": 12
                }
            }
        }
    }
}
```
You can go deeper by specifying `maxLevel`:
```javascript
const tree = facetedSearch({ data, facets, selectedPath: ["Colors"], maxLevel: 3 })
```
Output:
```javascript
{
    "count": 100,
    "Colors": {
        "red": {
            "count": 27,
            "Sizes": {
                "big": {
                    "count": 4,
                    "Status": {
                        "Disabled": {
                            "count": 2
                        },
                        "Active": {
                            "count": 2
                        }
                    },
                    "Ages": {
                        "Over 25": {
                            "count": 4
                        }
                    }
                },
...
```
Or even build the full index with all possible combinations
```javascript
const tree = facetedSearch({ data, facets, maxLevel: Number.MAX_VALUE })
```
> Output is too big
