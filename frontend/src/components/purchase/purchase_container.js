import { connect } from "react-redux";
import { getStock, removeStockError } from "../../actions/stock_actions";
import { createTrade } from "../../actions/trade_actions";
import PurchaseForm from "./purchase_form";


const mapStateToProps = state => {
    return {
        user: state.session.user,
        stocks: state.entities.stocks ? state.entities.stocks : {},
        stockError: state.errors.stock
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getStock: (stock) => dispatch(getStock(stock)),
        removeStockError: () => dispatch(removeStockError()),
        createTrade: (trade) => dispatch(createTrade(trade))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);