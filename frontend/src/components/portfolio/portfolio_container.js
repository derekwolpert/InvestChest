import { connect } from "react-redux";
import Portfolio from "./portfolio";

const mapStateToProps = state => {
    return {
        signedIn: state.session.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);