const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const total = blogs.map(l => l.likes).reduce((prev, curr) => prev+curr, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const arr = blogs.map(l => l.likes)
  const maxLikes = Math.max(...arr)

  function favBlog(blog) {
    return blog.likes === maxLikes
  }

  return blogs.find(favBlog)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let authorCounts = blogs.reduce((authorCount, blog) => {
      authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
      return authorCount
    }, {})
    let maxCount = Math.max(...Object.values(authorCounts))
    let mostFrequent = Object.keys(authorCounts).filter(author => authorCounts[author] === maxCount)
    return {
      author: mostFrequent[0],
      blogs: maxCount
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let likesCounts = blogs.reduce((likesCount, blog) => {
      likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
      return likesCount
    }, {})
    let maxCount = Math.max(...Object.values(likesCounts))
    let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
    return {
      author: mostLiked[0],
      likes: maxCount
    }
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}