
import { connect } from "react-redux";
import { register, removeSessionErrors } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import RegisterForm from "./register_form";

const mapStateToProps = (state) => {
    return {
        signedIn: state.session.isAuthenticated,
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: user => dispatch(register(user)),
        otherForm: () => dispatch(openModal("signIn")),
        closeModal: () => dispatch(closeModal()),
        removeSessionErrors: () => dispatch(removeSessionErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);