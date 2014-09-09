# cf-sectionizer

**Notice:** this module is deprecated. Since v1.0.0 of cf-list-aggregator, [cf-section-extrapolator](https://github.com/clocklimited/cf-section-extrapolator) has replaced `cf-sectionizer`. This repo should only be used for supporting pre 1.0.0 versions of the list aggregator.

----

Takes a List (or array of Lists) and a Section and injects the Section ID into the List's Section array.

When a `-1` is encountered, this is a `{CURRENT}` section mapping so only the current section ID is returned.

When a `-2` is encountered, this is a `{CURRENTANDCHILDREN}` section mapping so the current section ID and the children of that section are returned.

See tests for usage information.

## Installation

      npm install cf-sectionizer

## Usage

## Credits
[Dom Harrington](https://github.com/domharrington/) follow me on twitter [@domharrington](http://twitter.com/domharrington)

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
