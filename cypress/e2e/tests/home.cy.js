
describe("Home screen tests", () => {
  beforeEach("Open home screen", () => {

    cy.visit("/");
  });

  it("The cocktails list should be visible", async () => {
    cy.request({
      method: 'GET',
      url: 'https://whale-app-iz3av.ondigitalocean.app/v2/search/cocktails?page=0',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((cocktailsList) => {
      const cocktails = cocktailsList.body.cocktails
      cy.get('.cocktails-body__list .list__item').each(item => {
        const itemText = item.text().trim()
        expect(itemText).to.contain(cocktails[item.index()].name)
      })
    })
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

  it("Applying filter", () => {
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
