import serviceHoc, { config } from './serviceHoc';
import store from "../redux/store";
const { id } = store.getState().branchReducer.selected_branch ? store.getState().branchReducer.selected_branch : 0;

let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/students/?branch=${id}`
});

const paths = ["personal_info", "course_info", "additional_info", "address_info", "fees"];

export default function StudentService() {
    return {
        getStudents: (url) => {
            return hoc.get({
                url
            })
        },
        getStudentDetails: (id, path) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/students/${path}/${id}/`,
                method: 'GET'
            })
        },
        createStudent: (student, step) => {
            const data = {
                ...student,
                branch: id
            }
            return hoc.get({
                url: `${config.API_BASE_URL}/students/${step}/`,
                body: JSON.stringify(data),
                method: 'POST'
            })
        },
        updateStudent: (student, id, step) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/students/${step}/${id}/`,
                body: JSON.stringify(student),
                method: 'PATCH'
            })
        },
        deleteStudent: (studentId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/students/personal_info/${studentId}/`,
                method: 'DELETE'
            })
        },
    }
}