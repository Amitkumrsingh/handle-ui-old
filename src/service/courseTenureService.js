import serviceHoc, {config} from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0 ;

let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/organisation/${id}/course_tenure/`
});

export default function CourseTenureService(){
    return {
        getCourseTenures: () => {
            return hoc.get({
            })
        },
        updateCourseTenure: (courseTenure) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/course_tenure/${courseTenure.id}/`,
                body: JSON.stringify(courseTenure),
                method: 'PATCH'
            })
        },
        deleteCourseTenure: (courseTenureId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/course_tenure/${courseTenureId}/`,
                method: 'DELETE'
            })
        },
        createCourseTenure: (courseTenure) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/course_tenure/`,
                body: JSON.stringify(courseTenure),
                method: 'POST'
            })
        }
    }
}