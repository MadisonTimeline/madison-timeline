describe('Landing Page', () => { 
  it('should display the landing page', () => {
    cy.visit('https://madison-timeline.vercel.app/');
    // Should contain the title
    cy.contains('Madison Timeline');

    // Button should contain 'Get Started'
    cy.contains('START AS GUEST').click();
    // URL should include '/boards' after clicking the button
    cy.url().should('include', '/boards')
  });
} 
);
