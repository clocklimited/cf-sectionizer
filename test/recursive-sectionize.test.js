var _ = require('lodash')
  , sectionService = require('./mock-section-service')
  , recursiveSectionizer = require('../recursive-sectionizer')(sectionService)
  , sectionFixtures = require('./section-fixtures')
  , section = sectionFixtures.section
  , childSection = sectionFixtures.childSection
  , tertiarySection = sectionFixtures.tertiarySection

describe('Recursive Sectionizer', function () {

  describe('Single lists with single section', function () {

    it('will convert {CURRENTANDCHILDREN} to the correct section id', function () {
      recursiveSectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '-2' ]
        , order: 'recent'
        , limit: 100
        }, section, function (error, list) {
          list.sections.should.be.length(3)
          list.sections.should.include(section._id)
          list.sections.should.include(childSection._id)
          list.sections.should.include(tertiarySection._id)
          list.sections.should.not.include('-2')
        })
    })

    it('will not convert non-{CURRENTANDCHILDREN} section ids', function () {
      recursiveSectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '1' ]
        , order: 'recent'
        , limit: 100
        }, section, function (error, list) {
          list.sections.should.be.length(1)
          list.sections.should.include('1')
          list.sections.should.not.include('-2')
        })
    })

  })

  describe('Single lists with multiple sections', function () {

    it('will convert {CURRENTANDCHILDREN} to the correct section id', function () {
      recursiveSectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '1', '-2', '2' ]
        , order: 'recent'
        , limit: 100
        }, section, function (error, list) {
          list.sections.should.be.length(5)
          list.sections.should.include(section._id)
          list.sections.should.include(childSection._id)
          list.sections.should.include(tertiarySection._id)
          list.sections.should.include('1')
          list.sections.should.include('2')
          list.sections.should.not.include('-2')
        })
    })

    it('will not convert non-{CURRENTANDCHILDREN} section ids', function () {
      recursiveSectionizer(
        { type: 'auto'
        , name: 'test list'
        , sections: [ '1', '2', '3' ]
        , order: 'recent'
        , limit: 100
        }, section, function (error, list) {
          list.sections.should.be.length(3)
          list.sections.should.include('1')
          list.sections.should.include('2')
          list.sections.should.include('3')
          list.sections.should.not.include('-2')
        })
    })

  })

  describe('Multiple lists with single section', function () {

    it('will convert {CURRENT} to the correct section id', function () {
      var lists =
        [ { type: 'auto'
          , name: 'test list 1'
          , sections: [ '-2' ]
          , order: 'recent'
          , limit: 100
          }
        , { type: 'auto'
          , name: 'test list 2'
          , sections: [ '-2' ]
          , order: 'recent'
          , limit: 100
          }
        ]

      recursiveSectionizer(lists, section, function (error, sectionizedLists) {
        _.each(sectionizedLists, function (list) {
          list.sections.should.be.length(3)
          list.sections.should.include(section._id)
          list.sections.should.include(childSection._id)
          list.sections.should.include(tertiarySection._id)
          list.sections.should.not.include('-2')
        })
      })
    })

    it('will not convert non-{CURRENT} section ids', function () {
      var lists =
        [ { type: 'auto'
          , name: 'test list 1'
          , sections: [ '2' ]
          , order: 'recent'
          , limit: 100
          }
        , { type: 'auto'
          , name: 'test list 2'
          , sections: [ '2' ]
          , order: 'recent'
          , limit: 100
          }
        ]

      recursiveSectionizer(lists, section, function (error, sectionizedLists) {
        _.each(sectionizedLists, function (list) {
          list.sections.should.be.length(1)
          list.sections.should.include('2')
        })
      })
    })

  })

  describe('Multiple lists with multiple sections', function () {

    it('will convert {CURRENTANDCHILDREN} to the correct section id', function () {
      var lists =
          [ { type: 'auto'
            , name: 'test list 1'
            , sections: [ '-2', '2', '3' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list 2'
            , sections: [ '3', '2', '-2' ]
            , order: 'recent'
            , limit: 100
            }
          , { type: 'auto'
            , name: 'test list 3'
            , sections: [ '2', '-2', '3' ]
            , order: 'recent'
            , limit: 100
            }
          ]

      recursiveSectionizer(lists, section, function (error, sectionizedLists) {
        _.each(sectionizedLists, function (list) {
          list.sections.should.be.length(5)
          list.sections.should.include(section._id)
          list.sections.should.include(childSection._id)
          list.sections.should.include(tertiarySection._id)
          list.sections.should.include('2')
          list.sections.should.include('3')
          list.sections.should.not.include('-2')
        })
      })
    })

    it('will not convert non-{CURRENTANDCHILDREN} section ids', function () {
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

      recursiveSectionizer(lists, section, function (error, sectionizedLists) {
        _.each(sectionizedLists, function (list) {
          list.sections.should.be.length(3)
          list.sections.should.include('1')
          list.sections.should.include('2')
          list.sections.should.include('3')
          list.sections.should.not.include('-2')
        })
      })
    })

  })

})
