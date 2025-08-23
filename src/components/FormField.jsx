import React from "react";
import { TextField } from "@mui/material";

function FormField({
    name,
    label,
    type = "text",
    formik,
    select = false,
    options = [],
    ...props
}) {
    const commonProps = {
        margin: "normal",
        fullWidth: true,
        name: name,
        label: label,
        variant: "outlined",
        value: formik.values[name],
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        error: Boolean(formik.touched[name] && formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name],
        ...props,
    };

    if (select) {
        return (
            <TextField
                select
                {...commonProps}
                SelectProps={{
                    native: true,
                 
                }}
            >
                <option value="" disabled>
                     
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
               
            </TextField>
        );
    }

    return <TextField {...commonProps} type={type} />;
}

export default FormField;
