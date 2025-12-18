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
    clueText: "Börja där fisken en gång kom in till staden",
    correctClueLocation: 1,
    puzzleType: "text",
    cityLat: 57.7089,
    cityLon: 11.9746,
    locationLat: 57.7010821,
    locationLon: 11.9578305,
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
    cityLat: 57.7089,
    cityLon: 11.9746,
    locationLat: 57.6960493,
    locationLon: 11.9553523,
  },
  {
    id: 3,
    questId: 1,
    locationId: 3,
    puzzleText:
      'Vilken känd Göteborgs konstnär som finns utställd på museet författade barnboken "Kattresan"?',
    correctAnswer: "Ivar Arosenius",
    orderNumber: 3,
    clueText: "Sök efter konst",
    correctClueLocation: 3,
    puzzleType: "text",
    cityLat: 57.7089,
    cityLon: 11.9746,
    locationLat: 57.696521,
    locationLon: 11.9805977,
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
    cityLat: 57.7089,
    cityLon: 11.9746,
    locationLat: 57.6984879,
    locationLon: 11.957022,
  },
];
describe("PuzzleCard.tsx", () => {
  it("renders the first puzzle for Gothenburg", () => {
    cy.intercept(
      { method: "GET", url: `/puzzles/quest/${mockQuest.id}` },
      { body: mockPuzzles }
    ).as("getPuzzles");

    cy.mount(<PuzzleCard quest={mockQuest} />);

    cy.wait("@getPuzzles");

    // Kontrollera att komponenten innehåller korrekt grundläggande struktur
    cy.contains(mockQuest.name).should("be.visible");
    cy.get("h1").should("be.visible");

    // Kontrollera att kartan syns
    cy.get('[data-testid="map-container"]').should("be.visible");

    // Kontrollera att första ledtråden visas
    cy.get('[data-testid="clue-container"]').should(
      "contain.text",
      mockPuzzles[0].clueText
    );

    // Kontrollera att dölj ledtråd fungear
    cy.get("button").contains("Dölj ledtråd").click();
    cy.get('[data-testid="clue-container"]').should("not.exist");
  });
});
