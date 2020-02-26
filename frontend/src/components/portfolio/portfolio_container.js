import { connect } from "react-redux";
import Portfolio from "./portfolio";
import { getTrades } from "../../actions/trade_actions";
import { getStocks } from "../../actions/stock_actions";
import { withRouter } from "react-router-dom";

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio));