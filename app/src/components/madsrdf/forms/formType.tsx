// MUI
import {
    FormControl, InputLabel,
    Select, MenuItem
} from "@mui/material";

import { Controller } from "react-hook-form"

interface Props {
    register: any,
    control: any
}

export default function FormType({ register, control }: Props) {

    return (
        <Controller
            name={`type`}
            control={control}
            render={({ field }) => (
                <FormControl 
                    sx={{ width: 400 }}
                >
                    <InputLabel id="label">Tipo de Autoridade</InputLabel>
                    <Select
                        size="small"
                        label="Tipo de Autoridade"
                        {...field} >
                        <MenuItem value="Topic">Topic</MenuItem>
                        <MenuItem value="Geographic">Termo Geográfico</MenuItem>
                        <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                        <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                    </Select>
                </FormControl>
            )}
        />
    )

}