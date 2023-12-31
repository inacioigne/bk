// MUI
import {
    TextField, Grid, FormControl,
    InputLabel,
    MenuItem
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Controller } from "react-hook-form"

// Share
import mediaTypes from "@/share/vocabulary/mediaTypes.json" assert { type: "json" };

interface Props {
    register: any,
    control: any;
    setValue: Function
}

export default function FormBfMedia({ control, register, setValue }: Props) {

    return (
        <Controller
            name={`media.uri`}
            control={control}
            defaultValue={"http://id.loc.gov/vocabulary/contentTypes/txt"}
            render={({ field }) => (
                <FormControl
                    fullWidth
                >
                    <InputLabel id="label">Midia</InputLabel>
                    <Select
                        size="small"
                        label="Midia"
                        {...field}
                    >

                        {mediaTypes.map((type, index) =>
                        (<MenuItem
                            key={index}
                            value={type.uri}
                            onClick={() => {
                                setValue("media.label", type.label)
                                console.log(type)
                            }}
                        >{type.label}</MenuItem>)
                        )}
                    </Select>
                </FormControl>
            )}
        />
    )
}