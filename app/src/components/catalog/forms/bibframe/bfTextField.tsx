import {
    Box, TextField, InputAdornment, Chip, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, Typography,
    Grid,
    IconButton
} from "@mui/material";

interface Props {
    field: any;
    register: Function
}

export default function BfTextField(
    { field, register }: Props
) {

    return (
        <TextField
            fullWidth
            // multiline={f.multiline}
            rows={4}
            // required={f.required}
            size="small"
            label={`${field.label}`}
            variant="outlined"
            {...register(`adminMetadata.${field.name}`)}
        />
    )

}