import PuzzleCard from "../../src/components/PuzzleCard";

describe("PuzzleCard.tsx", () => {
  it("mounts PuzzleCard and displays a puzzle for Gothenburg", () => {
    cy.mount(<PuzzleCard city={"Gothenburg"} />);
    cy.get('[data-testid="puzzle-container"]').should("be.visible");
    cy.get('[data-testid="puzzle-header"]').should("be.visible");
    cy.get("p").should("be.visible");
    cy.get("img").should("be.visible");
    cy.get("input").should("be.visible");
    cy.get("input").type("Svar");
    cy.get("input").should("have.value", "Svar");
  });
});
