module.exports =
{ section:
  { name: 'News'
  , slug: 'news'
  , visible: true
  , _id: 'section'
  , parent: null
  }
, childSection:
  { name: 'News'
  , slug: 'news'
  , visible: true
  , _id: 'child-section'
  , parent: 'section'
  }
, tertiarySection:
  { name: 'News'
  , slug: 'news'
  , visible: true
  , _id: 'tertiary-section'
  , parent: 'child-section'
  }
}

