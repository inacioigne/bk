import {
   TextField
} from "@mui/material";

interface Props {
    subfield: any;
    register: Function;
    nameField: string;
    index: number | boolean;
}

export default function BfTextField(
    { subfield, register, nameField, index }: Props
) {
    return (
        <TextField
            disabled={subfield.disabled}
            fullWidth
            rows={4}
            required={subfield.required}
            size="small"
            label={`${subfield.label}`}
            variant="outlined"
            {...register(index === false ? `${nameField}.${subfield.name}` : `${nameField}.${index}.${subfield.name}`)}
        />
    )

}