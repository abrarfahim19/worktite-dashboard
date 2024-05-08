import {apiDelete, apiGet, apiPost, apiPut} from "@/config/common/api";
import {apiRoutes} from "@/config/common/apiRoutes";

export function addClientStatus(projectId: string | number, payload: any) {
    try {
        return apiPost(apiRoutes.PROTECTED.PROJECT.CLIENT_STATUS.CREATE(projectId), payload)
    } catch (e) {
        console.log(e)
    }
}

export function updateClientStatus(projectId: string | number, id: string | number, payload: any) {
    try {
        return apiPut(apiRoutes.PROTECTED.PROJECT.CLIENT_STATUS.UPDATE(projectId, id), payload)
    } catch (e) {
        console.log(e)
    }
}
export function deleteClientStatus(projectId: string | number, id: string | number) {
    try {
        return apiDelete(apiRoutes.PROTECTED.PROJECT.CLIENT_STATUS.DELETE(projectId, id))
    } catch (e) {
        console.log(e)
    }
}