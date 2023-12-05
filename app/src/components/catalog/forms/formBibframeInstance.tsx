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
import FormBfLanguage from "@/components/bibframe/formBfLanguage";
import FormBfSubject from "@/components/bibframe/formBfSubject"

interface Props {
    control: any
    register: Function
    errors: any
    setValue: Function
    setOpenName: Function,
    setOpenSubject: Function,
    setField: Function,
}

export default function FormBibframeInstance({ control, register, setValue, errors, //setOpenName, setOpenSubject, //getValues, , , 
    setField }: Props) {

    return (

        <Grid container spacing={2} sx={{
            p: "25px"
        }}>
            <FormBfTypeInstance
                control={control}
                register={register} />
            <FormBfMedia control={control} register={register} setValue={setValue} />
            <FormBfTitle register={register} error={errors.title} />
            <FormBfLanguage control={control} register={register} setField={setField} />
            {/* <Grid item xs={12}>
                <FormBfSubject
                    register={register}
                    control={control}
                    error={errors.title}
                    setOpen={setOpenSubject}
                    setField={setField}
                    setValue={setValue} />
            </Grid> */}

        </Grid>
    )
}