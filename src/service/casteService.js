import serviceHoc, {config} from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0 ;

let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/organisation/${id}/caste/`
});

export default function CasteService(){
    return {
        getCastes: () => {
            return hoc.get({
            })
        },
        updateCaste: (caste) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/caste/${caste.id}/`,
                body: JSON.stringify(caste),
                method: 'PATCH'
            })
        },
        deleteCaste: (casteId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/caste/${casteId}/`,
                method: 'DELETE'
            })
        },
        createCaste: (caste) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/caste/`,
                body: JSON.stringify(caste),
                method: 'POST'
            })
        }
    }
}