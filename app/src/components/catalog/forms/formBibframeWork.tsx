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


import FormBfType from "@/components/bibframe/formBfType";
import FormBfTitle from "@/components/bibframe/formBfTitle";
import FormBfContent from "@/components/bibframe/formBfContent";
import FormBfLanguage from "@/components/bibframe/formBfLanguage";
import FormBfContribution from "@/components/bibframe/formBfContribution";



// import { blueGrey } from '@mui/material/colors';


interface Props {
    control: any
    register: Function
    errors: any
    // getValues: Function
    setValue: Function
    setOpen: Function,
    setField: Function
}

export default function FormBibframeWork({ control, register, setValue, errors, setOpen, //getValues, , , 
    setField }: Props) {

    return (
        <Paper sx={{
            p: "25px", mt: "20px"
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormBfContribution 
                    register={register} 
                    control={control} 
                    error={errors.title} 
                    setOpen={setOpen} 
                    setField={setField}
                    setValue={setValue} />
                </Grid>
                <FormBfType
                    control={control}
                    register={register} />
                <FormBfContent control={control} register={register} setValue={setValue} />
                <FormBfTitle register={register} error={errors.title} />
                <FormBfLanguage control={control} register={register} setField={setField} />

            </Grid>

        </Paper>
    )
}