import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom"
import { Snackbar } from "@material-ui/core"

import CustomAlert from '../components/customAlert/CustomAlert';
import { close_toaster_message } from "../../redux/reducers/toasterReducer";
import { logout } from '../../redux/reducers/userReducer';

function Toaster({
    close_toaster_message,
    toasterState,
    logout
}) {
    let unauthorized;
    useEffect(() => {
        unauthorized = toasterState.failureMessage && toasterState.failureMessage.includes("Invalid token");
        if (unauthorized) {
            logout();
            close_toaster_message();
            localStorage.clear();
        }
    }, [toasterState]);

    const showToaster = ("successMessage" in toasterState) || ("failureMessage" in toasterState);
    if (unauthorized) {
        return <Redirect to="/auth/sign-in" />
    }
    return (
        (toasterState.successMessage || toasterState.failureMessage) ? <Snackbar open={showToaster} autoHideDuration={2000} onClose={close_toaster_message}>
            {toasterState.successMessage ?
                <CustomAlert variant="filled" severity="success" onClose={close_toaster_message}>
                    {toasterState.successMessage}
                </CustomAlert>
                :
                toasterState.failureMessage && (<CustomAlert variant="filled" severity="error" onClose={close_toaster_message}>
                    {toasterState.failureMessage}
                </CustomAlert>)
            }
        </Snackbar> : null
    );
}

const mapStatetoProps = (state) => ({
    toasterState: state.toasterReducer
});

const mapDispatchToProps = (dispatch) => {
    return {
        close_toaster_message: () => {
            dispatch(close_toaster_message());
        },
        logout: () => {
            dispatch(logout());
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Toaster);