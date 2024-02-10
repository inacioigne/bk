import { Box, TextField } from "@mui/material";
import { useFieldArray, useWatch, useForm } from "react-hook-form";

interface Props {
    field: any;
    control: any;
    register: any
}

export default function Field({ field, control, register }) {
    // console.log(field)
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: `${field._class}`,
        
    });
    return (
        <Box>
            {fields.map((_, index) => (
                <TextField key={index}
                    id="outlined-basic"
                    label={field.label}
                    variant="outlined"
                    {...register(`${field._class}.${index}.label`)}
                />
            ))}

        </Box>
    )
}