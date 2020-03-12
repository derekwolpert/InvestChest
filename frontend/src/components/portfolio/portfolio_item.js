import React from "react";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
            <>
                <span>Transaction History:</span>
                <div className="portfolio-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th># of Shares</th>
                                <th>Price-per-Share</th>
                                <th>Profit %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...this.props.trades].reverse().map((trade, idx) => (
                                <tr key={idx}>
                                    <td>{moment(trade.date).format("M/D/YY h:mm A")}</td>
                                    <td>{trade.numberOfShares}</td>
                                    <td>${trade.purchasePrice.toFixed(2)}</td>
                                    <td
                                        className={
                                            this.props.stock.latestPrice !== null
                                                ? this.props.stock.latestPrice >
                                                trade.purchasePrice
                                                    ? "green"
                                                    : this.props.stock.latestPrice <
                                                    trade.purchasePrice
                                                    ? "red"
                                                    : ""
                                                : ""
                                        }
                                    >
                                        {(
                                            ((this.props.stock.latestPrice -
                                                trade.purchasePrice) /
                                                trade.purchasePrice) *
                                            100
                                        ).toFixed(2)}%
                                        {this.props.stock.latestPrice !== null ? (
                                            this.props.stock.latestPrice >
                                            trade.purchasePrice ? (
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            ) : this.props.stock.latestPrice <
                                            trade.purchasePrice ? (
                                                <FontAwesomeIcon icon={faArrowDown} />
                                            ) : (
                                                null
                                            )
                                        ) : (
                                            null
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    render() {
        return this.state.stateIsSet ? (
            <>
                <li>
                    <div>
                        <span>{`${this.props.stock.symbol} – ${
                            this.state.totalShares
                        } Share${this.state.totalShares > 1 ? "s" : ""}`}</span>
                        <span
                            className={
                                this.props.stock.previousClose !== null &&
                                this.props.stock.latestPrice !== null
                                    ? this.props.stock.latestPrice >
                                      this.props.stock.previousClose
                                        ? "green"
                                        : this.props.stock.latestPrice <
                                          this.props.stock.previousClose
                                        ? "red"
                                        : ""
                                    : ""
                            }
                        >
                            {`$${this.state.totalValue.toFixed(2)}`}
                            {this.props.stock.latestPrice !== null &&
                            this.props.stock.previousClose !== null ? (
                                this.props.stock.latestPrice >
                                this.props.stock.previousClose ? (
                                    <FontAwesomeIcon icon={faArrowUp} />
                                ) : this.props.stock.latestPrice <
                                  this.props.stock.previousClose ? (
                                    <FontAwesomeIcon icon={faArrowDown} />
                                ) : null
                            ) : null}
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
                        <span>({this.props.stock.companyName})</span>
                        <span>
                            Last Updated:{" "}
                            {moment(this.props.stock.latestUpdate).format(
                                "l LT"
                            )}
                        </span>
                    </span>
                    {this.state.showDetails ? (
                        <>
                            <span>Daily Trading Data:</span>
                            <div className="portfolio-table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Previous Close</th>
                                            <th>Latest Price</th>
                                            <th>Change %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {moment(
                                                    this.props.stock
                                                        .lastTradeTime
                                                ).format("M/D/YY")}
                                            </td>
                                            <td>
                                                {this.props.stock
                                                    .previousClose === null
                                                    ? "N/A"
                                                    : `$${this.props.stock.previousClose.toFixed(
                                                          2
                                                      )}`}
                                            </td>
                                            <td>
                                                {this.props.stock
                                                    .latestPrice === null
                                                    ? "N/A"
                                                    : `$${this.props.stock.latestPrice.toFixed(
                                                          2
                                                      )}`}
                                            </td>
                                            <td
                                                className={
                                                    this.props.stock
                                                        .previousClose !==
                                                        null &&
                                                    this.props.stock
                                                        .latestPrice !== null
                                                        ? this.props.stock
                                                              .latestPrice >
                                                          this.props.stock
                                                              .previousClose
                                                            ? "green"
                                                            : this.props.stock
                                                                  .latestPrice <
                                                              this.props.stock
                                                                  .previousClose
                                                            ? "red"
                                                            : ""
                                                        : ""
                                                }
                                            >
                                                {this.props.stock
                                                    .previousClose !== null &&
                                                this.props.stock.latestPrice !==
                                                    null
                                                    ? `${(
                                                          (this.props.stock
                                                              .latestPrice -
                                                              this.props.stock
                                                                  .previousClose) *
                                                          (100 /
                                                              this.props.stock
                                                                  .previousClose)
                                                      ).toFixed(2)}%`
                                                    : "N/A"}
                                                {this.props.stock
                                                    .latestPrice !== null &&
                                                this.props.stock
                                                    .previousClose !== null ? (
                                                    this.props.stock
                                                        .latestPrice >
                                                    this.props.stock
                                                        .previousClose ? (
                                                        <FontAwesomeIcon
                                                            icon={faArrowUp}
                                                        />
                                                    ) : this.props.stock
                                                          .latestPrice <
                                                      this.props.stock
                                                          .previousClose ? (
                                                        <FontAwesomeIcon
                                                            icon={faArrowDown}
                                                        />
                                                    ) : null
                                                ) : null}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {this.formatTradesHistory()}
                            <p>
                                Note: IEX Cloud API will occasionally return
                                "null" as a value. If a "null" value occurs
                                effected data fields are replaced with "N/A",{" "}
                                <a
                                    href="https://iexcloud.io/docs/api/#quote"
                                    target="_blank"
                                >
                                    click here to learn more about this
                                    limitation
                                </a>
                                .
                            </p>
                        </>
                    ) : null}
                </li>
                <span className="spacer" />
            </>
        ) : null;
    }
}

export default PortfolioItem;