// MUI
import {
    Box,
    Grid,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

// React-Hook-Form
import { useFieldArray, useWatch } from "react-hook-form";
import { Controller } from "react-hook-form"

// React
import { Fragment } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { TiLockClosedOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";


interface Props {
    control: any;
    register: any;
    // setOpen: Function;
    setField: Function
}

export default function FormBfLanguage({ control, register, setField }: Props) {
    // console.log("C",control, "R", register, "SET", setField)
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "language",
    });
    const addField = () => {
        append({
            uri: "",
            label: "",
            lang: "",
            type: ""
        });
    };

    const watchFields = useWatch({
        control,
        name: "language"
    });

    return (
        <>
            {fields.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={4}>
                        <Controller
                            name={`language.${index}.label`}
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    fullWidth
                                >
                                    <InputLabel id="label">Idioma</InputLabel>
                                    <Select
                                        size="small"
                                        label="Idioma"
                                        {...field} >
                                        <MenuItem value="por">Português</MenuItem>
                                        <MenuItem value="eng">Inglês</MenuItem>
                                        <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                                        <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
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
        </>




    )
}