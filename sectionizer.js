var _ = require('lodash')

module.exports = function (lists, section) {
  if (!Array.isArray(lists)) {
    return sectionize(lists, section)
  } else {
    var sectionizedLists = []

    _.each(lists, function (list) {
      sectionizedLists.push(sectionize(list, section))
    })

    return sectionizedLists
  }
}

function sectionize(list, section) {
  var sectionIndex
  if (list.sections) {
    if ((sectionIndex = list.sections.indexOf('-1')) !== -1) {
      list.sections[sectionIndex] = section._id
    }
  }

  return list
}