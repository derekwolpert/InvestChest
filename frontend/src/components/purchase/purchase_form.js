import React from "react";
import * as moment from "moment";
import StockChart from "../stock_chart/stock_chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

class PurchaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: "",
            quantity: "",
            currentStock: "",
            currentRange: "1d"
        };
        this.partOne = this.partOne.bind(this);
        this.partTwo = this.partTwo.bind(this);
        this.switchToPartTwo = this.switchToPartTwo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.unaffordableWarning = this.unaffordableWarning.bind(this);
        this.setRange = this.setRange.bind(this);
        this.handleChart = this.handleChart.bind(this);
    }

    componentDidUpdate(prevProps) {
        if ((this.state.currentStock in this.props.stocks) && (!this.props.chartError.noChartFound)) {
            if (!("chart" in this.props.stocks[this.state.currentStock])) {
                this.props.getChart(this.state.currentStock, this.state.currentRange);
            } else if (!(this.state.currentRange in this.props.stocks[this.state.currentStock].chart)) {
                this.props.getChart(this.state.currentStock, this.state.currentRange);
            }
        }
    }

    handleChart() {
        if (!this.state.currentStock) {
            return undefined;
        }
        if (!(this.state.currentStock in this.props.stocks)) {
            return undefined;
        }
        if (!("chart" in this.props.stocks[this.state.currentStock])) {
            return undefined;
        }
        if (!(this.state.currentRange in this.props.stocks[this.state.currentStock].chart)) {
            return undefined;
        }
        return this.props.stocks[this.state.currentStock].chart[this.state.currentRange];
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    switchToPartTwo() {
        this.setState({
            ticker: this.state.ticker.toUpperCase().trim(),
            currentStock: this.state.ticker.toUpperCase().trim(),
            currentRange: "1d",
            quantity: ""
        });
        if (this.state.ticker.toUpperCase().trim() in this.props.stocks) {
            this.props.removeStockError();
        }

        if (!(this.state.ticker.toUpperCase().trim() in this.props.stocks)) {
            this.props.removeStockError();
            this.props.getStock(this.state.ticker.trim());
        }
    }

    partOne() {
        return (
            <>
                <input
                    type="text"
                    value={this.state.ticker}
                    onChange={this.update("ticker")}
                    placeholder="Ticker"
                    
                />
                <div className={"purchase-button " + ((this.state.ticker.trim().length > 0 && (this.state.currentStock !== this.state.ticker.trim().toUpperCase())) ? "" : "disabled" )} 
                    onClick={ (e) => { e.preventDefault();
                        (this.state.ticker.trim().length > 0 && (this.state.currentStock !== this.state.ticker.trim().toUpperCase())) ? this.switchToPartTwo() : null }}
                >
                    Lookup
                </div>
            </>
        );
    }

    partTwo() {

        const loadingSpinner = <div className="center-spinner"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
        
        return (
            <>
                <span />
                {this.state.currentStock ? (
                    this.state.currentStock in this.props.stocks ? (
                        <>
                            <span>{`Selected Company: ${
                                this.props.stocks[this.state.currentStock].quote
                                    .symbol
                            } (${
                                this.props.stocks[this.state.currentStock].quote
                                    .companyName
                            })`}</span>
                            <span>
                                Latest Price:{" "}
                                <p
                                    className={
                                        this.props.stocks[
                                            this.state.currentStock
                                        ].quote.latestPrice === null ||
                                        this.props.stocks[
                                            this.state.currentStock
                                        ].quote.previousClose === null
                                            ? ""
                                            : this.props.stocks[
                                                  this.state.currentStock
                                              ].quote.latestPrice >
                                              this.props.stocks[
                                                  this.state.currentStock
                                              ].quote.previousClose
                                            ? "green"
                                            : this.props.stocks[
                                                  this.state.currentStock
                                              ].quote.latestPrice <
                                              this.props.stocks[
                                                  this.state.currentStock
                                              ].quote.previousClose
                                            ? "red"
                                            : ""
                                    }
                                >
                                    {`$${this.props.stocks[
                                        this.state.currentStock
                                    ].quote.latestPrice.toFixed(2)} (${(
                                        (this.props.stocks[
                                            this.state.currentStock
                                        ].quote.latestPrice -
                                            this.props.stocks[
                                                this.state.currentStock
                                            ].quote.previousClose) *
                                        (100 /
                                            this.props.stocks[
                                                this.state.currentStock
                                            ].quote.previousClose)
                                    ).toFixed(2)}%)`}
                                    {(
                                        this.props.stocks[
                                            this.state.currentStock
                                        ].quote.latestPrice === null ||
                                        this.props.stocks[
                                            this.state.currentStock
                                        ].quote.previousClose === null
                                    ) ? null : (
                                        this.props.stocks[
                                            this.state.currentStock
                                        ].quote.latestPrice >
                                            this.props.stocks[
                                                this.state.currentStock
                                            ].quote.previousClose ? (
                                            <FontAwesomeIcon icon={faArrowUp} />
                                        ) : this.props.stocks[
                                              this.state.currentStock
                                          ].quote.latestPrice <
                                          this.props.stocks[
                                              this.state.currentStock
                                          ].quote.previousClose ? (
                                            <FontAwesomeIcon
                                                icon={faArrowDown}
                                            />
                                        ) : null
                                    )}
                                </p>
                            </span>
                            <span>
                                Last Updated:{" "}
                                {moment(
                                    this.props.stocks[this.state.currentStock]
                                        .quote.latestUpdate
                                ).format("MMM Do YYYY, h:mm:ss A")}
                            </span>
                        </>
                    ) : this.props.stockError.noStockFound ? (
                        <>
                            <span className="stock-data purchase-error">
                                {`${this.props.stockError.noStockFound} ${this.props.stockError.symbol}`}
                            </span>
                            <span className="empty stock-data purchase-error" />
                            <span className="empty stock-data purchase-error" />
                        </>
                    ) : (
                        <div className="purchase-loading-container">
                            {loadingSpinner}
                        </div>
                    )
                ) : (
                    <>
                        <span className="empty" />
                        <span className="empty" />
                        <span className="empty" />
                    </>
                )}
                <input
                    type="number"
                    value={this.state.quantity}
                    onChange={this.update("quantity")}
                    placeholder="Quantity"
                    disabled={!(this.state.currentStock in this.props.stocks)}
                />
                <input
                    className="purchase-button"
                    disabled={
                        this.state.currentStock.length === 0 ||
                        !this.state.quantity ||
                        this.unaffordableWarning()
                    }
                    type="submit"
                    value="Submit"
                />
                {this.unaffordableWarning() ? (
                    <div className="purchase-error">
                        Cannot afford {this.state.quantity} shares of{" "}
                        {this.state.currentStock}
                    </div>
                ) : null}
            </>
        );
    }

    unaffordableWarning() {
        if ((!!this.state.quantity) && (this.state.currentStock in this.props.stocks)) {
            if ((this.props.stocks[this.state.currentStock].quote.latestPrice * this.state.quantity) > this.props.user.cash) {
                return true;
            }
        }
        return false;
    }

    handleSubmit(e) {
        e.preventDefault();
        let trade = {
            symbol: this.state.currentStock,
            purchasePrice: this.props.stocks[this.state.currentStock].quote.latestPrice.toFixed(2),
            numberOfShares: this.state.quantity
        }
        this.props.createTrade(trade);
        this.setState({
            ticker: "",
            quantity: "",
            currentStock: "",
            currentRange: "1d"
        })
    }

    setRange(range) {
        if (this.state.currentRange !== range) {
            this.setState({
                currentRange: range
            })
        }
    }

    render() {
        return (
            <section className="purchase-form-container">
                <form onSubmit={this.handleSubmit}>
                    {this.partOne()}
                    {this.partTwo()}
                </form>
                    <section className="chart-selectors">
                        {(this.state.currentStock in this.props.stocks) && ("chart" in this.props.stocks[this.state.currentStock]) ?
                            <>
                                <p 
                                    className={`chart-range${this.state.currentRange === "1d" ? "-active" : ""}`}
                                    onClick={() => this.setRange("1d")}
                                >
                                    1D
                                </p>
                                <p className="divider" />
                                <p
                                    className={`chart-range${this.state.currentRange === "5dm" ? "-active" : ""}`}
                                    onClick={() => this.setRange("5dm")}
                                >
                                    1W
                                </p>
                                <p className="divider" />
                                <p
                                    className={`chart-range${this.state.currentRange === "1mm" ? "-active" : ""}`}
                                    onClick={() => this.setRange("1mm")}
                                >
                                    1M
                                </p>
                                <p className="divider" />
                                <p 
                                    className={`chart-range${this.state.currentRange === "3m" ? "-active" : ""}`}
                                    onClick={() => this.setRange("3m")}
                                >
                                    3M
                                </p>
                                <p className="divider" />
                                <p 
                                    className={`chart-range${this.state.currentRange === "6m" ? "-active" : ""}`}
                                    onClick={() => this.setRange("6m")}
                                >
                                    6M
                                </p>
                                <p className="divider" />
                                <p 
                                    className={`chart-range${this.state.currentRange === "1y" ? "-active" : ""}`}
                                    onClick={() => this.setRange("1y")}
                                >
                                    1Y
                                </p>
                                <p className="divider" />
                                <p 
                                    className={`chart-range${this.state.currentRange === "2y" ? "-active" : ""}`}
                                    onClick={() => this.setRange("2y")}
                                >
                                    2Y
                                </p>
                                <p className="divider" />
                                <p 
                                    className={`chart-range${this.state.currentRange === "5y" ? "-active" : ""}`}
                                    onClick={() => this.setRange("5y")}
                                >
                                    5Y
                                </p>
                            </>
                            :
                            <>
                                <p className="chart-range disabled">1D</p>
                                <p className="divider" />
                                <p className="chart-range disabled">1W</p>
                                <p className="divider" />
                                <p className="chart-range disabled">1M</p>
                                <p className="divider" />
                                <p className="chart-range disabled">3M</p>
                                <p className="divider" />
                                <p className="chart-range disabled">6M</p>
                                <p className="divider" />
                                <p className="chart-range disabled">1Y</p>
                                <p className="divider" />
                                <p className="chart-range disabled">2Y</p>
                                <p className="divider" />
                                <p className="chart-range disabled">5Y</p>
                            </>
                        }
                    </section> 
                <StockChart
                    data={this.handleChart()}
                    range={this.state.currentRange}
                    symbol={this.props.stockError.noStockFound ? "" : this.state.currentStock}
                    error={!!this.props.chartError.noChartFound}
                />
                <p>NOTE: Stock chart data used above utilizes IEX Cloud's Sandbox testing to avoid exceeding IEX's free-tier API call limit, <a href="https://iexcloud.io/docs/api/#testing-sandbox" target="_blank">click here to learn more about this limitation</a>.</p>
            </section>
        );
    }

}

export default PurchaseForm;