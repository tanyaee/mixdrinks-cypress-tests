describe('A cocktail\'s screen tests', () => {
    beforeEach('Open the site', () => {
        cy.visit('/')
    })

    it('Check the required elements are shown on the page', () => {
        cy.intercept({
            method: "GET",
            url: "/v2/cocktails/full*",
        }).as("cocktail");
        cy.get(".cocktails-body__list")
            .find(".list__item")
            .eq(0)
            .click()

        cy.wait('@cocktail').then( cocktail => {
            const details = cocktail.response.body;
            const receipt = details.receipt
            const goods = details.goods
            const tools = details.tools

            cy.get('.cocktail-header-title').should('contain', details.name)
            cy.get('h1').should('contain', details.name)
            cy.get('.cocktail-body-recipe-list .cocktail-body-recipe-list-item').each(listItem => {
                const itemText = listItem.text()
                expect(itemText).to.equal(receipt[listItem.index()])
            })
            cy.get('.cocktail-body__goods .сomponents-list-item').each(listItem => {
                const itemText = listItem.text()
                expect(itemText).contains(goods[listItem.index()].name)
            })
            cy.get('.cocktail-body__tools .сomponents-list-item').each(listItem => {
                const itemText = listItem.text()
                expect(itemText).contains(tools[listItem.index()].name)
            })

        })

    })
})
