import { apiPut, apiRoutes } from "@/config/common";
import { toast } from "sonner";

interface IClientNote {
  note: string;
}

export const addClientNote = async (
  clientID: number | string,
  payload: IClientNote,
) => {
  try {
    const response = await apiPut(
      apiRoutes.PROTECTED.CLIENTS.CLIENT.PUTNOTE(clientID),
      payload,
    );
    console.log("Respnse is: ", response);
    toast.success("Note added successfully", {
      position: "top-right",
    });
  } catch (error) {
    toast.error("Failed to add note", {
      position: "top-right",
    });
    console.error(error);
  }
};
