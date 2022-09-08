import { instance } from "../../api/instanceApi";
import {INewPhoto, IProfile, IResponse, IUpdateProfile} from '../../api';

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<IProfile>(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put<IResponse>(`profile/status`, {status: status});
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append('image', photo);

        return instance.put<IResponse<{ photos: INewPhoto }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    updateProfile(profile: IUpdateProfile) {
        return instance.put<IResponse>(`/profile`, profile);
    },
};