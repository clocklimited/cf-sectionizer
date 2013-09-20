var _ = require('lodash')
  , async = require('async')

module.exports = function (sectionService) {

  return function (lists, section, callback) {
    if (!section) {
      // If section has not been defined, then return the original lists
      return callback(null, lists)
    }

    if (!Array.isArray(lists)) {
      recursiveSectionize(lists, section, callback)
    } else {
      var sectionizedLists = []

      async.eachSeries(lists, function (list, eachCallback) {
        recursiveSectionize(list, section, function (error, list) {
          if (error) eachCallback(error)
          sectionizedLists.push(list)

          eachCallback()
        })
      }, function (error) {
        return callback(error, sectionizedLists)
      })
    }
  }

  function recursiveSectionize(list, section, callback) {
    var sectionIndex

    if (!list.sections) {
      return callback(null, list)
    }

    if ((sectionIndex = list.sections.indexOf('-2')) === -1) {
      return callback(null, list)
    }

    list.sections[sectionIndex] = section._id

    sectionService.findPublic({}, {}, function (error, sections) {
      if (error) return callback(error)

      var childSections = sectionService.getChildSections(section._id, sections)
        , flattenedChildSections = []

      _.each(childSections, function (section) {
        flattenedChildSections =
          flattenedChildSections.concat(sectionService.flattenChildSections(section))
      })

      _.each(flattenedChildSections, function (childSection) {
        list.sections.push(childSection._id)
      })

      return callback(null, list)
    })
  }
}
