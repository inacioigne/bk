import {
    Box, TextField, InputAdornment, Chip, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, Typography,
    Grid,
    IconButton
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useFieldArray, useWatch, Controller } from "react-hook-form";

import bibframe from "@/share/bibframe/work.json"

import { ChangeEvent } from "react";

interface Props {
    subfield: any;
    setValue: Function;
    index: number | boolean;
    control: any;
    setValue: Function;
    name: string
}

export default function BfSelect(
    { subfield, setValue, index, control, name }: Props
) {
    // console.log("S:",index )
    const commonType = bibframe.commonType[`${subfield.commonType}`]


    const handleChangeSelect = (event: ChangeEvent<HTMLInputElement>, obj: any) => {
        const {field} = obj
        field.onChange(event)

        const commonType = obj.commonType
        
        
        const label = commonType.find((option: any) => option.value === event.target.value)?.label;
        
        let index = event.target.name.split(".")[1]
        // console.log(label, index)
        setValue(`${name}.${index}.label`, label)
    };

    return (
        <Controller
            name={ index === false ? `${name}.${subfield.name}.value` : `${name}.${index}.${subfield.name}` }
            control={control}
            render={({ field }) => (
                <FormControl fullWidth size="small" //required={f.required}
                >
                    <InputLabel id="label">{subfield.label}</InputLabel>
                    <Select
                        id="role"
                        disabled={subfield.disabled}
                        label={subfield.label}
                        {...field}
                        onChange={(event) => handleChangeSelect(event, {field: field, commonType: commonType } )}
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