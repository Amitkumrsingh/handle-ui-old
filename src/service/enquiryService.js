import { platform } from 'chart.js';
import serviceHoc, { config } from './serviceHoc';

let hoc = serviceHoc({
    url: config.API_BASE_URL + '/enquiry/'
});

export default function EnquiryService() {
    return {
        getEnquiriesForBranch: (branchId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/?branch=${branchId}`,
                method: 'GET'
            })
        },
        updateEnquiry: (enquiry) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/${enquiry.id}/`,
                body: JSON.stringify(enquiry),
                method: 'PATCH'
            })
        },
        deleteEnquiry: (enquiryId) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/${enquiryId}/`,
                method: 'DELETE'
            })
        },
        createEnquiry: (enquiry) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/`,
                body: JSON.stringify(enquiry),
                method: 'POST'
            })
        },
        getReports: (from_date, to_date) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/reports/?from_date=` + from_date + '&to_date=' + to_date,
                // body: JSON.stringify(enquiry),
                method: 'GET'
            })
        },
        getEnquiriesForStatus: (branchId,status) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/?branch=${branchId}&status=${status}`,
                method: 'GET'
            })
        },
        getEnquiriesForId: (id) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/${id}/`,
                method: 'GET',
            });
        },

        
        getEnquiriesForBroadSearch: (course, start_date, end_date, branchId, status, platform,date__year,date__month,student_id) => {
            return hoc.get({
                url: `${config.API_BASE_URL}/enquiry/?branch=${branchId}&status=${status}&course=${course}&start_date=${start_date}&end_date=${end_date}&platform=${platform}&date__year=${date__year}&date__month=${date__month}&student_id=${student_id}`,
                method: 'GET'
             });
        }
    }
}