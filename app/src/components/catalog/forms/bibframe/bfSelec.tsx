import {
    Box, TextField, InputAdornment, Chip, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, Typography,
    Grid,
    IconButton
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useFieldArray, useWatch, Controller } from "react-hook-form";

// import bibframe from "@/share/bibframe/work.json"

import { ChangeEvent, useEffect } from "react";

interface Props {
    subfield: any;
    setValue: Function;
    index: number | boolean;
    control: any;
    nameField: string;
    commonType: any;
    // nestIndex: number|null;
}

export default function BfSelect(
    { subfield, setValue, index, control, nameField, commonType }: Props
) {
    const handleChangeSelect = (event: ChangeEvent<HTMLInputElement>, obj: any) => {
        const { field } = obj
        field.onChange(event)

        const commonType = obj.commonType
        const label = commonType.find((option: any) => option.value === event.target.value)?.label;

        let i = event.target.name.split(".")[1]

        // if (nameField == 'contribution') {
        //     setValue(`${nameField}.${index}.role.label`, label)
        // } else {
        //     console.log(`${nameField}.${index}.${subfield.name}.label`)
        //     setValue(`${nameField}.${index}.${subfield.name}.label`, label)
        // }
        setValue(`${nameField}.${index}.${subfield.name}.label`, label)
    };


    return (
        <Controller
            name={index === false ? `${nameField}.${subfield.name}.value` : `${nameField}.${index}.${subfield.name}.value`}
            control={control}
            render={({ field }) => (
                <FormControl fullWidth size="small">
                    <InputLabel id="label">{subfield.label}</InputLabel>
                    <Select
                        id="role"
                        disabled={subfield.disabled}
                        label={subfield.label}
                        {...field}
                        onChange={(event) => handleChangeSelect(event, { field: field, commonType: commonType })}
                    >

                        {commonType.map((e: any, index: number) =>
                        (<MenuItem
                            key={e.value}
                            value={e.value}

                        >{e.label}</MenuItem>)
                        )}
                    </Select>
                </FormControl>
            )}
        />
    )


}