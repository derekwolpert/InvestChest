import React from "react";
import * as moment from "moment";

const TransactionItem = (props) => {
    return (
        <>
            <li>
                <div>
                    <span>BUY – {`${props.trade.symbol} (${
                        props.companyName
                        }) – ${props.trade.numberOfShares} Share${
                        props.trade.numberOfShares > 1 ? "s" : ""
                        } @ $${props.trade.purchasePrice.toFixed(2)}`}</span>
                </div>
                <span className="transaction-date">
                    Purchase Date:{" "}
                    {moment(
                        props.trade.date
                    ).format("MMMM Do YYYY, h:mm:ss A")}
                </span>
            </li>
            <span className="spacer" />
        </>
    )
};

export default TransactionItem;