import { apiPost, apiRoutes } from "@/config/common";
import { toast } from "sonner";

export const uploadNewProject = async (payload: any) => {
  try {
    const response = await apiPost(
      apiRoutes.PROTECTED.PUBLISH_PROJECT.POST,
      payload,
    );
    console.log("Upload Project Response: ", response.data);
    toast.success("Project uploaded successfully", {
      position: "top-right",
    });
  } catch (error) {
    console.log("Error while uploading a new project", error);
    toast.error("Error while uploading a new project", {
      position: "top-right",
    });
  }
};
