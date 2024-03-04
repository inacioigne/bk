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

    // defaultValue: any;
}

export default function BfTextfieldThesarus(
    {
        property,
        control,
        field,
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
        name: `${property}`
    });

    return (
        <>
            <TextField
                fullWidth
                required={field.required}
                size="small"
                disabled={true}
                id="outlined-basic"
                label={`${field.label}`}
                variant="outlined"
                inputProps={{
                    style: { opacity: 0 },
                }}
                {...register(`${property}.${index}.${field.name}`)}
                InputProps={
                    watchFields[index]?.uri === "" ? {
                        endAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    setThesaurus({ name: field.thesarus, open: true })
                                    setNameField(`${property}.${index}`)
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
                                    setThesaurus({ name: field.thesarus, open: true })
                                    setNameField(`${property}.${index}`)
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