// MUI
import { TextField, Grid, Typography } from "@mui/material";

interface Props {
    register: any
    error: any
}

export default function FormBfTitle({ register, error }: Props) {
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
                 {error && (
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                color={"red"}
                            >
                                {error.mainTitle.message}
                            </Typography>
                        )}
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