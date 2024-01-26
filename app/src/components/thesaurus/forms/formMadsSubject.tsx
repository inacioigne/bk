import { Typography, Grid, Paper } from "@mui/material";

import FormElementList from "@/components/madsrdf/forms/formElementList";
import FormHCEA from "@/components/madsrdf/forms/formHCEA"
import FormHBA from "@/components/madsrdf/forms/formHBA";
import FormHNA from "@/components/madsrdf/forms/formHNA";
import FormHRA from "@/components/madsrdf/forms/formHRA";
import FormVariant from "@/components/madsrdf/forms/formVariant"
import FormType from "@/components/madsrdf/forms/formType";


interface Props {
    control: any
    register: Function
    errors: any
    getValues: Function
    setValue: Function
    setOpen: Function,
    setField: Function

}

export default function FormMadsSubject({ control, register, errors, getValues, setValue, setOpen, setField }: Props) {

    return (
        <Paper sx={{ p: "15px", mt: "20px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Autoridade
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormType control={control}
                        register={register} />
                </Grid>
                <FormElementList
                    control={control}
                    register={register}
                    error={errors.elementList}
                />
                <Grid item xs={12}>
                    <FormVariant control={control} register={register} getValues={getValues} setValue={setValue} />
                </Grid>
                <Grid item xs={12}>
                    <FormHRA
                    control={control}
                    register={register}
                    setOpen={setOpen}
                    setField={setField} />
                </Grid>
           
                <Grid item xs={12}>
                    <FormHBA
                    control={control}
                    register={register}
                    setOpen={setOpen}
                    setField={setField} />
                </Grid>
               
                <Grid item xs={12}>
                    <FormHNA
                    control={control}
                    register={register}
                    setOpen={setOpen}
                    setField={setField} />
                </Grid>
              
                <Grid item xs={12}>
                    <FormHCEA control={control} register={register} />
                </Grid>
             
            </Grid>

        </Paper>
    )
}