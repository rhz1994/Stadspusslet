describe("Stadspusslet ", function () {
  it("user can complete a puzzle for Gothenburg", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Stadspusslet");
    cy.contains("Välj stad");
    cy.get("select").select("Gothenburg");
    cy.get('[data-testid="puzzle-container"] p').should(
      "contain.text",
      "När grundades Göteborg?"
    );
    cy.get("input").type("1621");
    cy.get("button").click();
    cy.get('[data-testid="puzzle-result"]').should("contain.text", "Rätt!");
  });

  it("user can switch city and see a new puzzle", () => {
    cy.visit("http://localhost:5173/");

    cy.get("select").select("Rome");
    cy.get('[data-testid="puzzle-container"] p').should(
      "contain.text",
      "Vilken är Roms äldsta bro"
    );
  });
});
