// MUI
import { TextField, Grid } from "@mui/material";

interface Props {
    register: any
}

export default function FormBfContent({ register }: Props) {
    return (
        <>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    size="small"
                    label="Conteúdo"
                    variant="outlined"
                    {...register("content.label")}
                />
            </Grid>
            {/* <Grid item xs={6}>
                <TextField
                    fullWidth
                    size="small"
                    label="Subtítulo"
                    variant="outlined"
                    {...register("title.subtitle")}
                />
            </Grid> */}
        </>

    )
}