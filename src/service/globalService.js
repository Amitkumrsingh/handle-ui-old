import serviceHoc, {config} from './serviceHoc';

let hoc = serviceHoc({
    url: config.API_BASE_URL+'/enquiry/'
});

export default function GlobalService(){
    return {
        getCities: (headers) => {
            return hoc.get({
                headers,
                url: `${config.API_BASE_URL}/location/cities/`
            })
        },
        getCourses: (branchId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/`,
            })
        },
        getPlatforms: (branchId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/`,
            })
        }
    }
}