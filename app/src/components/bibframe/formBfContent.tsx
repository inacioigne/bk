// MUI
import {
    TextField, Grid, FormControl,
    InputLabel,
    // Select,
    MenuItem
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Controller } from "react-hook-form"

// Share
import contentTypes from "@/share/vocabulary/contentTypes.json" assert { type: "json" };

interface Props {
    register: any,
    control: any;
    setValue: Function
}

export default function FormBfContent({ control, register, setValue }: Props) {
   
    return (
        <>
            <Grid item xs={6}>
                <Controller
                    name={`content.uri`}
                    control={control}
                    defaultValue={"http://id.loc.gov/vocabulary/contentTypes/txt"}
                    render={({ field }) => (
                        <FormControl
                            fullWidth
                        >
                            <InputLabel id="label">Conteúdo</InputLabel>
                            <Select
                                size="small"
                                label="Conteúdo"
                                {...field}
                            >

                                {contentTypes.map((type, index) =>
                                (<MenuItem
                                    key={index}
                                    value={type.uri}
                                    onClick={() => {
                                        setValue("content.label", type.label)
                                        // console.log(type)
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