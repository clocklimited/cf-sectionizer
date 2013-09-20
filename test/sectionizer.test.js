var sectionizer = require('../sectionizer')
  , _ = require('lodash')
  , section = require('./section-fixtures').section

describe('Sectionizer', function () {

  describe('Single lists with single section', function () {

    it('will convert {CURRENT} to the correct section id', function () {
      var list = sectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '-1' ]
        , order: 'recent'
        , limit: 100
        }, section)

      list.sections.should.be.length(1)
      list.sections.should.include(section._id)
      list.sections.should.not.include('-1')
    })

    it('will not convert non-{CURRENT} section ids', function () {
      var list = sectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '1' ]
        , order: 'recent'
        , limit: 100
        }, section)

      list.sections.should.be.length(1)
      list.sections.should.include('1')
      list.sections.should.not.include('-1')
    })

  })

  describe('Single lists with multiple sections', function () {

    it('will convert {CURRENT} to the correct section id', function () {
      var list = sectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '1', '-1', '2' ]
        , order: 'recent'
        , limit: 100
        }, section)

      list.sections.should.be.length(3)
      list.sections.should.include(section._id)
      list.sections.should.include('1')
      list.sections.should.include('2')
      list.sections.should.not.include('-1')
    })

    it('will not convert non-{CURRENT} section ids', function () {
      var list = sectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '1', '2', '3' ]
        , order: 'recent'
        , limit: 100
        }, section)

      list.sections.should.be.length(3)
      list.sections.should.include('1')
      list.sections.should.include('2')
      list.sections.should.include('3')
      list.sections.should.not.include('-1')
    })

  })

  describe('Multiple lists with single section', function () {

    it('will convert {CURRENT} to the correct section id', function () {
      var lists =
          [ { type: 'auto'
            , name: 'test list'
            , sections: [ '-1' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list'
            , sections: [ '-1' ]
            , order: 'recent'
            , limit: 100
            }
          ]
        , sectionizedLists = sectionizer(lists, section)

      _.each(sectionizedLists, function (list) {
        list.sections.should.be.length(1)
        list.sections.should.include(section._id)
        list.sections.should.not.include('-1')
      })
    })

    it('will not convert non-{CURRENT} section ids', function () {
      var lists =
          [ { type: 'auto'
            , name: 'test list'
            , sections: [ '1' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list'
            , sections: [ '1' ]
            , order: 'recent'
            , limit: 100
            }
          ]
        , sectionizedLists = sectionizer(lists, section)

      _.each(sectionizedLists, function (list) {
        list.sections.should.be.length(1)
        list.sections.should.include('1')
        list.sections.should.not.include('-1')
      })
    })

  })

  describe('Multiple lists with multiple sections', function () {

    it('will convert {CURRENT} to the correct section id', function () {
      var lists =
          [ { type: 'auto'
            , name: 'test list 1'
            , sections: [ '-1', '2', '3' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list 2'
            , sections: [ '3', '2', '-1' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list 3'
            , sections: [ '2', '-1', '3' ]
            , order: 'recent'
            , limit: 100
            }
          ]

      var sectionizedLists = sectionizer(lists, section)

      _.each(sectionizedLists, function (list) {
        list.sections.should.be.length(3)
        list.sections.should.include(section._id)
        list.sections.should.include('2')
        list.sections.should.include('3')
        list.sections.should.not.include('-1')
      })
    })

    it('will not convert non-{CURRENT} section ids', function () {
      var lists =
          [ { type: 'auto'
            , name: 'test list 1'
            , sections: [ '1', '2', '3' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list 2'
            , sections: [ '3', '2', '1' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list 3'
            , sections: [ '2', '1', '3' ]
            , order: 'recent'
            , limit: 100
            }
          ]

      var sectionizedLists = sectionizer(lists, section)

      _.each(sectionizedLists, function (list) {
        list.sections.should.be.length(3)
        list.sections.should.include('1')
        list.sections.should.include('2')
        list.sections.should.include('3')
        list.sections.should.not.include('-1')
      })
    })

  })

})
