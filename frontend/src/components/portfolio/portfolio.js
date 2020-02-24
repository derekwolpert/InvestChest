import React from "react";
import * as moment from "moment";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.formatTradesForPortfolio = this.formatTradesForPortfolio.bind(this);
        this.getStocksFromTrades = this.getStocksFromTrades.bind(this);
        this.portfolioTotal = this.portfolioTotal.bind(this);
    }

    componentDidMount() {
        if (!this.props.trades) {
            this.props.getTrades();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.trades && !this.props.stocks)  {
            this.getStocksFromTrades();
            
        } else if (!this.props.trades) {
            this.props.getTrades();
        }
    }

    getStocksFromTrades() {
        const symbolsSet = new Set();
        for (let trade of this.props.trades) {
            symbolsSet.add(trade.symbol);
        }
        this.props.getStocks([...symbolsSet].join(","));
    }

    portfolioTotal() {
        let total = 0;
        for (let trade of this.props.trades) {
            total += (this.props.stocks[trade.symbol].quote.latestPrice * trade.numberOfShares);
        }
        return total.toFixed(2);
    }

    formatedPortfolioItems(trades) {
        return (
            <ul className="portfolio-items-container">
                {Object.keys(trades)
                    .sort()
                    .map((symbol, idx) => (
                        <li key={idx}>
                            <div>
                                <span>{`${symbol} (${
                                    trades[symbol].companyName
                                }) – ${trades[symbol].totalShares} Share${
                                    trades[symbol].totalShares > 1 ? "s" : ""
                                }`}</span>
                                <span
                                    className={
                                        trades[symbol].totalValue >
                                        trades[symbol].totalCost
                                            ? "green"
                                            : trades[symbol].totalValue <
                                              trades[symbol].totalCost
                                            ? "red"
                                            : ""
                                    }
                                >{`$${trades[symbol].totalValue.toFixed(
                                    2
                                )}`}</span>
                            </div>

                            <span>
                                Last Updated:{" "}
                                {moment(
                                    this.props.stocks[symbol].quote.latestUpdate
                                ).calendar()}
                            </span>
                        </li>
                    ))}
            </ul>
        );

    }

    formatTradesForPortfolio() {
        const combinedTrades = {};
        
        for (let trade of this.props.trades) {

            if (!(trade.symbol in this.props.stocks)) {
                this.getStocksFromTrades();
            } else {
                if (trade.symbol in combinedTrades) {
                    combinedTrades[trade.symbol].totalShares +=
                        trade.numberOfShares;
                    combinedTrades[trade.symbol].totalValue +=
                        trade.numberOfShares * this.props.stocks[trade.symbol].quote.latestPrice;
                    combinedTrades[trade.symbol].totalCost +=
                        trade.numberOfShares * trade.purchasePrice;
                } else {
                    combinedTrades[trade.symbol] = {
                        totalShares: trade.numberOfShares,
                        totalValue:
                            trade.numberOfShares *
                            this.props.stocks[trade.symbol].quote.latestPrice,
                        companyName: this.props.stocks[trade.symbol].quote
                            .companyName,
                        totalCost: trade.numberOfShares * trade.purchasePrice
                    };
                }
            }


        }
        return this.formatedPortfolioItems(combinedTrades);
    };

    render() {
        return this.props.trades && this.props.stocks ? (
            <section className="portfolio-container">
                <h1>Portfolio (${this.portfolioTotal()})<span><span>Logged in as</span>{this.props.user.name}</span></h1>
                <div className="portfolio-content">
                    <div>{this.formatTradesForPortfolio()}</div>
                    <span />
                    <div>
                        <h1>Cash – ${this.props.user.cash.toFixed(2)}</h1>
                    </div>
                </div>
            </section>
        ) : null;
    }
}

export default Portfolio;