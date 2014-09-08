# cf-sectionizer

Takes an array describing some sections and turns it for a canonical list of section IDs. This is used by https://github.com/clocklimited/cf-list-aggregator to transform the description of sections on a list into a db query.

## Example:

```js
var sections =
  [ { id: '123', includeSubSections: true }
  , { id: '456', includeSubSections: false }
  ]
```

Given the section hierarchy:

```
Sport(id:123)
- Football(id:123a)
- Tennis(id:123b)
Entertainment(id:456)
- Theatre(id:456a)
- TV(id:456b)
- Film(id:456c)
```

Will callback with an array:

```js
sectionize(sections, function (err, sections) {
  // sections == [ '123', '123a', '123b', '456' ]
})
```

### Special case

The section id of `-1` is treated as a `{CURRENT}` section mapping. Rather than knowing the section
id at the time of list creation, the 'current' section can be injected when the list is being aggregated
so that it can include contextual content based on where it is used.

```js
var currentSection = '789'
sectionize([ { id: '-1', includeSubSections: false }], currentSection, function (err, sections) {
  // sections == [ '789' ]
})
```

See tests for usage information.

## Installation

      npm install cf-sectionizer

## Usage

## Credits
[Dom Harrington](https://github.com/domharrington/) follow me on twitter [@domharrington](http://twitter.com/domharrington)

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
