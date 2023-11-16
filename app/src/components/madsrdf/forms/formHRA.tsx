"use client";
// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
    DialogContent,
    DialogTitle,
    Dialog,
    InputAdornment,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment, useState } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";

import SearchSubjects from "@/components/thesaurus/modal/modalSubjects"

interface Props {
    control: any;
    register: any
    setOpen: Function
    setValue: any
    setField: Function
}

export default function FormHRA({ control, register, setOpen, setValue, setField }: Props) {
    
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

    return (
        <>
            {fields.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            // disabled={true}
                            // focused={true}
                            // hiddenLabel={true}
                            variant="standard"
                            // autoFocus={true}
                            label="Termo relacionado"
                            size="small"
                            {...register(`hasReciprocalAuthority.${index}.label`)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment 
                                    position="start" 
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setOpen(true)
                                        // setValue(`hasReciprocalAuthority.${index}.label`, "TESTE")
                                        setField(`hasReciprocalAuthority.${index}`)
                                    }}
                                    >
                                        <FcSearch />
                                    </InputAdornment>
                                ),
                            }}
                            
                        />
                     
                        {/* <TextField
                            fullWidth
                            label="Nome"
                            variant="outlined"
                            size="small"
                            {...register(`hasReciprocalAuthority.${index}.label`)}
                        /> */}
                    </Grid>
                    {/* <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="uri"
                            variant="outlined"
                            size="small"
                            {...register(`hasReciprocalAuthority.${index}.uri`)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="base"
                            variant="outlined"
                            size="small"
                            {...register(`hasReciprocalAuthority.${index}.base`)}
                        />
                    </Grid> */}
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