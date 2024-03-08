import {
    Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    TextField, InputAdornment, Chip, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, Typography,
    Grid,
    IconButton,
    Divider
} from "@mui/material";
import { useState } from "react";
import BfTextField from "./bfTextField";

interface Props {
    field: any;
    register: Function
}

export default function BfModal(
    { field, register }: Props
) {
    console.log("fm:", field)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen}>{field.label}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {field.label}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    { field.subfields.map((subfield: any, index: number) => (
                        <BfTextField 
                        key={index}
                        field={subfield}
                        register={register}
                        />

                    ))}
      
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}