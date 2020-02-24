import { connect } from "react-redux";
import { signIn, removeSessionErrors } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SignInForm from "./sign_in_form";

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: user => dispatch(signIn(user)),
        otherForm: () => dispatch(openModal("register")),
        closeModal: () => dispatch(closeModal()),
        removeSessionErrors: () => dispatch(removeSessionErrors())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);