import {
    TextField, InputAdornment, Chip
} from "@mui/material";

// Schema
import { typeMetadata } from "@/schema/fieldMetadata";
import { field } from "@/schema/fieldMetadata";

// React Hook Forms
import { useFieldArray, useWatch, Controller } from "react-hook-form";

// React Icons
import { FcSearch } from "react-icons/fc";
import { FcLock } from "react-icons/fc";

// React
import { useEffect, useState } from "react";

// BiblioKeia Components
import ModalThesarus from "@/components/thesaurus/modal/modalThesarus";

// Share
import bibframe from "@/share/bibframe/work.json"

type Typethesaurus = {
    name: string|undefined;
    open: boolean;
}

interface Props {
    property: string;
    control: any;
    field: field;
    register: any;
    index: number;
    setValue: Function;
    setField: Function;
}

export default function BfTextfieldThesarus(
    {
        name,
        control,
        subfield,
        register,
        index,
        setValue,
        setField,

    }: Props
) {
    const [thesaurus, setThesaurus] = useState<Typethesaurus>({name:"", open: false});
    const [nameField, setNameField] = useState("");

    const watchFields = useWatch({
        control,
        name: `${name}`
    });

    // console.log("SUB: ", watchFields)    

    return (
        <>
            <TextField
                fullWidth
                required={subfield.required}
                size="small"
                disabled={true}
                id="outlined-basic"
                label={`${subfield.label}`}
                variant="outlined"
                inputProps={{
                    style: { opacity: 0 },
                }}
                {...register(`${name}.${index}.${subfield.name}.value`)}
                InputProps={
                    watchFields[index]?.term.value === "" ? {
                        endAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    setThesaurus({ name: subfield.thesarus, open: true })
                                    setNameField(`${name}.${index}`)
                                }}
                            >
                                <FcSearch />
                            </InputAdornment>
                        ),
                    } : {
                        startAdornment: (
                            <InputAdornment
                                position="start" >
                                <Chip label={watchFields[index]?.term.label} size="small"
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
                                    setThesaurus({ name: subfield.thesarus, open: true })
                                    setNameField(`${name}.${index}`)
                                }}
                            >
                                <FcSearch />
                            </InputAdornment>
                        ),
                    }}
            />
            <ModalThesarus
                setOpen={setThesaurus}
                thesaurus={thesaurus}
                defaultValues={bibframe.defaultValues}
                nameField={nameField}
                setValue={setValue} />
        </>

    )
}