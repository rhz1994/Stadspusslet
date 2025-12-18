const citiesMock = [
  {
    id: 1,
    name: "Göteborg",
    latitude: 57.7089,
    longitude: 11.9746,
    icon: "gothenburg.png",
    slug: "gothenburg",
  },
  {
    id: 2,
    name: "Rom",
    latitude: 41.9028,
    longitude: 12.4964,
    icon: "rome.png",
    slug: "rome",
  },
];

const cityDetailsMock = {
  id: 1,
  name: "Göteborg",
  latitude: 57.7089,
  longitude: 11.9746,
  icon: "gothenburg.png",
  slug: "gothenburg",
};

const questsMock = [
  {
    id: 1,
    name: "Göteborgs Äventyr",
    description: "Utforska Göteborg genom 4 historiska platser",
    cityId: 1,
  },
];

const questByIdMock = {
  id: 1,
  name: "Göteborgs Äventyr",
  description: "Utforska Göteborg genom 4 historiska platser",
  cityId: 1,
};

const puzzlesMock = [
  {
    id: 1,
    questId: 1,
    locationId: 1,
    puzzleText: "Vad heter arkitekten som ritade Fiskekyrkan?",
    clueText: "Börja där fisken en gång kom in till staden",
    orderNumber: 1,
    locationLat: 57.7089,
    locationLon: 11.9746,
    cityLat: 57.7089,
    cityLon: 11.9746,
  },
  {
    id: 2,
    questId: 1,
    locationId: 2,
    puzzleText: "Andra pusslet",
    clueText: "Nästa ledtråd",
    orderNumber: 2,
    locationLat: 57.709,
    locationLon: 11.975,
    cityLat: 57.7089,
    cityLon: 11.9746,
  },
];

describe("Stadspusslet happy userflow", () => {
  it("User can choose a city, start a quest, and see the first puzzle", () => {
    cy.intercept("GET", "http://localhost:3000/cities", {
      body: citiesMock,
    }).as("getCities");
    cy.intercept("GET", "http://localhost:3000/cities/slug/gothenburg", {
      body: cityDetailsMock,
    }).as("getCityDetails");
    cy.intercept("GET", "http://localhost:3000/quests/city/gothenburg", {
      body: questsMock,
    }).as("getQuests");
    cy.intercept("GET", "http://localhost:3000/quests/id/1", {
      body: questByIdMock,
    }).as("getQuestById");
    cy.intercept("GET", "http://localhost:3000/puzzles/quest/1", {
      body: puzzlesMock,
    }).as("getPuzzles");

    cy.visit("http://127.0.0.1:5173/#/", {
      onBeforeLoad(win) {
        win.localStorage.clear();
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (cb) => {
            cb({ coords: { latitude: 57.7089, longitude: 11.9746 } });
          }
        );
      },
    });

    cy.get('[data-testid="location-dialog"]').should("be.visible");
    cy.get('[data-testid="location-consent-text"]').should(
      "contain.text",
      "Vi använder din plats för att visa pussel nära dig"
    );
    cy.get('[data-testid="accept-location"]').click();
    cy.wait("@getCities");

    cy.get('[data-test-id="nearest-city"]', { timeout: 10000 }).should(
      "contain.text",
      "Göteborg"
    );
    cy.contains("button", "Välj stad").click();
    cy.url().should("include", "/city/gothenburg");
    cy.wait("@getCityDetails");

    cy.contains("button", "Starta pussel").click();
    cy.url().should("include", "/city/gothenburg/quests");
    cy.wait("@getQuests");

    cy.get('[data-testid="quest-list"]', { timeout: 10000 }).should("exist");
    cy.contains("button", "Starta quest").click();
    cy.wait("@getQuestById");
    cy.wait("@getPuzzles");

    cy.get('[data-testid="clue-container"]').should(
      "contain.text",
      "Börja där fisken en gång kom in till staden"
    );
    cy.get('[data-testid="map-container"]').should("be.visible");
  });
});

describe("Handle cases when city is not available", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/cities", {
      body: citiesMock,
    }).as("getCities");
  });

  it("Shows message if user denies geolocation", () => {
    cy.visit("http://127.0.0.1:5173/#/", {
      onBeforeLoad(win) {
        win.localStorage.clear();
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (success, error) => {
            error({ code: 1, message: "User denied geolocation" });
          }
        );
      },
    });

    cy.get('[data-testid="location-dialog"]').should("be.visible");
    cy.contains("button", "Neka").click();
    cy.contains("Platstjänster krävs").should("be.visible");
    cy.contains(
      "Du måste ge tillgång till platstjänster för att använda webbplatsen."
    ).should("be.visible");
  });
});

describe("Puzzle game user interactions", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/puzzles/quest/1", {
      body: puzzlesMock,
    }).as("getPuzzles");
    cy.visit("http://127.0.0.1:5173/#/quest/gothenburg/1");
    cy.wait("@getPuzzles");
  });

  it("Shows and hides clue toggle button", () => {
    cy.get('[data-testid="clue-container"] button').click();
    cy.get('[data-testid="clue-container"]').should("not.exist");
    cy.contains("Visa ledtråd").click();
    cy.get('[data-testid="clue-container"]').should("be.visible");
  });

  it("Completes all puzzles and shows solved message", () => {
    cy.get('[data-testid="clue-container"] button').click();
    cy.get('[data-testid="map-container"]').click();
    cy.get('[data-testid="puzzle-container"] input').type(
      "Victor Von Gegerfelt"
    );
    cy.get('[data-testid="solve-puzzle-button"]').click();

    cy.get('[data-testid="clue-container"] button').click();
    cy.get('[data-testid="map-container"]').click();
    cy.get('[data-testid="puzzle-container"] input').type("Svar2");
    cy.get('[data-testid="solve-puzzle-button"]').click();

    cy.get('[data-testid="puzzle-solved-message"]').should(
      "contain.text",
      "Grattis!"
    );
  });
});
