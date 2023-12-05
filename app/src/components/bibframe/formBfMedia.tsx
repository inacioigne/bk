// MUI
import {
    TextField, Grid, FormControl,
    InputLabel,
    MenuItem
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Controller } from "react-hook-form"

// Share
import mediaTypes from "@/share/mediaTypes.json" assert { type: "json" };

interface Props {
    register: any,
    control: any;
    setValue: Function
}

export default function FormBfMedia({ control, register, setValue }: Props) {
    // console.log(contentTypes)
    const handleChange = (event: SelectChangeEvent) => {
        // setAge(event.target.value as string);
        console.log(event.target.value)
    };
    return (
        <>
            <Grid item xs={6}>
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
            </Grid>
        </>
    )
}