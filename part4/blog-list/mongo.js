const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.zwv17.mongodb.net/blogApp?retryWrites=true&w=majority`

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const blog = new Blog({
      title: 'Blog 1',
      author: 'Test User',
      url: 'www.google.com',
      likes: 42
    })

    return blog.save()
  }).then(() => {
    console.log('blog saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))