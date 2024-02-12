import serviceHoc, {config} from './serviceHoc';

let hoc = serviceHoc({
    url: config.API_BASE_URL+'/organisation/branch/'
});

export default function BranchService(){
    return {
        getBranches: (headers) => {
            return hoc.get({
                headers
            })
        },
        getCourses: (headers, branchId) => {
            return hoc.get({
                headers,
                url: config.API_BASE_URL+`/organisation/${branchId}/courses/`
            })
        },
        getPlatforms: (headers, branchId) => {
            return hoc.get({
                headers,
                url: config.API_BASE_URL+`/organisation/${branchId}/platform/`
            })
        },
    }
}