import {apiDelete, apiGet, apiPost, apiPut} from "@/config/common/api";
import {apiRoutes} from "@/config/common/apiRoutes";
import {toast} from "sonner";

export function addMessage(chatId: string | number, payload: any) {
    try {
        return apiPost(apiRoutes.PROTECTED.GENERAL.CHAT.MESSAGES.POST(chatId), payload)
    } catch (e) {
        toast.error('something went wrong')
    }
}
