describe("Home screen tests", () => {
  beforeEach("Open home screen", () => {
    cy.visit("/");
  });

  it("The cocktails list should be visible", () => {
    cy.get(".logo").should("contain", "MIXdrinks");
    cy.get(".cocktails-body__list")
      .find(".list__item")
      .first()
      .should("contain.text", "Cкритна леді");
  });

  it("Applying sorting", () => {
    cy.intercept({
      method: "GET",
      url: "/v2/search/cocktails*",
    }).as("sortingApplied");
    cy.get(".logo").should("contain", "MIXdrinks");

    cy.get(".sorting__list").find('[href="/?sort=biggest-rate"]').click();
    cy.wait("@sortingApplied");
    cy.url().should("contain", "?sort=biggest-rate");
  });

  it.only("Applying filter", () => {
    cy.intercept({
      method: "GET",
      url: "/v2/search/cocktails*",
    }).as("sortingApplied");

    cy.get('[title="міцні"]').find('.filter-list-item__checkbox').click({force:true})

    cy.wait("@sortingApplied");
    cy.get('[class="filters-tag-cloud-list-item__link nuxt-link-active"]').should('exist')
    cy.get('[class="filters-tag-cloud-list-item__link nuxt-link-active"]').click()
    cy.get('[class="filters-tag-cloud-list-item__link nuxt-link-active"]').should('not.exist')
    // cy.url().should("contain", "?sort=biggest-rate");
  });
});
