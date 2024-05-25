import {apiPost, apiRoutes} from "@/config/common";

export async function createChat(payload: any) {
    try {
        return await apiPost(apiRoutes.PROTECTED.GENERAL.CHAT.POST, payload)
    } catch (e) {
        console.log("something went wrong")
    }
}