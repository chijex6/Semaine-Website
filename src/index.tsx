import './index.css';
import { HashRouter } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./AppRouter";
ReactDOM.render(
    <HashRouter>
        <AppRouter />
    </HashRouter>,
    document.getElementById("root")
)
