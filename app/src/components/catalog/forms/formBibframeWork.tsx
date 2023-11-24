import {
    Box,
    Divider,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";

import { IoIosArrowDown } from "react-icons/io";

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
import FormBfType from "@/components/bibframe/formBfType";
import FormBfTitle from "@/components/bibframe/formBfTitle";

import { blueGrey } from '@mui/material/colors';


interface Props {
    control: any
    register: Function
    errors: any
    getValues: Function
    setValue: Function
    setOpen: Function,
    setField: Function
}

export default function FormBibframeWork({ control, register, errors, getValues, setValue, setOpen, setField }: Props) {

    return (
        <Paper sx={{
            p: "25px", mt: "20px"
        }}>
            <Grid container spacing={3}>
                <FormBfType
                    control={control}
                    register={register} />
                <FormBfTitle register={register} />

                {/* <FormElementList
                    control={control}
                    register={register}
                    error={errors.elementList}
                />
                <Grid item xs={4}>
                    <FormFullerName register={register} />
                </Grid>
                <FormBirth register={register} control={control} />
                <FormDeath register={register} control={control} />
                <Grid item xs={12} >
                    <FormVariant
                        control={control}
                        register={register}
                        getValues={getValues}
                        setValue={setValue} />
                </Grid>
                <Grid item xs={12} >
                    <FormAffiliation
                        control={control}
                        register={register} />
                </Grid>

                <Grid item xs={12} >
                    <FormOccupation
                        control={control}
                        register={register}
                        setOpen={setOpen}
                        setField={setField} />
                </Grid>

                <Grid item xs={12} >
                    <FormFieldOfActivity
                        control={control}
                        register={register}
                        setOpen={setOpen}
                        setField={setField} />
                </Grid>

                <Grid item xs={12} >
                    <FormRWO control={control} register={register} />
                </Grid>

                <Grid item xs={12} >
                    <FormHCEA control={control} register={register} />
                </Grid>

                <Grid item xs={12}>
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