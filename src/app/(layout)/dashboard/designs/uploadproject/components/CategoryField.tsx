import {SelectField} from "@/app/(layout)/dashboard/designs/uploadproject/components/SelectField";
import {useFormContext} from "react-hook-form";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import {apiRoutes} from "@/config/common";
import React from "react";

const CategoryField = () => {
    const form = useFormContext()
    const {data: categories} = useAxiosSWR(apiRoutes.PROTECTED.PROJECTS.CATEGORY.LIST({limit: 5}))
    const options = React.useMemo(() => {
        return categories.map(category => {
            return {label: category.title, value: category.id}
        })
    }, [categories])
    return <SelectField options={options} label="Category" control={form.control}
                        name='category'/>
}

export default CategoryField;