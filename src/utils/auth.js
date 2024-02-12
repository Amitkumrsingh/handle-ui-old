export const getToken = () => {
    const state = JSON.parse(localStorage.getItem("reduxState"));
    if (state) {
        return state.userReducer.token;
    }
    return "";
}