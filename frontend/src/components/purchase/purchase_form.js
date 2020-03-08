import React from "react";
import * as moment from "moment";
import StockChart from "../stock_chart/stock_chart";

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
        if (this.state.currentStock in this.props.stocks) {
            if (!("chart" in this.props.stocks[this.state.currentStock])) {
                this.props.getChart(this.state.currentStock, this.state.currentRange);
            } else if (!(this.state.currentRange in this.props.stocks[this.state.currentStock].chart)) {
                this.props.getChart(this.state.currentStock, this.state.currentRange);
            }
        }
    }

    handleChart() {
        if (!("chart" in this.props.stocks[this.state.currentStock])) {
            return [];
        }
        if (!(this.state.currentRange in this.props.stocks[this.state.currentStock].chart)) {
            return [];
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
            currentStock: this.state.ticker.toUpperCase(),
            currentRange: "1d",
            quantity: ""
        });
        if (this.state.ticker.toUpperCase() in this.props.stocks) {
            this.props.removeStockError();
        }

        if (!(this.state.ticker.toUpperCase() in this.props.stocks)) {
            this.props.getStock(this.state.ticker);
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
                <div className={"purchase-button " + ((this.state.ticker.length > 0 && (this.state.currentStock !== this.state.ticker.toUpperCase())) ? "" : "disabled" )} 
                    onClick={ (e) => { e.preventDefault();
                        (this.state.ticker.length > 0 && (this.state.currentStock !== this.state.ticker.toUpperCase())) ? this.switchToPartTwo() : null }}
                >
                    Lookup
                </div>
            </>
        );
    }

    partTwo() {
        return (
            <>
                {this.state.currentStock in this.props.stocks ?
                    <>
                        <span>{`Selected Company: ${this.props.stocks[this.state.currentStock].quote.symbol} (${this.props.stocks[this.state.currentStock].quote.companyName})`}</span>
                        <span>{`Latest Price: $${this.props.stocks[this.state.currentStock].quote.latestPrice.toFixed(2)}`}</span>
                        <span>Last Updated:{" "}
                            {moment(
                                this.props.stocks[this.state.currentStock].quote.latestUpdate
                            ).calendar()}
                        </span>
                    </> :
                    <>
                        {this.props.stockError.noStockFound ? <span className="purchase-error">
                            {`${this.props.stockError.noStockFound} ${this.props.stockError.symbol}`}
                            </span> : <span>– – –</span> }
                        <span>– – –</span>
                        <span>– – –</span>
                    </>
                }
                <input
                    type="number"
                    value={this.state.quantity}
                    onChange={this.update("quantity")}
                    placeholder="Quantity"
                    disabled={!(this.state.currentStock in this.props.stocks)}
                />
                <input
                    className="purchase-button"
                    disabled={((this.state.currentStock.length === 0) || (!this.state.quantity) || this.unaffordableWarning()) }
                    type="submit"
                    value="Submit"
                />
                {this.unaffordableWarning() ? <div className="purchase-error" >Cannot afford {this.state.quantity} shares of {this.state.currentStock}</div> : null }
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
                {this.state.currentStock in this.props.stocks ?
                <>
                    <section className="chart-selectors">
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
                    </section>
                    <StockChart data={this.handleChart()} range={this.state.currentRange} />
                </> : null
                }
                
            </section>
        );
    }

}

export default PurchaseForm;