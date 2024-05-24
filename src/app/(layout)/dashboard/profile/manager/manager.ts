import { apiPost, apiPut, apiRoutes } from "@/config/common";
import { toast } from "sonner";

export const imageUpload = async (formData: FormData) => {
  try {
    const response = await apiPost(apiRoutes.FILES.IMAGES.POST, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("File uploaded successfully:", response.data);
    toast.success("File uploaded successfully", {
      position: "top-right",
    });
    return response.data.id;
  } catch (error) {
    console.log("response Error, ", error);
    return null;
  }
};

export const putProfileData = async (data: any) => {
  try {
    const response = await apiPut(apiRoutes.AUTH.USER_PROFILE_UPDATE, data);
    console.log("Response Data, ", response.data);
    toast.success("Profile updated successfully", {
      position: "top-right",
    });
  } catch (error) {
    console.log("Response Error, ", error);
    toast.error("Error uploading file", {
      position: "top-right",
    });
  }
};
