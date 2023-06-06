const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
  
beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('emmin blogi')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'lillin blogi',
    author: 'lilli gunnar',
    url:'lilli.gunnar@blogi.fi',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)


  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'lillin blogi'
  )
})

test('id field name is "id"', async() => {
  const response = await api.get('/api/blogs');
  response.body.forEach((obj) => {
    console.log(obj.id)
    expect(obj.id).toBeDefined()
  })
})

test('number of likes is zero', async () => {
  const newBlog = {
    title: 'sannan blogi',
    author: 'sanna gunnar',
    url:'sanna.gunnar@blogi.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const addedBlog = blogsAtEnd.find((b) => b.title === 'sannan blogi')
  expect(addedBlog.likes).toBe(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'liisa malin',
    url:'liisa.malin@blogi.fi',
    likes: 150
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'liisan blogi',
    author: 'liisa malin',
    likes: 150
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})


afterAll(async () => {
  await mongoose.connection.close()
})