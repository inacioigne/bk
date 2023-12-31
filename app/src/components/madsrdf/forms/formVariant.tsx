// MUI
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from "@mui/material";

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";


import FormElementListVariant from "@/components/madsrdf/forms/formElementListVariant"



interface PropsElementList {
  nestIndex: number;
  control: any;
  register: any;
}

function ElementList({ nestIndex, control, register }: PropsElementList) {
  const {
    fields: fieldsElementList,
    append: appendElementList,
    remove: removeElementList,
  } = useFieldArray({
    control,
    name: `hasVariant.${nestIndex}.hasVariant`,
  });

  const addElement = () => {
    appendElementList({
      type: "FullNameElement",
      elementValue: { value: "" }
    });
  };
  return (
    <div>
      {fieldsElementList.map((field, index) => (
        <Box key={field.id} sx={{ display: 'flex' }}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              disabled={true}
              //   defaultValue={"FullNameElement"}
              label="Tipo do Nome"
              variant="outlined"
              size="small"
              {...register(`hasVariant.${nestIndex}.elementList.${index}.type`)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              // disabled={true}
              //   defaultValue={"FullNameElement"}
              label="Nome"
              variant="outlined"
              size="small"
              {...register(
                `hasVariant.${nestIndex}.elementList.${index}.elementValue.value`
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="add" onClick={addElement} color="primary">
                <IoAddOutline />
              </IconButton>
              <IconButton
                aria-label="add"
                onClick={() => {
                  //   removeVariant(index);
                }}
                color="primary"
              >
                <IoRemove />
              </IconButton>
            </Box>
          </Grid>
        </Box>
      ))}
    </div>
  );
}

interface Props {
  control: any;
  register: any;
  getValues: any;
  setValue: any;
}

export default function FormVariant({ control, register, getValues, setValue, }: Props) {

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "hasVariant"
  });

  const addVariant = () => {
    setValue("hasVariant", [
      ...(getValues().hasVariant || []),
      {
        type: "PersonalName",
        elementList: [{ type: 'FullNameElement', elementValue: { value: "" } }]

      }
    ])
  };
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<IoIosArrowDown />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ borderBottom: "1px solid gray" }}
      >
        <Typography variant="h6" gutterBottom>
          Variantes do nome
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{
        display: "flex",
        flexWrap: "wrap"
      }}>
        {fields.map((field, index) => (
          <Fragment key={index}>
            <Grid container spacing={2} sx={{ m: "10px" }}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  disabled={true}
                  label="Tipo de Variante"
                  variant="outlined"
                  size="small"
                  {...register(`hasVariant.${index}.type`)}
                />
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton aria-label="add" onClick={addVariant} color="primary">
                    <IoAddOutline />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    onClick={() => {
                      remove(index);
                    }}
                    color="primary"
                  >
                    <IoRemove />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormElementListVariant nestIndex={index} {...{ control, register }} />
              </Grid>
            </Grid>

          </Fragment>

        ))}
      </AccordionDetails>
    </Accordion>
  );
}