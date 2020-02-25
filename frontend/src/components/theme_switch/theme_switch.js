import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

class ThemeSwitch extends React.Component {

    componentDidMount() {
        if (!document.documentElement.getAttribute("theme-mode")) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.documentElement.setAttribute("theme-mode", "dark");
            } else {
                document.documentElement.setAttribute("theme-mode", "light");
            }
        }
    }

    render() {
        return (
            <FontAwesomeIcon icon={faLightbulb} onClick={ () => {
                if (document.documentElement.getAttribute("theme-mode") === "dark") {
                    document.documentElement.setAttribute("theme-mode", "light");
                } else {
                    document.documentElement.setAttribute("theme-mode", "dark");
                }
            } } />
        );
    }

}

export default ThemeSwitch;