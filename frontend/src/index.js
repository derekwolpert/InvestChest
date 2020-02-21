import React from "react";
import { render } from "react-dom";
import "../styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    render("Hello World", root);
});