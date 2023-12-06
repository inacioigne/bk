// MUI
import {
    TextField, Grid, FormControl,
    InputLabel,
    MenuItem
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Controller } from "react-hook-form"

// Share
import issuance from "@/share/vocabulary/issuance.json" assert { type: "json" };

interface Props {
    register: any,
    control: any;
    setValue: Function
}

export default function FormBfIssuance({ control, register, setValue }: Props) {

    return (
        <Controller
            name={`issuance.uri`}
            control={control}
            // defaultValue={"http://id.loc.gov/vocabulary/contentTypes/txt"}
            render={({ field }) => (
                <FormControl
                    fullWidth
                >
                    <InputLabel id="label">Emissão</InputLabel>
                    <Select
                        size="small"
                        label="Emissão"
                        {...field}
                    >
                        {issuance.map((e, index) =>
                        (<MenuItem
                            key={index}
                            value={e.uri}
                            onClick={() => {
                                setValue("issuance.label", e.label)
                            }}
                        >{e.label}</MenuItem>)
                        )}
                    </Select>
                </FormControl>
            )}
        />
    )
}