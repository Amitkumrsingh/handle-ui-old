import serviceHoc, {config} from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0 ;

let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/organisation/${id}/courses/`
});

export default function CourseService(){
    return {
        getCourses: () => {
            return hoc.get({
            })
        },
        updateCourse: (course) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/courses/${course.id}/`,
                body: JSON.stringify(course),
                method: 'PATCH'
            })
        },
        deleteCourse: (courseId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/courses/${courseId}/`,
                method: 'DELETE'
            })
        },
        createCourse: (course) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/organisation/${id}/courses/`,
                body: JSON.stringify(course),
                method: 'POST'
            })
        }
    }
}