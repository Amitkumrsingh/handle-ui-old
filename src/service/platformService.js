import serviceHoc, {config} from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0 ;

let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/organisation/${id}/platform/`
});

export default function PlatformService(){
    return {
        getPlatforms: () => {
            return hoc.get({
            })
        },
        updatePlatform: (platform) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/platform/${platform.id}/`,
                body: JSON.stringify(platform),
                method: 'PATCH'
            })
        },
        deletePlatform: (platformId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/platform/${platformId}/`,
                method: 'DELETE'
            })
        },
        createPlatform: (platform) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/platform/`,
                body: JSON.stringify(platform),
                method: 'POST'
            })
        }
    }
}