import CityPicker from "../../src/components/CityPicker";

describe("<CityPicker />", () => {
  it("User can consent to location tracking and see nearby cities", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (cb) => {
          cb({ coords: { latitude: 57.7089, longitude: 11.9746 } });
        }
      );
    });

    cy.intercept("GET", "http://localhost:3000/cities", {
      body: [
        { id: 1, name: "Göteborg", latitude: 57.7089, longitude: 11.9746 },
        { id: 2, name: "Rom", latitude: 41.9028, longitude: 12.4964 },
        { id: 3, name: "Prag", latitude: 50.0755, longitude: 14.4378 },
      ],
    }).as("getCities");

    cy.mount(<CityPicker />);

    cy.get("p").should(
      "contain.text",
      "Meddela tillgång till platåtkomst för att använda webbplatsen"
    );

    cy.get("button").contains("Yes").click();

    cy.wait("@getCities");

    cy.get("li").first().should("contain.text", "Göteborg");
  });
});
