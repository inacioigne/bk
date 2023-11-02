"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  Paper,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormElementList from "@/components/madsrdf/forms/formElementList"
import FormAffiliation from "@/components/madsrdf/forms/formAffiliation"
import FormVariant from "@/components/madsrdf/forms/formVariant"
import FormHCEA from "@/components/madsrdf/forms/formHCEA"
import FormRWO from "@/components/madsrdf/forms/formRWO"
import FormOccupation from "@/components/madsrdf/forms/formOccupation"
import FormFieldOfActivity from "@/components/madsrdf/forms/formFieldOfActivity"
import FormFullerName from "@/components/madsrdf/forms/formFullerName"
import FormBirth from "@/components/madsrdf/forms/birth"
import FormDeath from "@/components/madsrdf/forms/birth"

import FormMads from "@/components/forms/formMadsNames"

// BiblioKeia Services
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState } from "react";

// Nextjs
import { useRouter } from "next/navigation";

// MUI Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";

// Schema
import { MadsSchema } from "@/schema/authority/madsSchema"

// Utils
// import { transformAuthority } from "@/utils/authority/personalName/personalName";

// Share
// import months from "@/share/months.json" assert { type: "json" };

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Services BiblioKeia
import { ParserData } from "@/services/thesarus/parserData"


const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/authority",
    label: "Autoridades",
    icon: <BsPersonPlus fontSize="small" />,
  },
];

type SchemaCreateAuthority = z.infer<typeof MadsSchema>;

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

export default function Create() {
  const [id, setId] = useState(null);
  const router = useRouter();
  const { progress, setProgress } = useProgress();
  const {
    openSnack,
    setOpenSnack,
    message,
    setMessage,
    typeAlert,
    setTypeAlert,
  } = useAlert();

  useEffect(() => {
    bkapi
      .get(`/thesarus/next_id`)
      .then(function (response) {
        setId(response.data);

        // console.log(response.data);
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // setProgress(false)
      });
  }, [String(id)]);

  const defaultValues = {
    elementList: [{
      type: 'FullNameElement', elementValue: {
        value: "",
      }
    }],
    hasVariant: [{
      type: "PersonalName",
      elementList: [{ type: "FullNameElement", elementValue: { value: "" } }],
    }],
    hasAffiliation: [{
      organization: { label: "", uri: "" },
      affiliationStart: "",
      affiliationEnd: ""
    }],
    occupation: [{
      uri: "",
      label: "",
      base: ""
    }],
    hasCloseExternalAuthority: [{
      uri: "",
      label: "",
      base: ""
    }],
    identifiesRWO: [{
      uri: "",
      label: "",
      base: ""
    }],
    fieldOfActivity: [{
      uri: "",
      label: "",
      base: ""
    }]
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<SchemaCreateAuthority>({
    resolver: zodResolver(MadsSchema),
    defaultValues: defaultValues,
  });

  // console.log("ER:", errors)

  function createAuthority(data: any) {

    setProgress(true)
    let formData = ParserData(data)

    let obj = {
      type: "PersonalName",
      identifiersLocal: String(id),
      adminMetadata: {
        status: {
          label: "novo",
          value: "n"
        },
      },
      authoritativeLabel: data.birthYearDate ?
        `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
    }

    const request = { ...obj, ...formData };

    bkapi
      .post("/thesarus/create", request, {
        headers: headers,
      })
      .then(function (response) {
        if (response.status === 201) {
          // console.log(response);
          setMessage("Registro criado com sucesso!")
          router.push(`/admin/authority/${response.data.id}`);
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setProgress(false)
        setOpenSnack(true)
      });

  }

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={id ? id : "1"} />
      </Box>
      <form onSubmit={handleSubmit(createAuthority)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" gutterBottom>
            Criar Autoridades - Nome Pessoal
          </Typography>
          <Box>
            <Button
              type="submit"
              sx={{ textTransform: "none" }}
              variant="outlined"
              startIcon={<IoIosSave />}
            >
              Salvar
            </Button>
          </Box>
        </Box>
        <Divider />
        <Paper sx={{ p: "15px", mt: "10px" }}>
          <FormMads
            control={control}
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue} />
        </Paper>
      </form>
    </Container>
  );
}