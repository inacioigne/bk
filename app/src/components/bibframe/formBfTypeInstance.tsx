// MUI
import {
    FormControl, InputLabel,
    Select, MenuItem, Grid
} from "@mui/material";

import { Controller } from "react-hook-form"

interface Props {
    register: any,
    control: any
}

export default function FormBfTypeInstance({ register, control }: Props) {

    return (
        <Controller
            name={`type`}
            control={control}
            render={({ field }) => (
                <FormControl
                    fullWidth
                >
                    <InputLabel id="label">Tipo da Instância</InputLabel>
                    <Select
                        size="small"
                        label="Tipo da Instância"
                        {...field} >
                        <MenuItem value="Print">Impresso</MenuItem>
                    </Select>
                </FormControl>
            )}
        />
    )
}