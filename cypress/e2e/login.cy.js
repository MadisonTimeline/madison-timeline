// test that logs in a user
describe('Login', () => {
    it('should login a user', () => {
        cy.visit('https://madison-timeline.vercel.app/boards');
        // Button should contain 'Sign in'
        cy.contains('LOG IN').click();

        // switch origin to login page

        cy.origin('https://madta.kinde.com', () => {
            cy.url().should('include', 'https://madta.kinde.com/auth');
            // Input email
            cy.contains('Email').click().type('dkim693@wisc.edu');
            cy.contains('Continue').click();
            // Input password
            cy.contains('Password').click().type('password1234');
            cy.contains('Continue').click();
            cy.wait(5000);
        })
        cy.wait(5000);
        cy.url().should('include', '/boards');
                // button should contain 'Log out;
                cy.contains('LOG OUT').click();
                // should be redirected to landing page
                cy.url().should('include', 'https://madison-timeline.vercel.app/');
    });
}
);