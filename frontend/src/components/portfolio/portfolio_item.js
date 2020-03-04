import React from "react";
import * as moment from "moment";

class PortfolioItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalShares: null,
            totalValue: null,
            totalCost: null,
            stateIsSet: false,
            showDetails: false
        };
        this.calculateState = this.calculateState.bind(this);
        this.formatTradesHistory = this.formatTradesHistory.bind(this);
    }

    componentDidMount() {
        this.setState({
            ...this.calculateState(),
            stateIsSet: true
        });
    }

    componentDidUpdate(prevProps) {
        if ((this.props.trades !== prevProps.trades) || (this.props.stock !== prevProps.stock)) {
            this.setState({
                ...this.calculateState(),
            });
        }
    }


    calculateState() {

        let totalShares = 0;
        let totalValue = 0;
        let totalCost = 0;

        for (let trade of this.props.trades) {
            totalShares += trade.numberOfShares;
            totalValue += trade.numberOfShares * this.props.stock.latestPrice;
            totalCost += trade.numberOfShares * trade.purchasePrice;
        }
        return {
            totalShares: totalShares,
            totalValue: totalValue,
            totalCost: totalCost,
        };
    }

    formatTradesHistory() {
        return (
            <div className="portfolio-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Num of Shares</th>
                            <th>Price per Share</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.trades.reverse().map((trade, idx) => (
                            <tr key={idx}>
                                <td>{moment(trade.date)
                                    .format("l LTS")}</td>
                                <td>{trade.numberOfShares}</td>
                                <td>${trade.purchasePrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            this.state.stateIsSet ?
            <>
                <li className="portfolio-item" onClick={() => this.setState({showDetails: !this.state.showDetails})}>
                    <div>
                        <span>{`${this.props.stock.symbol} (${
                            this.props.stock.companyName
                            }) – ${this.state.totalShares} Share${
                            this.state.totalShares > 1 ? "s" : ""
                            }`}</span>
                        <span
                            className={
                                this.state.totalValue >
                                    this.state.totalCost
                                    ? "green"
                                    : this.state.totalValue <
                                        this.state.totalCost
                                        ? "red"
                                        : ""
                            }
                        >{`$${this.state.totalValue.toFixed(
                            2
                        )}`}</span>
                    </div>

                    <span>
                        Last Updated:{" "}
                        {moment(
                            this.props.stock.latestUpdate
                        ).calendar()}
                    </span>
                    {this.state.showDetails ? this.formatTradesHistory() : null}
                </li>
                <span className="spacer" />
            </>
            : null
        )
    }
}

export default PortfolioItem;