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
}

export default function ChildSelectField(
    { subfield, setValue, index, control, nameField, commonType }: Props
) {
    


    const handleChangeSelect = (event: ChangeEvent<HTMLInputElement>, obj: any) => {
        const { field } = obj
        field.onChange(event)

        const commonType = obj.commonType
        const label = commonType.find((option: any) => option.value === event.target.value)?.label;
        setValue(`${nameField}.${index}.${subfield.name}.label`, label)  
        // console.log("label", label )
        // let i = event.target.name.split(".")[1]
        // console.log("ChildSelectField", `${nameField}.${index}.${subfield.name}.label`, label )

            // if (nameField == 'contribution') {
            //     setValue(`${nameField}.${index}.role.label`, label)
            // } else {
            //     setValue(`${nameField}.${index}.label`, label)   
            //     console.log("BfSelect", `${nameField}.${index}.label`, subfield )
            // }
        
    };

    return (
        <Controller
            name={`${nameField}.${index}.${subfield.name}.value`}
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