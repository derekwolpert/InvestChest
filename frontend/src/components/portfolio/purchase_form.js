import React from "react";
import * as moment from "moment";

class PurchaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: "",
            quantity: "",
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
        this.props.getStock(this.state.ticker);
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
                {this.props.stockError.noStockFound ? 
                <div className="purchase-error">
                    {this.props.stockError.noStockFound}
                </div> : null}
                <div className="purchase-button" 
                    onClick={ () => this.state.ticker.length > 0 ? this.switchToPartTwo() : null }
                >
                    Lookup
                </div>

            </>
        );
    }

    partTwo() {
        return "hi";
    }

    render() {
        return (
            <section className="purchase-form-container">
                <form>
                    { this.state.partTwo ? this.partTwo() : this.partOne() }
                </form>
            </section>
        );
    }

}

export default PurchaseForm;