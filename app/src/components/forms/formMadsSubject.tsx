import {
    Box,
    Divider,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
} from "@mui/material";

import { schemaMads } from "@/schema/authority";

import FormElementList from "@/components/madsrdf/forms/formElementList";
import FormHCEA from "@/components/madsrdf/forms/formHCEA"
import FormHBA from "@/components/madsrdf/forms/formHBA";
import FormHNA from "@/components/madsrdf/forms/formHNA";
import FormHRA from "@/components/madsrdf/forms/formHRA";
import FormVariant from "@/components/madsrdf/forms/formVariant"


interface Props {
    control: any
    register: Function
    errors: any
    getValues: Function
    setValue: Function

}

export default function FormMadsSubject({ control, register, errors, getValues, setValue }: Props) {


    return (
        <Paper sx={{ p: "15px", mt: "20px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Autoridade
                    </Typography>
                </Grid>
                <FormElementList
                    control={control}
                    register={register}
                    error={errors.elementList}
                />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Variantes do nome
                    </Typography>
                    <Divider />
                </Grid>
                <FormVariant control={control} register={register} getValues={getValues} setValue={setValue} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Termo Relacionado
                    </Typography>
                    <Divider />
                </Grid>
                <FormHRA control={control} register={register} />                
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Termo Geral
                    </Typography>
                    <Divider />
                </Grid>
                <FormHBA control={control} register={register} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Termo Específico
                    </Typography>
                    <Divider />
                </Grid>
                <FormHNA control={control} register={register} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Ocorrências em outra bases
                    </Typography>
                    <Divider />
                </Grid>
                <FormHCEA control={control} register={register} />
               
            </Grid>

        </Paper>
    )
}