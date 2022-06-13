const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const { initialBlogs } = require('./test_helper')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async() => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.intialNotes.length)
})

test('verify unique identifier property of blog posts is named id', async() => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  expect(ids).toContain('62a68443532c9fc6525b97f4')
})

test('create a new blog post', async() => {
  const newBlog = {
    title: 'Blog 1',
    author: 'Test User',
    url: 'www.google.com',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)
  expect(contents).toContain('Blog 1')

})

test('blog without likes property will return 0', async() => {
  const newBlog = {
    title: 'Blog 2',
    author: 'Test User',
    url: 'www.yahoo.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()
  const addedBlog = await blogsAtEnd.find(blog => blog.title === 'Blog 2')
  expect(addedBlog.likes).toBe(0)
})

test('If title and url are missing, return with 400 bad request', async() => {
  const newBlog = {
    author:'Edsger W. Dijkstra',
    likes:12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('Delete blog entry', async() => {
  const blogAtStart = await helper.blogInDb()
  const blogToDelete = blogAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)

  const blogAtEnd = await helper.blogInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length-1)

  const title = blogAtEnd.map(r => r.title)
  expect(title).not.toContain(blogToDelete.title)
})


afterAll(() => {
  mongoose.connection.close()
})
