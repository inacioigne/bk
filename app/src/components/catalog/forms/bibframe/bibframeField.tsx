"use client"
import {
    Box, TextField, InputAdornment, Chip, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, Typography,
    Grid,
    IconButton
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from "react";
import { useFieldArray, useWatch, Controller } from "react-hook-form";
// React Icons
import { FaTrashCan } from "react-icons/fa6";
// import { IoRemove, IoAddOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
import { FcLock } from "react-icons/fc";

import bibframe from "@/share/bibframe/work.json"
import { typeMetadata } from "@/schema/fieldMetadata";
import BfTextfieldThesarus from "./bfTextfieldThesarus";

interface Props {
    metadado: typeMetadata;
    control: any;
    register: any;
    setThesaurus: Function;
    setField: Function;
    setValue: Function;
    defaultValue: any;
}

export default function BibframeField({ metadado, control, register, setThesaurus, setField, setValue, defaultValue }: Props) {

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

    // console.log("BF", metadado.fields)
    const handleChangeSelect = (event: ChangeEvent<HTMLInputElement>, obj) => {
        const f = obj.f
        f.onChange(event)
        const commonType = obj.commonType
        const field = obj.field
        const label = commonType.find((option) => option.uri === event.target.value)?.label;
        let index = event.target.name.split(".")[1]
        setValue(`${metadado.property}.${index}.${field.name}Label`, label)

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
            <Box sx={{
                p: 3,
                display: "flex", flexDirection: "column", gap: 2
            }}>
                {fields.map((_, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 2, }}>
                        <Grid container spacing={2}>
                            {metadado.fields.map((f, i) => (
                                <Grid item key={i} xs={f.width}>
                                    {f.thesarus ? (
                                        <BfTextfieldThesarus
                                            property={metadado.property}
                                            control={control}
                                            register={register}
                                            field={f}
                                            index={index}
                                            setValue={setValue}
                                            setField={setField}
                                        />
                                    ) : (
                                        f.type === 'textField' ?
                                            <TextField
                                                fullWidth
                                                required={f.required}
                                                size="small"
                                                label={`${f.label}`}
                                                variant="outlined"
                                                {...register(`${metadado.property}.${index}.${f.name}`)}
                                            /> :
                                            <Controller
                                                name={`${metadado.property}.${index}.${f.name}`}
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl fullWidth size="small" required={f.required}>
                                                        <InputLabel id="label">{f.label}</InputLabel>
                                                        <Select
                                                            id="role"
                                                            label={f.label}
                                                            {...field}
                                                            onChange={(event) => handleChangeSelect(event, {
                                                                commonType: commonType[`${f.commonType}`], field: f, f: field
                                                            })}
                                                        >
                                                            {commonType[`${f.commonType}`].map((type, index) =>
                                                            (<MenuItem
                                                                key={type.label}
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
                        </Grid>
                        {fields.length > 1 && 
                        <IconButton onClick={() => {
                            remove(index);
                        }}> <FaTrashCan /></IconButton>}
                    </Box>
                ))}
                <Box>
                    {metadado.repeatable &&
                        <Button variant="outlined" sx={{ textTransform: "none" }} onClick={addField} >Adicionar</Button>
                    }

                </Box>

            </Box>
        </Accordion>
    )
}