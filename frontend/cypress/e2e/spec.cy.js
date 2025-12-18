describe("Stadspusslet happy userflow", () => {
  it("User can choose a city, start a quest, and see the first puzzle", () => {
    cy.intercept("GET", "http://localhost:3000/cities", {
      body: [
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
      ],
    }).as("getCities");

    cy.intercept("GET", "http://localhost:3000/cities/slug/gothenburg", {
      body: {
        id: 1,
        name: "Göteborg",
        latitude: 57.7089,
        longitude: 11.9746,
        icon: "gothenburg.png",
        slug: "gothenburg",
      },
    }).as("getCityDetails");

    cy.intercept("GET", "http://localhost:3000/quests/city/gothenburg", {
      body: [
        {
          id: 1,
          name: "Göteborgs Äventyr",
          description: "Utforska Göteborg genom 4 historiska platser",
          city_id: 1,
        },
      ],
    }).as("getQuests");

    cy.intercept("GET", "http://localhost:3000/quests/id/1", {
      body: {
        id: 1,
        name: "Göteborgs Äventyr",
        description: "Utforska Göteborg genom 4 historiska platser",
        city_id: 1,
      },
    }).as("getQuestById");

    cy.intercept("GET", "http://localhost:3000/puzzles/quest/1", {
      body: [
        {
          id: 1,
          quest_id: 1,
          location_id: 1,
          puzzle_text: "Vad heter arkitekten som ritade Fiskekyrkan?",
          correct_answer: "Victor Von Gegerfelt",
          order_number: 1,
          orderNumber: 1,
          clue_text: "Börja där fisken en gång kom in till staden",
          clueText: "Börja där fisken en gång kom in till staden",
          puzzle_type: "text",
          location_lat: 57.7089,
          locationLat: 57.7089,
          location_lon: 11.9746,
          locationLon: 11.9746,
          city_lat: 57.7089,
          cityLat: 57.7089,
          city_lon: 11.9746,
          cityLon: 11.9746,
        },
      ],
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

    cy.get('[data-testid="clue-container"]', { timeout: 10000 }).should(
      "contain.text",
      "Börja där fisken en gång kom in till staden"
    );
    cy.get('[data-testid="map-container"]').should("be.visible");
  });
});

describe("Handle cases when city is not available", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/cities", {
      body: [
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
      ],
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
