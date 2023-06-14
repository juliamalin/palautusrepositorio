const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



    blogsRouter.get('/', async (request, response) => {
      const blogs = await Blog
      .find({}).populate('user',{username: 1, name: 1})
      
      response.json(blogs)
    })

    const getTokenFrom = request => {
      const authorization = request.get('authorization')
      if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
      }
      return null
    }

    blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } catch(exception) {
      next(exception)
    }
  })


  blogsRouter.get('/:id', async (request, response, next) => {
    try {
      const note = await Blog.findById(request.params.id)
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
  })

  blogsRouter.delete('/:id', async (request, response, next) => {

    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if(!decodedToken.id) {
        return response.status(401).json({error: 'Token invalid'})
      }
      
      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
      }

      if (blog.user.toString() !== decodedToken.id) {
        return response.status(403).json({ error: 'Unauthorized' })
      }

      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
      } catch (exception) {
        next(exception)
      }
    })

module.exports = blogsRouter