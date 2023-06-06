const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'julian blogi',
      author: 'julia malin',
      url: 'julia.malin@blogi.com',
      likes: 10
    },
    {
        title: 'emmin blogi',
        author: 'emilia malin',
        url: 'emilia.malin@blogi.com',
        likes: 11
    },
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
    initialBlogs, blogsInDb
  }