import React from "react";
import * as moment from "moment";

class PurchaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: "",
            quantity: "",
            currentStock: "",
            partTwo: false
        };
        this.partOne = this.partOne.bind(this);
        this.partTwo = this.partTwo.bind(this);
        this.switchToPartTwo = this.switchToPartTwo.bind(this);
    }


    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    switchToPartTwo() {


        this.setState({ 
            currentStock: this.state.ticker.toUpperCase(),
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
                <button className="purchase-button" 
                    onClick={ (e) => { e.preventDefault();
                        this.state.ticker.length > 0 ? this.switchToPartTwo() : null }}
                    disabled={((this.state.ticker.length === 0) || (this.state.currentStock === this.state.ticker.toUpperCase()))}        
                >
                    Lookup
                </button>
                {this.props.stockError.noStockFound ? 
                <div className="purchase-error">
                    {this.props.stockError.noStockFound}
                </div> : null}
            </>
        );
    }

    partTwo() {
        return (
            <>
                {this.state.currentStock in this.props.stocks ?
                    <>
                        <span>{this.props.stocks[this.state.currentStock].quote.symbol} ({this.props.stocks[this.state.currentStock].quote.companyName})</span>
                        <span>{`Latest Price: $${this.props.stocks[this.state.currentStock].quote.latestPrice}`}</span>
                        <span>Last Updated:{" "}
                            {moment(
                                this.props.stocks[this.state.currentStock].quote.latestUpdate
                            ).calendar()}
                        </span>
                    </> :
                    <>
                        <span>– – –</span>
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
            </>
        );
    }

    render() {
        return (
            <section className="purchase-form-container">
                <form>
                    { this.partOne() }
                    { this.partTwo() }
                </form>
            </section>
        );
    }

}

export default PurchaseForm;