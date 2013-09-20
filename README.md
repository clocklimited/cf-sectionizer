# cf-sectionizer

Takes a List (or array of Lists) and a section and injects the section ID into the list's section array.

When a `-1` is encountered, this is a `{CURRENT}` section mapping so only the current section ID is returned.

When a `-2` is encountered, this is a `{CURRENTANDCHILDREN}` section mapping so the current section ID and the children of that section are returned.


## Installation

      npm install cf-sectionizer

## Usage

## Credits
[Dom Harrington](https://github.com/domharrington/) follow me on twitter [@domharrington](http://twitter.com/domharrington)

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
