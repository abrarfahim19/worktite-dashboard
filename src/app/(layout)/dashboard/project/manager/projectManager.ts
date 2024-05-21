import { INVOICE_FILE_TYPE } from "@/config/common";
import { apiDelete, apiPost, apiPut } from "@/config/common/api";
import { apiRoutes } from "@/config/common/apiRoutes";
import { toast } from "sonner";

export function addClientStatus(projectId: string | number, payload: any) {
  try {
    return apiPost(
      apiRoutes.PROTECTED.PROJECTS.CLIENT_STATUS.CREATE(projectId),
      payload,
    );
  } catch (e) {
    console.log(e);
  }
}

export function updateClientStatus(
  projectId: string | number,
  id: string | number,
  payload: any,
) {
  try {
    return apiPut(
      apiRoutes.PROTECTED.PROJECTS.CLIENT_STATUS.UPDATE(projectId, id),
      payload,
    );
  } catch (e) {
    console.log(e);
  }
}

export function deleteClientStatus(
  projectId: string | number,
  id: string | number,
) {
  try {
    return apiDelete(
      apiRoutes.PROTECTED.PROJECTS.CLIENT_STATUS.DELETE(projectId, id),
    );
  } catch (e) {
    console.log(e);
  }
}

interface IWorkHistoryPostPayload {
  started_at: string;
  ended_at: string;
}
export const postWorkHistory = async (
  projectId: string | number,
  payload: IWorkHistoryPostPayload,
) => {
  try {
    const response = await apiPost(
      apiRoutes.PROTECTED.PROJECTS.WORK_HISTORY.POST(projectId),
      payload,
    );
    toast.success("Time uploaded successfully", {
      position: "top-right",
    });
    // console.log("time uploaded successfully:", response.data);
  } catch (error) {
    toast.error("Something went Wrong", {
      position: "top-right",
    });
    console.error("Error uploading time:", error);
  }
};

interface IPostFilePayload {
  id: string | number;
  file_type: INVOICE_FILE_TYPE;
  formData: FormData;
}

export const postInvoice = async (data: IPostFilePayload) => {
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
    try {
      const invoiceresponse = await apiPost(
        apiRoutes.PROTECTED.PROJECTS.INVOICE.POST(data.id),
        {
          file_type: data.file_type,
          file: response.id,
        },
      );
      console.log("Invoice uploaded successfully:", invoiceresponse);
      toast.success("Invoice uploaded successfully", {
        position: "top-right",
      });
    } catch (er) {
      console.error("Error uploading file:", er);
      toast.error("Something went Wrong", {
        position: "top-right",
      });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
