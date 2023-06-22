describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Julia M',
      username: 'julle',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('julle')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })

  it('fails with wrong credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('kari')
    cy.get('#password').type('k')
    cy.get('#login-button').click()
    cy.contains('wrong credentials')
  })

})

describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('julle')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#title-input').type('jullen blogi')
      cy.get('#author-input').type('julia')
      cy.get('#url-input').type('julle@blogi.fi')
      cy.get('#likes-input').type(5)
      cy.get('#create-button').click()
      cy.contains('jullen blogi')

    })

    it('A blog can be liked', function() {
      cy.contains('Bloglist')
      cy.get('#view-button').click()
      cy.get('#like-button').click()
    })

    it('a Blog can be deleted by user', function(){
      cy.contains('Julia M logged in')
      cy.contains('Delete').click()
      cy.contains('Blog deleted successfully')
    })

    it('a Blog can not be deleted by other than user', function(){
      cy.get('#title-input').type('jullen blogi')
      cy.get('#author-input').type('julia')
      cy.get('#url-input').type('julle@blogi.fi')
      cy.get('#likes-input').type(5)
      cy.get('#create-button').click()
      cy.contains('jullen blogi')

      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Emilia M',
        username: 'emppu',
        password: 'salainen1'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      
      cy.get('#logout-button').click()
      cy.get('#username').type('emppu')
      cy.get('#password').type('salainen1')
      cy.get('#login-button').click()

      cy.contains('Emilia M logged in')
      cy.contains('Delete').should('not.exist')
    })
  })
