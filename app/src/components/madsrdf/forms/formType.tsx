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
        // <Grid item xs={2}>
        <Controller
            name={`type`}
            control={control}
            render={({ field }) => (
                <FormControl //fullWidth
                sx={{ width: 500}}
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

        // </Grid>
    )

}