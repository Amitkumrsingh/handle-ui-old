import serviceHoc, { config } from './serviceHoc';
import store from "../redux/store";
let hoc = serviceHoc({
    url: `${config.API_BASE_URL}/notifications/new/`
});

export default function NotificationServcie() {

    return {
        getNewNotification:() => {
            return hoc.get({
                
            })
        }
    }

}