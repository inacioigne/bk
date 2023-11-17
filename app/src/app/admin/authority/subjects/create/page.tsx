"use client";
// MUI 
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
} from "@mui/material";

// React Hooks
import { useEffect, useState } from "react";

// Nextjs
import { useRouter } from "next/navigation";

// react Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";

// React-Hook-Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ZodSubjects } from "@/schema/mads/zodSubject"

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Services BiblioKeia
import { ParserData } from "@/services/thesarus/parserData"
import { bkapi } from "@/services/api";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormMadsSubject from "@/components/thesaurus/forms/formMadsSubject";
import ModalSubjects from "@/components/thesaurus/modal/modalThesarus"

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/authority/subjects",
    label: "Autoridades",
    icon: <BsPersonPlus fontSize="small" />,
  },
];

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

type SchemaCreateAuthority = z.infer<typeof ZodSubjects>;

const defaultValues = {
  type: "Topic",
  elementList: [{
    type: 'TopicElement', elementValue: {
      value: "",
    }
  }],
  hasVariant: [{
    type: "Topic",
    elementList: [{ type: "TopicElement", elementValue: { value: "" } }],
  }],
  hasReciprocalAuthority: [
    {
      uri: "",
      label: "",
      base: ""
    }
  ],
  hasBroaderAuthority: [
    {
      uri: "",
      label: "",
      base: ""
    }
  ],
  hasNarrowerAuthority: [
    {
      uri: "",
      label: "",
      base: ""
    }
  ],
  hasCloseExternalAuthority: [{
    uri: "",
    label: "",
    base: ""
  }]
}

export default function Create() {

  const { setProgress } = useProgress();
  const { setOpenSnack, setMessage } = useAlert();
  const [open, setOpen] = useState(false);
  const [field, setField] = useState("");

  const router = useRouter();

  const [id, setId] = useState(null);

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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<SchemaCreateAuthority>({
    resolver: zodResolver(ZodSubjects),
    defaultValues: defaultValues,
  });

  function CreateSubject(data: any) {

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
      isMemberOfMADSCollection: "subjects",
      authoritativeLabel: data.birthYearDate ?
        `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
    }

    const request = { ...obj, ...formData };
    // console.log("R: ", request)

    bkapi
      .post("/thesarus/create", request, {
        headers: headers,
      })
      .then(function (response) {
        if (response.status === 201) {
          // console.log(response);
          setMessage("Registro criado com sucesso!")
          router.push(`/admin/authority/subjects/${response.data.id}`);
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
      <form onSubmit={handleSubmit(CreateSubject)}>
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
        <FormMadsSubject
          control={control}
          register={register}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
          setOpen={setOpen}
          setField={setField}
           />
      </form>
      <ModalSubjects setOpen={setOpen} open={open} defaultValues={defaultValues} field={field} setValue={setValue}/>
    </Container>
  )
}