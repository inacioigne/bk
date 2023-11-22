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
import FormType from "@/components/madsrdf/forms/formType";

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

export default function FormMadsNames({ control, register, errors, getValues, setValue, setOpen, setField }: Props) {

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
                <Grid item xs={4}>
                    <FormFullerName register={register} />
                </Grid>
                <FormBirth register={register} control={control} />
                <FormDeath register={register} control={control} />
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<IoIosArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ borderBottom: "1px solid gray" }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Variantes do nome
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormVariant control={control} register={register} getValues={getValues} setValue={setValue} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Accordion>
                    <AccordionSummary expandIcon={<IoIosArrowDown />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ borderBottom: "1px solid gray" }}
                    >
                        <Grid item xs={12}>

                            <Typography variant="h6" gutterBottom>
                                Afiliação
                            </Typography>
                        </Grid>

                    </AccordionSummary>
                    <AccordionDetails>
                        <FormAffiliation control={control} register={register} />
                    </AccordionDetails>
                </Accordion>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<IoIosArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ borderBottom: "1px solid gray" }}
                        >

                            <Typography variant="h6" gutterBottom>
                                Ocupações
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormOccupation
                                control={control}
                                register={register}
                                setOpen={setOpen}
                                setField={setField} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Campos de atividade
                    </Typography>
                    <Divider />
                </Grid>
                <FormFieldOfActivity
                    control={control}
                    register={register}
                    setOpen={setOpen}
                    setField={setField} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Identificadores
                    </Typography>
                    <Divider />
                </Grid>
                <FormRWO control={control} register={register} />
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Ocorrências em outra bases
                    </Typography>
                    <Divider />
                </Grid>
                <FormHCEA control={control} register={register} />
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
                </Grid>
            </Grid>

        </Paper>
    )
}