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

// import { IoIosArrowDown } from "react-icons/io";

// import FormElementList from "@/components/madsrdf/forms/formElementList";
// import FormFullerName from "@/components/madsrdf/forms/formFullerName"
// import FormBirth from "@/components/madsrdf/forms/birth"
// import FormDeath from "@/components/madsrdf/forms/death"
// import FormVariant from "@/components/madsrdf/forms/formVariant"
// import FormAffiliation from "@/components/madsrdf/forms/formAffiliation"
// import FormOccupation from "@/components/madsrdf/forms/formOccupation"
// import FormFieldOfActivity from "@/components/madsrdf/forms/formFieldOfActivity"
// import FormRWO from "@/components/madsrdf/forms/formRWO"
import FormHCEA from "@/components/madsrdf/forms/formHCEA"
import FormBfType from "@/components/bibframe/formBfType";
import FormBfTitle from "@/components/bibframe/formBfTitle";
import FormBfContent from "@/components/bibframe/formBfContent";
import FormBfLanguage from "@/components/bibframe/formBfLanguage";

// import { blueGrey } from '@mui/material/colors';


interface Props {
    control: any
    register: Function
    // errors: any
    // getValues: Function
    // setValue: Function
    // setOpen: Function,
    setField: Function
}

export default function FormBibframeWork({ control, register, //errors, getValues, setValue, setOpen, 
    setField }: Props) {

    return (
        <Paper sx={{
            p: "25px", mt: "20px"
        }}>
            <Grid container spacing={3}>
                <FormBfType
                    control={control}
                    register={register} />
                <FormBfContent register={register} />
                <FormBfTitle register={register} />
                <FormBfLanguage control={control} register={register} setField={setField} />
              
            </Grid>

        </Paper>
    )
}