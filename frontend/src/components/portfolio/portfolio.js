import React from "react";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getTrades();
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return this.props.trades ? (
            <section className="portfolio-container">
                <h1>Portfolio ($0000.00)</h1>
                <div className="portfolio-content">
                    <div>Side 1</div>
                    <span></span>
                    <div>Side 2</div>

                </div>
            </section>
        ) : null;
    }
}

export default Portfolio;