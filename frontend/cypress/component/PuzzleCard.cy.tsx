import PuzzleCard from "../../src/components/PuzzleCard";
import { Quest, Puzzle } from "../../src/types/types";

const mockQuest: Quest = {
  id: 1,
  name: "Göteborgs Äventyr",
  description: "Utforska Göteborg genom 4 historiska platser",
  cityId: 1,
};

export const mockPuzzles: Puzzle[] = [
  {
    id: 1,
    questId: 1,
    locationId: 1,
    puzzleText: "Vilken fisk konsumeras mest i Göteborg",
    correctAnswer: "Torsk",
    orderNumber: 1,
    clueText: "Börja vid där fisken en gång kom in till staden",
    correctClueLocation: 1,
    puzzleType: "text",
  },
  {
    id: 2,
    questId: 1,
    locationId: 2,
    puzzleText: "Vilken är Göteborgs högst punkt?",
    correctAnswer: "Vättlefjäll",
    orderNumber: 2,
    clueText: "Klättra upp till det gamla tornet",
    correctClueLocation: 2,
    puzzleType: "text",
  },
  {
    id: 3,
    questId: 1,
    locationId: 3,
    puzzleText:
      "Vilken känd Göteborgs konstnär som finns utställd på museet författade barnboken 'Kattresan'?",
    correctAnswer: "Ivar Arosenius",
    orderNumber: 3,
    clueText: "Sök efter konst",
    correctClueLocation: 3,
    puzzleType: "text",
  },
  {
    id: 4,
    questId: 1,
    locationId: 4,
    puzzleText:
      "Vad kallas de för Göteborg karaktäristiska byggnader som är vanliga på denna gata?",
    correctAnswer: "Landshövdingshus",
    orderNumber: 4,
    clueText: "Promenera längs gatan som är känd för sina kanelbullar",
    correctClueLocation: 4,
    puzzleType: "text",
  },
];

describe("PuzzleCard.tsx", () => {
  it("mounts PuzzleCard and displays puzzles for Gothenburg", () => {
    // Kollar så att rätt pussel visas
    cy.url().should("include", "/quest/gothenburg");

    cy.intercept(
      { method: "GET", url: `/api/puzzles?questId=${mockQuest.id}` },
      { body: mockPuzzles }
    ).as("getPuzzles");

    cy.mount(<PuzzleCard quest={mockQuest} />);
    cy.wait("@getPuzzles");

    cy.contains(mockQuest.name).should("be.visible");
    cy.get("h1").should("be.visible");
    cy.get('[data-testid="timer-container"]').should("be.visible");
    cy.get('[data-testid="map-container"]').should("be.visible");

    // Går igenom alla fyra pussel som ingår i "questet".
    mockPuzzles.forEach((puzzle, index) => {
      cy.get('[data-testid="clue-container"]')
        .eq(index)
        .should("contain.text", puzzle.clueText);
      cy.get(`[data-testid="clue-marker-${puzzle.id}"]`).click();
      cy.get('[data-testid="puzzle-container"]').should("be.visible");
      cy.get('[data-testid="solve-puzzle-button"]').click();
    });

    cy.get('[data-testid="puzzle-solved-message"]').should(
      "contain.text",
      "Grattis!"
    );
  });
});
