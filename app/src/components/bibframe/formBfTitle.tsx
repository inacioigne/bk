// MUI
import { TextField, Grid } from "@mui/material";

interface Props {
    register: any
}

export default function FormBfTitle({ register }: Props) {
    return (
        <>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    size="small"
                    label="Título"
                    variant="outlined"
                    {...register("title.mainTitle")}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    size="small"
                    label="Subtítulo"
                    variant="outlined"
                    {...register("title.subtitle")}
                />
            </Grid>
        </>

    )
}