import './index.css';
import { BrowserRouter } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./AppRouter";
ReactDOM.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>,
    document.getElementById("root")
)
