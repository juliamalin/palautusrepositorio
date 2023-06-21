import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './BlogForm'
import Togglable from './Toggable'

test('renders content', () => {
    const user = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…YwNX0.ytwR8C7akDNpYirFJ4wVfWjLUs_rU6cKIZGIRQ3C_b0', 
        username: 'kari', 
        name: 'Kari Malin'}

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: "Keijo",
      url: 'keijo@blogi.fi',
      likes: 1,
      user: {
        username: "kari",
        name: "Kari Malin",
        id: "648983c22a505ead9ba328c5"
      },
    }
    render(<Blog blog={blog} user={user}/>)



    const element = screen.getByText('Component testing is done with react-testing-library')
    const elementUrl = screen.queryByText('keijo@blogi.fi')
    const elementLikes = screen.queryByDisplayValue(1)
    expect(element).toBeDefined()
    expect(elementUrl).toBeNull()
    expect(elementLikes).toBeNull()
})

test('displays all blog details when "View" button is clicked', async () => {
    const user = {
      username: 'kari',
    };
  
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Keijo',
      url: 'keijo@blogi.fi',
      likes: 1,
      user: {
        username: 'kari',
      },
    }

    render(<Blog blog={blog} user={user}  />)

    const viewButton = screen.getByText('View')
    await userEvent.click(viewButton)
  
    const urlElement = screen.getByText('URL: keijo@blogi.fi')
    const likesElement = screen.getByText('Likes: 1')
    const userElement = screen.getByText('User: kari')
    const authorElement = screen.getByText('Author: Keijo')
  
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
    expect(userElement).toBeDefined()
    expect(authorElement).toBeDefined()
  })

  test('calls event handler function twice when Like button is clicked twice', async () => {
    const user = {
      username: 'kari',
    };
  
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Keijo',
      url: 'keijo@blogi.fi',
      likes: 1,
      user: {
        username: 'kari',
      },
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={user} update={mockHandler}  />)

    const viewButton = screen.getByText('View')
    await userEvent.click(viewButton)

    const likeButton = screen.getByRole('button', { name: 'Like', class: 'like-button' });
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  
    const urlElement = screen.getByText('URL: keijo@blogi.fi')
    const userElement = screen.getByText('User: kari')
    const authorElement = screen.getByText('Author: Keijo')
  
    expect(urlElement).toBeDefined()
    expect(userElement).toBeDefined()
    expect(authorElement).toBeDefined()
  });

  test('calls createBlog function with correct data when form is submitted', async () => {
    const createBlog = jest.fn()
    const mockHandler = jest.fn()

    const user = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…YwNX0.ytwR8C7akDNpYirFJ4wVfWjLUs_rU6cKIZGIRQ3C_b0', 
        username: 'kari', 
        name: 'Kari Malin'}
    
    render(<Togglable  buttonLabel="create new blog" visible={mockHandler} toggleVisibility={mockHandler}  />)
    const toggleButton = screen.getByTestId('toggle-button');
    await userEvent.click(toggleButton)

   const {container} = render(<CreateBlogForm createBlog={createBlog} user={user} />)

    //const createButton = screen.getByText('create new blog')
    //await userEvent.click(createButton)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const likesInput = container.querySelector('#likes-input')
    const sendButton = screen.getByText('Create Blog')
  
    await userEvent.type(titleInput, 'testing a form...')
    await userEvent.type(authorInput, 'John Doe');
    await userEvent.type(urlInput, 'https://example.com');
    await userEvent.type(likesInput, '10');
    await userEvent.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'testing a form...',
        author: 'John Doe',
        url: 'https://example.com',
        likes: 10,
        user: user
      })
  })


