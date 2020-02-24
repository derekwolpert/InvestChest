import { connect } from "react-redux";
import Splash from "./splash";
import { openModal } from "../../actions/modal_actions";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(null, mapDispatchToProps)(Splash));