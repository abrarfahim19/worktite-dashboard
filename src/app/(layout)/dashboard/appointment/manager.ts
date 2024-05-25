import {apiPatch, apiRoutes} from "@/config/common";
import {toast} from "sonner";

export async function changeAppointmentStatus(id: string | number, payload: any) {
    try {
        return await apiPatch(apiRoutes.PROTECTED.GENERAL.APPOINTMENTS.PATHCH(id), payload)
    }catch (e) {
        toast.error("something went wrong")
    }
}
export async function deleteAppointment(id: string | number) {
    try {
        return await apiPatch(apiRoutes.PROTECTED.GENERAL.APPOINTMENTS.DELETE(id))
    }catch (e) {
        toast.error("something went wrong")
    }
}