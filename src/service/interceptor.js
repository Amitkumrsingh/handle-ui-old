import store from "../redux/store";
import {
    fetch_success,
    fetch_error
} from "../redux/reducers/toasterReducer";

import {
    hide_loading_overlay,
} from "../redux/reducers/loadingOverlayReducer"

const getText = (request) => {
    let text;
    switch (request) {
        case "GET":
            text = "fetched records sucessfully";
            break;
        case "PATCH":
            text = "updated record sucessfully";
            break;
        case "DELETE":
            text = "deleted record sucessfully";
            break;
        case "POST":
            text = "created records sucessfully";
            break;
        default:
            text = "fetched records sucessfully";
    }
    return text;
}

const responseInterceptor = (data, request) => {
    const text = getText(request);
    return data
        .then((response) => {
            if (response.ok === true || response.status === 200 || response.status === 201) {
                store.dispatch(hide_loading_overlay({  }));
                store.dispatch(fetch_success({
                    successMessage: text
                }));
                return response;
            } else {
                store.dispatch(hide_loading_overlay({}));
                response.json().then((data) => {
                    store.dispatch(fetch_error({
                        failureMessage: data.error || data.detail || data.email
                    }))
                })
            }
        })
        .catch((error) => {
            store.dispatch(hide_loading_overlay({}));
            store.dispatch(fetch_error({
                failureMessage: "Server not avilable, Internal Server error"
            }));
            return error;
        })

}

export default responseInterceptor;