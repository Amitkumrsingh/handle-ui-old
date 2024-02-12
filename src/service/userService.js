import serviceHoc, { config } from './serviceHoc';

let hoc = serviceHoc({
    url: config.API_BASE_URL + '/users/'
});

export default function userService() {
    return {
        login: (username, password) => {
            return hoc.update({
                body: JSON.stringify({
                    email: username,
                    password
                }),
                url: config.API_BASE_URL + '/users/login/',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        },
        logout: (token) => {
            return hoc.delete({
                url: config.API_BASE_URL + '/users/logout/',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + token
                }
            })
        }
    }
}