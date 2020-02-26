import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn, faAngellist } from '@fortawesome/free-brands-svg-icons';

class Footer extends React.Component {
    render() {
        return (
            <section className="footer-container">
                <div className="footer">
                    <div className="left">
                        <span>
                            <a href="https://derekwolpert.com" target="_blank">
                                Copyright &copy; 2020 Derek Wolpert
                            </a>
                        </span>
                        <a href="https://iexcloud.io" target="_blank">
                            Financial data provided by IEX Cloud, 15 minute
                            delayed price
                        </a>
                    </div>

                    <div className="right">
                        <a href="https://github.com/derekwolpert/InvestChest" target="_blank">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://www.linkedin.com/in/derek-wolpert/" target="_blank">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                        <a href="https://angel.co/derek-wolpert" target="_blank">
                            <FontAwesomeIcon icon={faAngellist} />
                        </a>
                        <a href="https://www.derekwolpert.com/" target="_blank">
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                        <a href="mailto: me@derekwolpert.com">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Footer;