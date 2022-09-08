import {instance} from '../../api/instanceApi';

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`);
    },
};