Feature: Stadsväljare

  Det ska finnas en rullgardinsmeny där användaren kan välja en stad.
  När en stad väljs ska ett pussel som hör till den staden visas.

  Scenario: Välj Göteborg
    Given Jag ser hemsidan och menyn visar olika städer.
    When Jag klickar på menyn och väljer "Gothenburg" från listan.
    Then Ett pussel för staden "Gothenburg" ska visas.

  Scenario: Välj Rom
    Given Jag ser hemsidan och menyn visar olika städer.
    When Jag klickar på menyn och väljer "Rome" från listan.
    Then Ett pussel för staden "Rome" ska visas.

  Scenario: Välj Prag
    Given Jag ser hemsidan och menyn visar olika städer.
    When Jag klickar på menyn och väljer "Prague" från listan.
    Then Ett pussel för staden "Prague" ska visas.
