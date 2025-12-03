import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://localhost:5173/");
});

Given("Jag ser hemsidan och menyn visar olika städer.", () => {
  cy.get("select").should("exist");
  cy.get("select").find("option").its("length").should("be.gte", 3);
});

When(
  "Jag klickar på menyn och väljer {string} från listan.",
  (city: string) => {
    cy.get("select").select(city);
  }
);

Then("Ett pussel för staden {string} ska visas.", (city: string) => {
  const puzzles: Record<string, string> = {
    Gothenburg: "När grundades Göteborg?",
    Rome: "Vilken är Roms äldsta bro",
    Prague:
      "Nämn en av de två kända handskrifter som togs som krigsbyte av svenska soldater under det trettioåriga kriget?",
  };

  cy.get('[data-testid="puzzle-question"]').should(
    "contain.text",
    puzzles[city]
  );
  cy.get('[data-testid="puzzle-container"] img').should("be.visible");
});
