// MUI
import {
    TextField, Grid, Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Box,
    IconButton,
    InputAdornment,
    Chip,
    Avatar,
    FormControl,
    InputLabel,
    MenuItem
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

// React-Hook-Form
import { useFieldArray, useWatch } from "react-hook-form";
// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
import { FcLock } from "react-icons/fc";
// import { IoPersonAddSharp } from "react-icons/io5";

// React
import { Fragment, useEffect } from "react";

import { Controller } from "react-hook-form"

interface Props {
    register: any
    error: any
    control: any
    setOpen: Function;
    setField: Function;
    setValue: Function

}

export default function FormBfPublication({ register, control, error, setOpen, setField, setValue }: Props) {


    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: "1px solid gray" }}
            >
                <Typography variant="subtitle1" >
                    Publicação
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                p: "20px"
            }}>
                <Box sx={{ width: "100%", display: "flex", gap: "15px" }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Local"
                        variant="outlined"
                        {...register("publication.place")} />
                    <TextField
                        fullWidth
                        size="small"
                        label="Editora"
                        variant="outlined"
                        {...register("publication.agent")} />
                    <TextField
                        fullWidth
                        size="small"
                        label="Data de Publicação"
                        variant="outlined"
                        {...register("publication.date")} />
                </Box>


            </AccordionDetails>
        </Accordion>

    )
}