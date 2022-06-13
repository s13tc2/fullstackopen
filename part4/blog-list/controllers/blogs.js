const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  // Blog.find({}).then(blog => {
  //   response.json(blog)
  // })
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })


  const savedBlog = await blog.save()
  logger.info(`added ${blog.title} to the blog list`)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  logger.info(`blog linked to user ${user.username}`)
  response.status(201).json(savedBlog)


  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  //   .catch(error => next(error))
})

blogRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blogToDelete = await Blog.findById(request.params.id)

  if ( blogToDelete.user._id.toString() === user._id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})


blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.comments) {
    body.comments = []
  }

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blogToUpdate = await Blog.findById(request.params.id)

  if ( blogToUpdate.user._id.toString() === user._id.toString() ) {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments,
    }


    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    logger.info(`blog ${blog.title} successfully updated`)
    response.json(updatedBlog.toJSON())

  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = blogRouter