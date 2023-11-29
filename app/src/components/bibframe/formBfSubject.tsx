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


// Share
// import relators from "@/share/relators.json" assert { type: "json" };

interface Props {
    register: any
    error: any
    control: any
    setOpen: Function;
    setField: Function;
    setValue: Function

}

export default function FormBfSubject({ register, control, error, setOpen, setField, setValue }: Props) {
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "subject",
    });
    const addField = () => {
        append({
            label: "",
            lang: "por",
            uri: "",
            type: "Topic"
        });
    };
    const watchFields = useWatch({
        control,
        name: "subject"
    });

    // useEffect(() => {
    //     console.log("W", watchFields)

    // }, [watchFields])

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: "1px solid gray" }}
            >
                <Typography variant="subtitle1" >
                    Assuntos
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
                            <Controller
                                name={`subject.${index}.type`}
                                control={control}
                                defaultValue={"Topic"}
                                render={({ field }) => (
                                    <FormControl
                                    sx={{ width: 300}}
                                    >
                                        <InputLabel id="label">Tipo de Assunto</InputLabel>
                                        <Select
                                            id="role"
                                            size="small"
                                            label="Tipo de Assunto"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                // let value = e.target.value
                                                // let index = e.target.name.split(".")[1]                                            
                                                // const label = relators.find((option) => option.uri === value)?.label;
                                                // setValue(`contribution.${index}.roleLabel`, label)
                                                // console.log(index, value)
                                            }}
                                        >
                                            <MenuItem value={"Topic"}>Topic</MenuItem>
                                            {/* {relators.map((type, index) =>
                                            (<MenuItem
                                                key={index}
                                                value={type.uri}                                    
                                            >{type.label}</MenuItem>)
                                            )} */}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <TextField
                                fullWidth
                                disabled={true}
                                variant="outlined"
                                label="Assunto"
                                size="small"
                                {...register(`subject.${index}.label`)}
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
                                                    setField(`subject.${index}`)
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
                                                    // console.log("abrir")
                                                    setOpen(true)
                                                }}
                                            >
                                                <FcSearch />
                                            </InputAdornment>
                                        ),
                                    }}
                            />
                             <Controller
                                name={`subject.${index}.lang`}
                                control={control}
                                defaultValue={"por"}
                                render={({ field }) => (
                                    <FormControl
                                        // fullWidth
                                        sx={{ width: 200}}
                                    >
                                        <InputLabel id="label">Idioma</InputLabel>
                                        <Select
                                            // id="role"
                                            size="small"
                                            label="Idioma"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                // let value = e.target.value
                                                // let index = e.target.name.split(".")[1]                                            
                                                // const label = relators.find((option) => option.uri === value)?.label;
                                                // setValue(`contribution.${index}.roleLabel`, label)
                                                // console.log(index, value)
                                            }}
                                        >
                                            <MenuItem value={"por"}>Português</MenuItem>
                                            <MenuItem value={"en"}>Inglês</MenuItem>
                                           
                                        </Select>
                                    </FormControl>
                                )}
                            />

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
                        </Box>
                    </Fragment>
                ))}
            </AccordionDetails>
        </Accordion>

    )
}