// MUI
import { Grid, TextField, Typography, Box, FormControl, InputLabel, 
    Select, MenuItem } from "@mui/material";

// React-Hook-Form
import { Controller } from "react-hook-form";

// Share
import months from "@/share/months.json" assert { type: "json" };

interface Props {
    register: any,
    control: any
}

export default function FormDeath({ register, control }: Props) {
    return (
        <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Falecimento:
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  label="Local de Falecimento"
                  variant="outlined"
                  size="small"
                  {...register("deathPlace")}
                />
                <TextField
                  label="Dia"
                  variant="outlined"
                  sx={{ width: 100 }}
                  size="small"
                  {...register("deathDayDate")}
                />
                <Controller
                  name="deathMonthDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      sx={{ width: 100 }}
                      size="small"
                    >
                      <InputLabel id="label-month">Mês</InputLabel>
                      <Select {...field} labelId="label-month" label="Mês">
                        {months.map((mes, index) => (
                          <MenuItem key={index} value={mes.value}>
                            {mes.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <TextField
                  label="Ano"
                  variant="outlined"
                  sx={{ width: 100 }}
                  size="small"
                  {...register("deathYearDate")}
                />
              </Box>
            </Grid>
    )
}