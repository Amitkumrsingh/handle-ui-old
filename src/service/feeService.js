import serviceHoc, { config } from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0 ;

let hoc = serviceHoc({
    url: config.API_BASE_URL + '/enquiry/1/'
});

export default function FeeService() {
    return {
        getFees: (url) => {
            return hoc.get({
                url
            })
        },
        updatefee: (fee) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/fees/${fee.id}/`,
                body: JSON.stringify(fee),
                method: 'PATCH'
            })
        },
        deleteFee: (feeId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/fees/${feeId}/`,
                method: 'DELETE'
            })
        },
        createFee: (fee) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/fees/`,
                body: JSON.stringify(fee),
                method: 'POST'
            })
        }
    }
}