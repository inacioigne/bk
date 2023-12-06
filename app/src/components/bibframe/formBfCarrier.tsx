// MUI
import {
    TextField, Grid, FormControl,
    InputLabel,
    MenuItem
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Controller } from "react-hook-form"

// Share
import carrier from "@/share/vocabulary/carrier.json" assert { type: "json" };

interface Props {
    // register: any,
    control: any;
    setValue: Function
}

export default function FormBfCarrier({ control, setValue }: Props) {

    return (
        <Controller
            name={`carrier.uri`}
            control={control}
            render={({ field }) => (
                <FormControl
                    fullWidth
                >
                    <InputLabel id="label">Formato</InputLabel>
                    <Select
                        size="small"
                        label="Formato"
                        {...field}
                    >
                        {carrier.map((e, index) =>
                        (<MenuItem
                            key={index}
                            value={e.uri}
                            onClick={() => {
                                setValue("carrier.label", e.label)
                            }}
                        >{e.label}</MenuItem>)
                        )}
                    </Select>
                </FormControl>
            )}
        />
    )
}