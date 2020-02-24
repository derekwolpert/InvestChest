import React from "react";
import * as moment from "moment";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.formatTradesForPortfolio = this.formatTradesForPortfolio.bind(this);
    }

    componentDidMount() {
        this.props.getTrades();
    }

    componentDidUpdate(prevProps) {
        if (this.props.trades && !this.props.stocks)  {

            const symbolsSet = new Set();

            for (let trade of this.props.trades) {
                symbolsSet.add(trade.symbol);
            }
            this.props.getStocks([...symbolsSet].join(","));
        } else if (!this.props.trades) {
            this.props.getTrades();
        }
    }


    formatedPortfolioItems(trades) {
        return (
            <ul className="portfolio-items-container">
                {Object.keys(trades)
                    .sort()
                    .map((symbol, idx) => (
                        <li className="portfolio-item" key={idx}>
                            <div>
                                <span>{`${symbol} (${
                                    trades[symbol].companyName
                                }) – ${trades[symbol].totalShares} Share${
                                    trades[symbol].totalShares > 1 ? "s" : ""
                                }`}</span>
                                <span>{`$${trades[symbol].totalValue.toFixed(
                                    2
                                )}`}</span>
                            </div>

                            <span>Last Updated: {moment(
                                this.props.stocks[symbol].quote.latestUpdate
                            ).calendar()}</span>
                        </li>
                    ))}
            </ul>
        );

    }

    formatTradesForPortfolio() {
        const combinedTrades = {};
        
        for (let trade of this.props.trades) {

            if (!(trade.symbol in this.props.stocks)) {
                this.props.getStocks();
            } else {
                if (trade.symbol in combinedTrades) {
                    combinedTrades[trade.symbol].totalShares +=
                        trade.numberOfShares;
                    combinedTrades[trade.symbol].totalValue +=
                        trade.numberOfShares * this.props.stocks[trade.symbol].quote.latestPrice;
                } else {
                    combinedTrades[trade.symbol] = {
                        totalShares: trade.numberOfShares,
                        totalValue: trade.numberOfShares * this.props.stocks[trade.symbol].quote.latestPrice,
                        companyName: this.props.stocks[trade.symbol].quote.companyName
                    };
                }
            }


        }
        return this.formatedPortfolioItems(combinedTrades);
    };

    render() {
        return this.props.trades && this.props.stocks ? (
            <section className="portfolio-container">
                <h1>Portfolio ($0000.00)</h1>
                <div className="portfolio-content">
                    <div>{this.formatTradesForPortfolio()}</div>
                    <span></span>
                    <div>Side 2</div>
                </div>
            </section>
        ) : null;
    }
}

export default Portfolio;