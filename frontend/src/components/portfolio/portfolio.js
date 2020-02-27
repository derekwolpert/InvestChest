import React from "react";
import PurchaseContainer from "../purchase/purchase_container";
import * as moment from "moment";
import TransactionItem from "../transactions/transaction_item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.formatTradesForPortfolio = this.formatTradesForPortfolio.bind(this);
        this.getStocksFromTrades = this.getStocksFromTrades.bind(this);
        this.portfolioTotal = this.portfolioTotal.bind(this);
        this.formatTransactionItems = this.formatTransactionItems.bind(this);
    }

    componentDidMount() {
        if (!this.props.trades) {
            this.props.getTrades();
        } else if ((!this.props.stocks) && (this.props.trades.length > 0)) {
            this.getStocksFromTrades();
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.trades) {
            this.props.getTrades();
        } else if ((!this.props.stocks) && (this.props.trades.length > 0)) {
            this.getStocksFromTrades();
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

    formatTransactionItems() {
        return (

            <ul className="portfolio-items-container">

                {this.props.trades.map((trade, idx) => (
                    <TransactionItem trade={trade} companyName={this.props.stocks[trade.symbol].quote.companyName} key={idx} />
                ))
                }

            </ul>
        )
    }

    render() {
        const loadingSpinner = <div className="center-spinner"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;

        return (
            <section className="portfolio-container">
                { this.props.trades ? (
                    
                    ((this.props.trades && this.props.stocks) || (this.props.trades.length === 0)) ?
                        <>
                            <h1>{this.props.match.path === "/portfolio" ? `Portfolio ($${this.portfolioTotal()})` : "Transactions"}<span><span>Logged in as</span>{this.props.user.name}</span></h1>
                            <div className="portfolio-content">
                                {(this.props.trades.length > 0) ?

                                <div>{this.props.match.path === "/portfolio" ? this.formatTradesForPortfolio() : this.formatTransactionItems()}</div>
                                : <div className="no-trades-message">
                                    <h1>
                                        Welcome to InvestChest!
                                    </h1>
                                    <span>
                                        You do not own any stocks on our platform. To start your portfolio enter a stock ticker and a purchase quantity in the form on the right side of this page.
                                    </span>
                                    <FontAwesomeIcon icon={faArrowRight} />

                                </div>
                                }
                                <span />
                                <div>
                                    <h1>Cash – ${this.props.user.cash.toFixed(2)} USD</h1>
                                    <PurchaseContainer />
                                </div>
                            </div>
                        </> : loadingSpinner
                        )
                : loadingSpinner }
            </section>
        );
    }
}

export default Portfolio;