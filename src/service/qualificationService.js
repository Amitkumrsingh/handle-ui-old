import serviceHoc, {config} from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0 ;

let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/organisation/${id}/qualification/`
});

export default function QualificationService(){
    return {
        getQualifications: () => {
            return hoc.get({
            })
        },
        updateQualification: (qualification) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/qualification/${qualification.id}/`,
                body: JSON.stringify(qualification),
                method: 'PATCH'
            })
        },
        deleteQualification: (qualificationId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/qualification/${qualificationId}/`,
                method: 'DELETE'
            })
        },
        createQualification: (qualification) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/qualification/`,
                body: JSON.stringify(qualification),
                method: 'POST'
            })
        }
    }
}