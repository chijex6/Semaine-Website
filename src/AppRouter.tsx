import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { App } from "./App";
export function AppRouter() {
  return <Router>
      <App />
    </Router>;
}