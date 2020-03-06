import React from "react";

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { date: "2020-01-29", close: 330.35 },
                { date: "2020-01-30", close: 330.65 },
                { date: "2020-01-31", close: 324.47 },
                { date: "2020-02-03", close: 318.49 },
                { date: "2020-02-04", close: 330.39 },
                { date: "2020-02-05", close: 325.91 },
                { date: "2020-02-06", close: 336.86 },
                { date: "2020-02-07", close: 327.58 },
                { date: "2020-02-10", close: 325.27 },
                { date: "2020-02-11", close: 334.77 },
                { date: "2020-02-12", close: 340.3 },
                { date: "2020-02-13", close: 337.01 },
                { date: "2020-02-14", close: 339.31 },
                { date: "2020-02-18", close: 327 },
                { date: "2020-02-19", close: 334.1 },
                { date: "2020-02-20", close: 331.8 },
                { date: "2020-02-21", close: 313.6 },
                { date: "2020-02-24", close: 311.07 },
                { date: "2020-02-25", close: 294.56 },
                { date: "2020-02-26", close: 298.72 },
                { date: "2020-02-27", close: 284.61 },
                { date: "2020-02-28", close: 284.01 }
            ]
        };

    }

    componentDidMount() {

    }

    render() {
        
        return (
            null
        );

    }
}


export default StockChart;