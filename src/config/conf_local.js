import defaultConfig from './default';

const localConfig = {
    ...defaultConfig,

    API_BASE_URL: "https://api.ifnotnowthenwhen.in/api/v1",


    //API_BASE_URL: "http://127.0.0.1:8086/api/v1"
    //aws s3 sync build s3://handle-ui --profile handle-ui-upload

}

export default localConfig