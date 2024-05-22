"use client"
import {
  Container,
  Box,
  Divider,
  Typography,
  Button,
} from "@mui/material";

// react Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosSave } from "react-icons/io"; 

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormMadsNames from "@/components/thesaurus/forms/formMadsNames";
import ModalSubjects from "@/components/thesaurus/modal/tmp-modalThesarus"

// Services BiblioKeia
import { ParserData } from "@/services/thesarus/parserData"
import { bkapi } from "@/services/api";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// React Hooks
import { useEffect, useState } from "react";

// Nextjs
import { useRouter } from "next/navigation";

// React-Hook-Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema
import { ZodNames } from "@/schema/mads/OLDER-zodNames"

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/authority/names",
    label: "Autoridades",
    icon: <BsPersonPlus fontSize="small" />,
  },
];

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

type SchemaCreateAuthority = z.infer<typeof ZodNames>;

const defaultValues = {
  type: "PersonalName",
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

export default function Create() {

  const [id, setId] = useState(null);
  const [field, setField] = useState("");
  const [openSubjects, setOpenSubjects] = useState(false);
  const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
  const { setProgress } = useProgress();
  const router = useRouter();

  useEffect(() => {
    bkapi
      .get(`/thesarus/next_id`)
      .then(function (response) {
        setId(response.data);
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // setProgress(false)
      });
  }, [String(id)]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<SchemaCreateAuthority>({
    resolver: zodResolver(ZodNames),
    defaultValues: defaultValues,
  });

  function CreateName(data: any) {

    setProgress(true)
    let formData = ParserData(data)

    let obj = {
      identifiersLocal: String(id),
      adminMetadata: {
        status: {
          label: "novo",
          value: "n"
        },
      },
      isMemberOfMADSCollection: "names",
      authoritativeLabel: data.birthYearDate ?
        `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
    }

    const request = { ...obj, ...formData };
    console.log(request)

    bkapi
      .post("/thesarus/create", request, {
        headers: headers,
      })
      .then(function (response) {
        if (response.status === 201) {
          setTypeAlert("success")
          setMessage("Registro criado com sucesso!")
          router.push(`/admin/authority/names/${response.data.id}`);
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
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={`${id}`} />
      </Box>
      <form onSubmit={handleSubmit(CreateName)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" gutterBottom>
            Criar Autoridades - Assunto
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
        <FormMadsNames
          control={control}
          register={register}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
          setOpen={setOpenSubjects}
          setField={setField}
        />
      </form>
      <ModalSubjects
        setOpen={setOpenSubjects}
        open={openSubjects}
        defaultValues={defaultValues}
        field={field}
        setValue={setValue} />


    </Container>
  )
}