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


import FormBfTypeInstance from "@/components/bibframe/formBfTypeInstance";
import FormBfTitle from "@/components/bibframe/formBfTitle";
import FormBfMedia from "@/components/bibframe/formBfMedia";
import FormBfIssuance from "@/components/bibframe/formBfIssuance";
import FormBfCarrier from "@/components/bibframe/formBfCarrier";
import FormBfLanguage from "@/components/bibframe/formBfLanguage";
import FormBfPublication from "@/components/bibframe/formBfPublication";



interface Props {
    control: any
    register: Function
    errors: any
    setValue: Function
    setOpenName: Function,
    setOpenSubject: Function,
    setField: Function,
}

export default function FormBibframeInstance({ 
    control, register, setValue, errors, 
    setField }: Props) {

    return (

        <Grid container spacing={2} sx={{
            p: "25px"
        }}>
            <Grid item xs={3}>
                <FormBfTypeInstance control={control} register={register} />
            </Grid>
            <Grid item xs={3}>
                <FormBfMedia control={control} register={register} setValue={setValue} />
            </Grid>
            <Grid item xs={3}>
                <FormBfIssuance control={control} register={register} setValue={setValue} />
            </Grid>
            <Grid item xs={3}>
                <FormBfCarrier control={control} setValue={setValue} />
            </Grid>
            <Grid item xs={12}>
                <FormBfPublication register={register} error={undefined} control={undefined} setOpen={undefined} setField={undefined} setValue={undefined} />
            </Grid>
            <FormBfTitle register={register} error={errors.title} />
            <FormBfLanguage control={control} register={register} setField={setField} />
            <Grid item xs={12}>
            <TextField
                    fullWidth
                    size="small"
                    label="Imagem"
                    variant="outlined"
                    {...register("image")}
                />
            </Grid>
           


        </Grid>
    )
}