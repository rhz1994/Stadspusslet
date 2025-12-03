import { useState } from "react";
import CityPicker from "../../src/components/CityPicker";

describe("CityPicker", () => {
  it("mounts CityPicker and allows user to choose a city", () => {
    const Test = () => {
      const [city, setCity] = useState("");
      return <CityPicker city={city} setCity={setCity} />;
    };

    cy.mount(<Test />);

    cy.get("p").should("contain.text", "Välj stad");
    cy.get("select").should("be.visible");
    cy.get("select").select("Gothenburg");
    cy.get("select").should("have.value", "Gothenburg");
    cy.get("select").select("Rome");
    cy.get("select").should("have.value", "Rome");
    cy.get("select").select("Prague");
    cy.get("select").should("have.value", "Prague");
  });
});
