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

export default function FormBfType({ register, control }: Props) {

    return (

         <Grid item xs={3}>
            <Controller
                name={`type`}
                control={control}
                render={({ field }) => (
                    <FormControl
                        fullWidth
                    >
                        <InputLabel id="label">Tipo Work</InputLabel>
                        <Select
                            size="small"
                            label="Tipo Work"
                            {...field} >
                            <MenuItem value="Text">Texto</MenuItem>
                            <MenuItem value="Geographic">Termo Geográfico</MenuItem>
                            <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                            <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />
        </Grid>
       

    )

}