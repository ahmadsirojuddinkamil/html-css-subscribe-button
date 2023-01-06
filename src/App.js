import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Create from "./components/create/create";
import Product from "./components/product/product";
import Update from "./components/update/update";
import Detail from "./components/product/detail";
import Page from "./components/product/page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/product" element=<Product /> />
                <Route exact path="/product/:slug" element=<Detail /> />
                <Route exact path="/product/pages/:page" element=<Page /> />
                <Route exact path="/create" element=<Create /> />
                <Route path="/update" element=<Update /> />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
