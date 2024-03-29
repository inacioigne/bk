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

import { IoPersonAddSharp } from "react-icons/io5";

// React
import { Fragment, useEffect } from "react";

import { Controller } from "react-hook-form"


// Share
import relators from "@/share/relators.json" assert { type: "json" };

interface Props {
    register: any
    error: any
    control: any
    setOpen: Function;
    setField: Function;
    setValue: Function

}

export default function FormBfContribution({ register, control, error, setOpen, setField, setValue }: Props) {
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "contribution",
    });
    const addContribution = () => {
        append({
            agent: "",
            label: "",
            role: "http://id.loc.gov/vocabulary/relators/aut",
            roleLabel: "Autor"
        });
    };
    const watchFields = useWatch({
        control,
        name: "contribution"
    });

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: "1px solid gray" }}
            >
                <Typography variant="subtitle1" >
                    Autoria
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                p: "20px"
            }}>
                {fields.map((field, index) => (
                    <Fragment key={index} >
                        <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
                            <TextField
                                fullWidth
                                disabled={true}
                                variant="outlined"
                                label="Nome"
                                size="small"
                                {...register(`contribution.${index}.label`)}
                                inputProps={{
                                    style: { opacity: 0 },

                                }}
                                InputProps={
                                    watchFields[index]?.agent === "" ? {
                                        endAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setOpen(true)
                                                    setField(`contribution.${index}`)
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
                                                    color="info"
                                                    avatar={<FcLock />}
                                                />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    console.log("abrir")
                                                    setOpen(true)
                                                    // setField(`hasNarrowerAuthority.${index}`)
                                                }}
                                            >
                                                <FcSearch />
                                            </InputAdornment>
                                        ),
                                    }}
                            />
                            <Controller
                                name={`contribution.${index}.role`}
                                control={control}
                                defaultValue={"http://id.loc.gov/vocabulary/contentTypes/txt"}
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                    >
                                        <InputLabel id="label">Responsabilidade</InputLabel>
                                        <Select
                                            id="role"
                                            size="small"
                                            label="Responsabilidade"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                let value = e.target.value
                                                let index = e.target.name.split(".")[1]
                                                const label = relators.find((option) => option.uri === value)?.label;
                                                setValue(`contribution.${index}.roleLabel`, label)
                                            }}
                                        >
                                            {relators.map((type, index) =>
                                            (<MenuItem
                                                key={index}
                                                value={type.uri}
                                            >{type.label}</MenuItem>)
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton
                                    aria-label="add"
                                    onClick={addContribution}
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
                        </Box>
                    </Fragment>
                ))}
            </AccordionDetails>
        </Accordion>

    )
}