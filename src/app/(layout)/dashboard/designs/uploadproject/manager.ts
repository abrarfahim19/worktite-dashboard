import {apiGet, apiRoutes} from "@/config/common";

export async function getCategory(searchString: string) {
    const data  = await apiGet(apiRoutes.PROTECTED.PROJECTS.CATEGORY.LIST({limit:5, title:searchString}))
    console.log(data);
    return data?.data?.results
}