const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const listOfBlogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Test User 1',
      url: 'www.google.com',
      likes: 42,
    },
    {
      _id: '2',
      title: 'Blog 1',
      author: 'Test User 2',
      url: 'www.bing.com',
      likes: 12,
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Test User 3',
      url: 'www.yahoo.com',
      likes: 1,
    },
  ]

  test('when list has many blogs, find the one with most likes', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toBe(listOfBlogs[0])
  })
})

const blogs = [
  {
    id:'5a422a851b54a676234d17f7',
    title:'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    likes:7
  },
  {
    id:'5a422aa71b54a676234d17f8',
    title:'Go To Statement Considered Harmful',
    author:'Edsger W. Dijkstra',
    url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:5
  },
  {
    id:'5a422b3a1b54a676234d17f9',
    title:'Canonical string reduction',
    author:'Edsger W. Dijkstra',
    url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes:12
  },
  {
    id:'5a422b891b54a676234d17fa',
    title:'First class tests',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes:10
  },
  {
    id:'5a422ba71b54a676234d17fb',
    title:'TDD harms architecture',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes:0
  },
  {
    id:'5a422bc61b54a676234d17fc',
    title:'Type wars',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes:2
  }
]

describe('most blog', () => {

  test('returns the author that has the largest amount of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {

  test('returns the author that has the largest amount of likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})