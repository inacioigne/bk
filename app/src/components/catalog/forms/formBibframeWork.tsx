import {
    // Box,
    // Divider,
    // Typography,
    Grid,
    // Paper,
    // TextField,
    // Button,
    // Accordion,
    // AccordionSummary,
    // AccordionDetails
} from "@mui/material";


import FormBfType from "@/components/bibframe/formBfType";
import FormBfTitle from "@/components/bibframe/formBfTitle";
import FormBfContent from "@/components/bibframe/formBfContent";
import FormBfLanguage from "@/components/bibframe/formBfLanguage";
import FormBfContribution from "@/components/bibframe/formBfContribution";
import FormBfSubject from "@/components/bibframe/formBfSubject"

interface Props {
    control: any
    register: Function
    errors: any
    setValue: Function
    setOpenName: Function,
    setOpenSubject: Function,
    setField: Function
}

export default function FormBibframeWork({
    control,
    register,
    setValue,
    errors,
    setOpenName,
    setOpenSubject,
    setField }: Props) {

    return (
        <Grid container spacing={2} sx={{
            p: "25px"
        }}>
            <Grid item xs={12}>
                <FormBfContribution
                    register={register}
                    control={control}
                    error={errors.title}
                    setOpen={setOpenName}
                    setField={setField}
                    setValue={setValue} />
            </Grid>
            <FormBfType
                control={control}
                register={register} />
            <FormBfContent control={control} register={register} setValue={setValue} />
            <FormBfTitle register={register} error={errors.title} />
            <FormBfLanguage control={control} register={register} setField={setField} />
            <Grid item xs={12}>
                <FormBfSubject
                    register={register}
                    control={control}
                    error={errors.title}
                    setOpen={setOpenSubject}
                    setField={setField}
                    setValue={setValue} />
            </Grid>

        </Grid>
    )
}