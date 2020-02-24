import { connect } from "react-redux";
import Portfolio from "./portfolio";
import { getTrades } from "../../actions/trades_action";

const mapStateToProps = state => {
    return {
        user: state.session.user,
        trades: state.entities.trades
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTrades: () => dispatch(getTrades())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);