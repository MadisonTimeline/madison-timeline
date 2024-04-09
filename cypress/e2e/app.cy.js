describe('Landing Page', () => { 
  it('should display the landing page', () => {
    cy.visit('https://madison-timeline.vercel.app/');
    // Should contain the title
    cy.get('h1').should('contain', 'Welcome to Madison Timeline');

    // Button should contain 'Get Started'
    cy.contains('Get Started').click();
    // URL should include '/boards' after clicking the button
    cy.url().should('include', '/boards')
  });
} 
);
