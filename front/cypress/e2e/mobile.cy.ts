describe('mobile tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-5')
  })

  it('should navigate to home page', () => {
    cy.visit('http://localhost:3000')
    cy.contains('aviv group')
    cy.contains('John Davis')

    cy.get('main').contains('Click on a message to show its content.').should('not.exist')
  })


  it('should update selected option when changing agency', () => {
    cy.visit('http://localhost:3000')

    cy.get('ul').children().should('have.length.greaterThan', 0)
    cy.get('option').contains('Agence #101').should('have.selected')
    
    const message1 = cy.get('ul').children().first()

    cy.wait(100)
    cy.get('select').select('Agence #102')
    cy.contains('Agence #102').should('have.selected')
    cy.get('ul').children().should('have.length.greaterThan', 0)

    cy.wait(100)
    const message2 = cy.get('ul').children().first()

    cy.wait(100)
    cy.get('select').select('Agence #103')
    cy.contains('Agence #103').should('have.selected')
    cy.get('ul').children().should('have.length.greaterThan', 0)
    
    cy.wait(100)
    const message3 = cy.get('ul').children().first()

    message1.then(($message1) => {
      const text1 = $message1.text()
      
      message2.then(($message2) => {
        expect(text1).not.to.include($message2.text())
      })

      message3.should('not.have.text', text1)
    })
  })

  it('should update message details pane on message click', async () => {
    cy.visit('http://localhost:3000')

    cy.get('p').contains('Click on a message to show its content.').should('exist')
    
    cy.get('ul').contains('John Davis').click()
    cy.get('main').contains('Click on a message to show its content.').should('not.exist')
    cy.get('main').get('button[aria-label="back"]')
    .should('be.visible')

    cy.url().should('eq', 'http://localhost:3000/realtors/101/messages/10100')
    
    cy.get('main').get('div').contains('John Davis')
    cy.get('main').get('div').contains('Email')
    cy.get('main').get('div').contains('Phone')
    cy.get('main').get('div').contains('jdavis@gmail.com')
    cy.get('main').get('div').contains('0617565449')
    
    cy.get('main').get('button[aria-label="back"]').click()
    cy.get('p').contains('Click on a message to show its content.').should('exist')
    cy.url().should('eq', 'http://localhost:3000/realtors/101')
  })

  it('should load more messages on scroll', async () => {
    cy.visit('http://localhost:3000')

    const children1 = cy.get('ul').children()
    children1.should('have.length.greaterThan', 0)

    cy.get('ul.MuiList-root').parent().scrollTo('bottom')

    cy.get('ul').children().then(($children2) => {
      children1.should('have.length.lessThan', $children2.length)
    })
  })

  it('should mark a message as read and update counter', async () => {
    cy.visit('http://localhost:3000')

    cy.wait(1000)
    cy.get('header button p').invoke('text').then(parseInt).as('count1')

    cy.get('@count1').should('be.greaterThan', 0)

    cy.get('ul').contains('Richard Thomas').click()

    cy.get('@count1').then(($count1) => {
      cy.get('header button p').invoke('text').then(parseInt).should('be.lessThan', $count1)
      cy.get('main').get('button[aria-label="mark-unread"]').click()
    })
  })
})