// MUI
import { Grid, TextField, Typography, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    control: any;
    register: any,
    error: any

}

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment, useState } from "react";
// React Hooks
// import { useState, FormEvent, ChangeEvent, ReactNode } from "react";

import { Controller } from "react-hook-form"

export default function FormElementList({ control, register, error }: Props) {

    // console.log("e: ", register)
    // const [type, setType] = useState("FullNameElement");

    const {
        fields: fieldsElementList,
        append: appendElementList,
        remove: removeElementList,
    } = useFieldArray({
        control,
        name: "elementList",
    });

    // const handleChangeType = (event: SelectChangeEvent) => {
    //     const target = event.target as HTMLButtonElement;
    //     setType(target.value);

    // };

    return (
        <>
            {fieldsElementList.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={2}>
                        <Controller
                            name={`elementList.${index}.type`}
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="label">Tipo da Entrada</InputLabel>
                                    <Select
                                        size="small"
                                        label="Tipo da Entrada"
                                        {...field} >
                                        <MenuItem value="FullNameElement">FullNameElement</MenuItem>
                                        <MenuItem value="TopicElement">TopicElement</MenuItem>
                                        <MenuItem value="GeographicElement">GeographicElement</MenuItem>
                                        <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                                        <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                       
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Nome"
                            variant="outlined"
                            size="small"
                            {...register(`elementList.${index}.elementValue.value`)}
                        />
                         {error && (
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                color={"red"}
                            >
                                {error[index].elementValue.value.message}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            fullWidth
                            label="Idioma"
                            variant="outlined"
                            size="small"
                            {...register(`elementList.${index}.elementValue.lang`)}
                        />
                    </Grid>
                </Fragment>
            ))}
        </>
    )

}