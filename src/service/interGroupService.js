import serviceHoc, {config} from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0 ;

let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/organisation/${id}/inter/`
});

export default function InterGroupService(){
    return {
        getInterGroups: () => {
            return hoc.get({
            })
        },
        updateInterGroup: (interGroup) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/inter/${interGroup.id}/`,
                body: JSON.stringify(interGroup),
                method: 'PATCH'
            })
        },
        deleteInterGroup: (interGroupId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/inter/${interGroupId}/`,
                method: 'DELETE'
            })
        },
        createInterGroup: (interGroup) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/inter/`,
                body: JSON.stringify(interGroup),
                method: 'POST'
            })
        }
    }
}