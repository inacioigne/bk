import {
    Box, TextField, InputAdornment, Chip, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, Typography,
    Grid,
    IconButton
} from "@mui/material";

interface Props {
    subfield: any;
    register: Function
}

export default function BfTextField(
    { subfield, register }: Props
) {

    return (
        <TextField
            disabled={subfield.disabled}
            fullWidth
            // multiline={f.multiline}
            rows={4}
            // required={f.required}
            size="small"
            label={`${subfield.label}`}
            variant="outlined"
            {...register(`adminMetadata.${subfield.name}`)}
        />
    )

}