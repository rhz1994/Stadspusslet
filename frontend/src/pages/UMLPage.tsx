import React from "react";
import RenderMermaid from "react-x-mermaid";

const UMLPage: React.FC = () => {
  const diagramCode = `
classDiagram
City --> Quest
Quest --> Puzzle
Puzzle --> Location

class City {
  +id: number
  +name: string
  +slug: string
}

class Quest {
  +id: number
  +name: string
  +description: string
  +cityId: number
}

class Puzzle {
  +id: number
  +puzzleText: string
  +correctAnswer: string
  +orderNumber: number
  +locationId: number
}

class Location {
  +id: number
  +name: string
  +lat: number
  +lng: number
}
  `;

  return (
    <div>
      <h1> UML Diagram</h1>
      <RenderMermaid
        mermaidCode={diagramCode}
        mermaidConfig={{ theme: "default" }}
      />
    </div>
  );
};

export default UMLPage;
