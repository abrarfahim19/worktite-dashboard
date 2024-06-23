import { INVOICE_FILE_TYPE } from "@/config/common";
import { apiDelete, apiPost } from "@/config/common/api";
import { apiRoutes } from "@/config/common/apiRoutes";
import { toast } from "sonner";

export function addMessage(chatId: string | number, payload: any) {
  try {
    return apiPost(
      apiRoutes.PROTECTED.GENERAL.CHAT.MESSAGES.POST(chatId),
      payload,
    );
  } catch (e) {
    toast.error("something went wrong");
  }
}

interface IPostFilePayload {
  file_type: INVOICE_FILE_TYPE;
  formData: FormData;
}

export const uploadDocuments = async (data: IPostFilePayload) => {
  try {
    const response = await apiPost(
      apiRoutes.FILES.DOCUMENTS.POST,
      data.formData,
      {
        headers: {
          "Content-Type": "application/pdf",
        },
      },
    );
    console.log("File uploaded successfully:", response?.data);
    console.log("File ID: ", response.data?.id);
    toast.success("File uploaded successfully", {
      position: "top-right",
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Something went Wrong", {
      position: "top-right",
    });
  }
};

export const documentDelete = async (id: number | string) => {
  try {
    const response = await apiDelete(apiRoutes.FILES.DOCUMENTS.DELETE(id));
    toast.success("File deleted successfully", {
      position: "top-right",
    });
    return response;
  } catch (error) {
    console.error("Error deleting file:", error);
    toast.error("Something went Wrong", {
      position: "top-right",
    });
  }
};

export const createProject = async (payload: any) => {
  try {
    const response = await apiPost(
      apiRoutes.PROTECTED.PROJECTS.CREATE,
      payload,
    );
    toast.success("Project created successfully", {
      position: "top-right",
    });
    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    toast.error("Something went Wrong", {
      position: "top-right",
    });
  }
};
