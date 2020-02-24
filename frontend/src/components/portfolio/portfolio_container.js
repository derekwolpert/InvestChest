import { connect } from "react-redux";
import Portfolio from "./portfolio";
import { getTrades } from "../../actions/trade_actions";
import { getStocks } from "../../actions/stock_actions";

const formatTradesForPortfolio = (trades) => {
    const combinedTrades = {};
    
    for (let trade of trades) {

        if (trade.symbol in combinedTrades) {
            combinedTrades[trade.symbol].totalShares += trade.numberOfShares;
            combinedTrades[trade.symbol].totalValue += trade.numberOfShares * trade.purchasePrice;
        } else {
            combinedTrades[trade.symbol] = {
                totalShares: trade.numberOfShares,
                totalValue: trade.numberOfShares * trade.purchasePrice
            };
        }

    }
    return combinedTrades;
};

const mapStateToProps = state => {
    return {
        user: state.session.user,
        trades: state.entities.trades ? state.entities.trades : null,
        stocks: state.entities.stocks ? state.entities.stocks : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTrades: () => dispatch(getTrades()),
        getStocks: (stocks) => dispatch(getStocks(stocks))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);