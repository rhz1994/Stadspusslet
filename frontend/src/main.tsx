import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import Routes from "./router/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes>
      <App />
    </Routes>
  </StrictMode>
);
