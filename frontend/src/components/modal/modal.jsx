import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import RegisterContainer from "../session/register_container";
import SignInContainer from "../session/sign_in_container";

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case "signIn":
            component = <SignInContainer />;
            break;
        case "register":
            component = <RegisterContainer />;
            break;
        default:
            return null;
    }
    return (
        <section className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);