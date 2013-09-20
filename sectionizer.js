var _ = require('lodash')

module.exports = function (lists, section) {
  if (!Array.isArray(lists)) {
    lists = [lists]
  }

  return _.map(lists, function (list) {
    return sectionize(list, section)
  })
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
