"use client";
// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
    // DialogContent,
    // DialogTitle,
    // Dialog,
    InputAdornment,
    // DialogContentText,
    // DialogActions,
    // Button,
    Chip
} from "@mui/material";

// React-Hook-Form
import { useFieldArray, useWatch } from "react-hook-form";

// React
import { Fragment } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { TiLockClosedOutline } from "react-icons/ti";

// import SearchSubjects from "@/components/thesaurus/modal/modalSubjects"

interface Props {
    control: any;
    register: any
    setOpen: Function
    // setValue: any
    setField: Function
}

export default function FormHRA({ control, register, setOpen, setField }: Props) {

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "hasReciprocalAuthority",
    });
    const addField = () => {
        append({
            uri: "",
            label: "",
            base: ""
        });
    };

    const watchFields = useWatch({
        control,
        name: "hasReciprocalAuthority"
    });


    return (
        <>
            {fields.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            disabled={true}
                            variant="standard"
                            label="Termo relacionado"
                            size="small"
                            {...register(`hasReciprocalAuthority.${index}.label`)}
                            inputProps={{
                                style: { opacity: 0 },

                            }}
                            InputProps={
                                watchFields[index]?.label === "" ? {
                                    endAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setOpen(true)
                                                setField(`hasReciprocalAuthority.${index}`)
                                            }}
                                        >
                                            <FcSearch />
                                        </InputAdornment>
                                    ),
                                } : {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start" >
                                            <Chip label={watchFields[index]?.label} size="small"
                                                color="info" avatar={<TiLockClosedOutline />} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setOpen(true)
                                                setField(`hasReciprocalAuthority.${index}`)
                                            }}
                                        >
                                            <FcSearch />
                                        </InputAdornment>
                                    ),
                                }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                aria-label="add"
                                onClick={addField}
                                color="primary"
                            >
                                <IoAddOutline />
                            </IconButton>
                            <IconButton
                                aria-label="add"
                                onClick={() => {
                                    remove(index);
                                }}
                                color="primary"
                            >
                                <IoRemove />
                            </IconButton>
                        </Box>
                    </Grid>
                </Fragment>
            ))}
            {/* <SearchSubjects setOpen={setOpen} open={open} /> */}
        </>
    )
}