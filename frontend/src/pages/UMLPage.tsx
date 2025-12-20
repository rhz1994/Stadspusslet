import React from "react";
import RenderMermaid from "react-x-mermaid";

const UMLPage: React.FC = () => {
  const diagramCode = `

flowchart TD
    A[App öppnas] --> B{Platstjänsts tillåten?}
    B -- Ja --> C[Hitta närmaste stad]
    B -- Nej --> D[Visa lista över städer]
    C --> E[CityPicker: välj stad]
    D --> E
    E --> F[Visa pussel-lista]
    F --> G[Starta första pussel]
    G --> H[Visa karta med första pussel]
    H --> I{Klick på rätt plats?}
    I -- Nej --> J[Visa felmeddelande]
    I -- Ja --> K[Visa pussel]
    K --> L{Pussel löst?}
    L -- Nej --> K
    L -- Ja --> M{Finns fler pussel?}
    M -- Ja --> H[Visa nästa pussel på kartan]
    M -- Nej --> N[Grattis! Alla pussel lösta]

  `;

  return (
    <div>
      <h1> UML Diagram</h1>
      {diagramCode && (
        <RenderMermaid
          mermaidCode={diagramCode}
          mermaidConfig={{ theme: "default" }}
        />
      )}
    </div>
  );
};

export default UMLPage;
