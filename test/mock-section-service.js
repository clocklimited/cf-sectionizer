var sectionFixtures = require('./section-fixtures')
  , section = sectionFixtures.section
  , childSection = sectionFixtures.childSection
  , tertiarySection = sectionFixtures.tertiarySection

module.exports =
{ findPublic: function (a, b, cb) {
    return cb(null, [section, childSection, tertiarySection])
  }
, getChildSections: function getChildSections(parent, sections, maxDepth, depth) {
    var items = []
    maxDepth = maxDepth ? maxDepth : 0

    sections.forEach(function (section) {
      var currentDepth = depth ? depth : 1
      if (section.parent === parent) {

        var item = section

        item.subItems = []

        if (maxDepth !== currentDepth) {
          item.subItems = getChildSections(section._id, sections, maxDepth, currentDepth + 1)
        }

        items.push(item)
      }
    })

    return items
  }
, flattenChildSections: function flattenChildSections(section) {
    var sections = []
    sections.push(section)

    if (section.subItems.length > 0) {
      section.subItems.forEach(function (childSection) {
        sections = sections.concat(flattenChildSections(childSection))
      })
    }

    return sections
  }
}
