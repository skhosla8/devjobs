/// <reference types='cypress' />

beforeEach(() => {
  cy.visit('http://localhost:3000/devjobs');
});

describe('initial render', () => {
  it('only the first 12 job listings are displayed', () => {
    cy.get('[data-cy="job-card"]').should('have.length', 12);
  });

  it('clicking on "Load More" button displays all 15 job listings', () => {
    cy.contains('Load More').click();
    cy.get('[data-cy="job-card"]').should('have.length', 15);
  });
});

describe('color theme', () => {
  it('color theme of light should be set on initial render', () => {
    cy.get('[data-cy="app-body"]').should('have.class', 'body-light');
    cy.get('[data-cy="job-card"]').should('have.class', 'card-light');

  });

  it('clicking on the color theme switch should correctly alternate between light and dark mode themes', () => {
    cy.get('[data-cy="color-theme-switch"]').click();
    cy.get('[data-cy="app-body"]').should('have.class', 'body-dark');
    cy.get('[data-cy="job-card"]').should('have.class', 'card-dark');
    cy.get('[data-cy="color-theme-switch"]').click();
    cy.get('[data-cy="app-body"]').should('have.class', 'body-light');
    cy.get('[data-cy="job-card"]').should('have.class', 'card-light');
  });
});

describe('filtering job listings', () => {
  it('checking "Full Time Only" checkbox should display only Full Time job listings (7)', () => {
    cy.get('[data-cy="full-time-only-checkbox"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 7);

  });

  it('unchecking "Full Time Only" checkbox should display all job listings (12)', () => {
    cy.get('[data-cy="full-time-only-checkbox"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 7);
    cy.get('[data-cy="full-time-only-checkbox"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 12);
  });

  it('job listings should be filtered by any search parameters that are entered into the search bar', () => {
    cy.get('[data-cy="filter-by-name-input"]').type('Senior');
    cy.get('[data-cy="filter-by-location-input"]').type('united');
    cy.get('[data-cy="full-time-only-checkbox"]').click();
    cy.get('[data-cy="search-btn"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 2);


    cy.get('[data-cy="filter-by-name-input"]').clear();
    cy.get('[data-cy="filter-by-location-input"]').clear();
    cy.get('[data-cy="full-time-only-checkbox"]').click();
    cy.get('[data-cy="search-btn"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 12);


    cy.get('[data-cy="filter-by-name-input"]').type('developer');
    cy.get('[data-cy="full-time-only-checkbox"]').click();
    cy.get('[data-cy="search-btn"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 4);

    cy.get('[data-cy="full-time-only-checkbox"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 6);
    cy.get('[data-cy="filter-by-name-input"]').clear();
    cy.get('[data-cy="search-btn"]').click();
    cy.get('[data-cy="job-card"]').should('have.length', 12);
  });
});