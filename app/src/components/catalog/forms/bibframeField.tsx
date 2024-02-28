"use client"
import {
    Box, TextField, InputAdornment, Chip, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, Typography,
    Grid
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useEffect } from "react";
import { useFieldArray, useWatch, Controller } from "react-hook-form";
// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
import { FcLock } from "react-icons/fc";
// import { Controller } from "react-hook-form"

import relators from "@/share/relators.json" assert { type: "json" };
import bibframe from "@/share/bibframe/work.json"

interface Props {
    metadado: any;
    control: any;
    register: any;
    setThesaurus: Function;
    setField: Function;
    setValue: Function;
    defaultValue: any;
}

export default function BibframeField({ metadado, control, register, setThesaurus, setField, setValue, defaultValue }) {

    console.log("FP", metadado.fields)
    const commonType = bibframe.commonType
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: `${metadado.property}`,
    });

    const watchFields = useWatch({
        control,
        name: `${metadado.property}`
    });

    const addField = () => {
        console.log(defaultValue)
        let [df] = defaultValue
        append(df);
    };

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: "1px solid gray" }}
            >
                <Typography variant="subtitle1" >
                    {metadado.label}
                </Typography>
            </AccordionSummary>
            <Box sx={{ p: 3 }}>
                {fields.map((_, index) => (
                    <Grid key={index} container spacing={2}>
                        {metadado.fields.map((f, i) => (
                            <Grid item key={i} xs={f.width}>
                                {f.thesarus ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        disabled={true}
                                        id="outlined-basic"
                                        label={`${f.label}`}
                                        variant="outlined"
                                        inputProps={{
                                            style: { opacity: 0 },
                                        }}
                                        {...register(`${metadado.property}.${index}.${f.name}`)}
                                        InputProps={
                                            watchFields[index]?.uri === "" ? {
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        sx={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            setThesaurus({ name: f.thesarus, open: true })
                                                            setField(`${metadado.property}.${index}`)
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
                                                            setThesaurus({ name: metadado.thesarus, open: true })
                                                            setField(`${metadado.property}.${index}`)
                                                        }}
                                                    >
                                                        <FcSearch />
                                                    </InputAdornment>
                                                ),
                                            }}
                                    />
                                ) : (
                                    f.type === 'textField' ? <TextField
                                        fullWidth
                                        size="small"
                                        label={`${f.label}`}
                                        variant="outlined"
                                        {...register(`${metadado.property}.${index}.${f.name}`)}
                                    /> : <Controller
                                        name={`${metadado.property}.${index}.${f.name}`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth
                                            // sx={{ width: f.width }}
                                            >
                                                <InputLabel id="label">{f.label}</InputLabel>
                                                <Select
                                                    id="role"
                                                    size="small"
                                                    label={f.label}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        let value = e.target.value
                                                        let index = e.target.name.split(".")[1]
                                                        const label = relators.find((option) => option.uri === value)?.label;
                                                        setValue(`${metadado.property}.${index}.${f.name}Label`, label)
                                                    }}
                                                >
                                                    {commonType[`${f.commonType}`].map((type, index) =>
                                                    (<MenuItem
                                                        key={index}
                                                        value={type.uri}
                                                    >{type.label}</MenuItem>)
                                                    )}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />


                                )}

                            </Grid >

                        ))
                        }
                        {metadado.repeatable && <Grid item sx={{ mt: 0, mb: 2 }}>
                            <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={addField} >Adicionar</Button>
                            {index > 0 && <Button variant="outlined" size="small" sx={{ mt: 1, ml: 1 }}
                                onClick={() => {
                                    remove(index);
                                }} >Excluir</Button>}
                        </Grid>
                        }


                    </Grid>
                ))}
            </Box>

        </Accordion>
    )
}