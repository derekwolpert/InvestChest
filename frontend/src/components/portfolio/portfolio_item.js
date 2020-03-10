import React from "react";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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
                            <th>Purchase Date</th>
                            <th># of Shares</th>
                            <th>Price per Share</th>
                        </tr>
                    </thead>
                    <tbody >
                        {[...this.props.trades].reverse().map((trade, idx) => (
                            <tr key={idx}>
                                <td>{moment(trade.date)
                                    .format("l LTS")}</td>
                                <td>{trade.numberOfShares}</td>
                                <td>${trade.purchasePrice.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return this.state.stateIsSet ? (
            <>
                <li>
                    <div>
                        <span>{`${this.props.stock.symbol} (${
                            this.props.stock.companyName
                        }) – ${this.state.totalShares} Share${
                            this.state.totalShares > 1 ? "s" : ""
                        }`}</span>
                        <span
                            className={
                                this.props.stock.latestPrice > this.props.stock.open
                                    ? "green"
                                    : this.props.stock.latestPrice <
                                      this.props.stock.open
                                    ? "red"
                                    : ""
                            }
                        >
                            {`$${this.state.totalValue.toFixed(2)}`}
                        </span>
                    </div>
                    <FontAwesomeIcon
                        icon={
                            this.state.showDetails ? faChevronUp : faChevronDown
                        }
                        onClick={() =>
                            this.setState({
                                showDetails: !this.state.showDetails
                            })
                        }
                    />
                    <span>
                        Last Updated:{" "}
                        {moment(this.props.stock.latestUpdate).format("l LTS")}
                    </span>
                    {this.state.showDetails ? this.formatTradesHistory() : null}
                </li>
                <span className="spacer" />
            </>
        ) : null;
    }
}

export default PortfolioItem;