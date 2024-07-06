import {SelectField} from "@/app/(layout)/dashboard/designs/uploadproject/components/SelectField";
import {useFormContext} from "react-hook-form";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import {apiGet, apiRoutes} from "@/config/common";
import React, {useState} from "react";

const CategoryField = () => {
    const form = useFormContext()
    const [searchString, setSearchString] = useState("");
    const {data: categories} = useAxiosSWR(apiRoutes.PROTECTED.PROJECTS.CATEGORY.LIST({
        limit: 5,
        title: searchString
    }))
    const options = React.useCallback((s: string) => {
        setSearchString(s)
        return categories.map(category => {
            return {label: category.title, value: category.id}
        })
    }, [categories])

    async function loadOptions(value: string) {
        console.log("\n\n\n\n", value)
        const searchParams = value.length !== 0 ? {title: value} : null
        const data = await apiGet(
            apiRoutes.PROTECTED.PROJECTS.CATEGORY.LIST({limit: 5, ...searchParams})
        )
            .then((response) => response?.data?.results)
            .then((final) =>
                final.filter((i: any) =>
                    i.title.toLowerCase().includes(value.toLowerCase())
                )
            );
        console.log('cat data', data);
        return data?.map((d: any) => {
            return {label: d.title, value: d?.id};
        });
    }

    return <SelectField loadOptions={loadOptions} isSearchable={true} defaultValue={options}
                        label="Category" control={form.control}
                        name='category'/>
}

export default CategoryField;