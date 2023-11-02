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
import FormFullerName from "@/components/madsrdf/forms/formFullerName"
import FormBirth from "@/components/madsrdf/forms/birth"
import FormDeath from "@/components/madsrdf/forms/death"
import FormVariant from "@/components/madsrdf/forms/formVariant"
import FormAffiliation from "@/components/madsrdf/forms/formAffiliation"
import FormOccupation from "@/components/madsrdf/forms/formOccupation"
import FormFieldOfActivity from "@/components/madsrdf/forms/formFieldOfActivity"
import FormRWO from "@/components/madsrdf/forms/formRWO"
import FormHCEA from "@/components/madsrdf/forms/formHCEA"

interface Props {
    control: Function
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
                {/* <Grid item xs={5}>
                    <FormFullerName register={register} />
                </Grid>
                <FormBirth register={register} control={control} />
                <FormDeath register={register} control={control} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Variantes do nome
                    </Typography>
                    <Divider />
                </Grid>
                <FormVariant control={control} register={register} getValues={getValues} setValue={setValue} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Afiliação
                    </Typography>
                    <Divider />
                </Grid>
                <FormAffiliation control={control} register={register} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Ocupações
                    </Typography>
                    <Divider />
                </Grid>
                <FormOccupation control={control} register={register} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Campos de atividade
                    </Typography>
                    <Divider />
                </Grid>
                <FormFieldOfActivity control={control} register={register} /> 
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Identificadores
                    </Typography>
                    <Divider />
                </Grid>
                <FormRWO control={control} register={register} />*/}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Ocorrências em outra bases
                    </Typography>
                    <Divider />
                </Grid>
                <FormHCEA control={control} register={register} />
                {/* <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Imagem
                    </Typography>
                    <Divider />
                    <TextField
                        fullWidth
                        size="small"
                        label="Imagem"
                        variant="outlined"
                        {...register("imagem")}
                    />
                </Grid> */}
            </Grid>

        </Paper>
    )
}