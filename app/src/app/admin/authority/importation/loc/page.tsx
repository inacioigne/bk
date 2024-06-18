"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormLCSH from "@/components/forms/formLocSearch"
import CardLoc from "@/components/cards/cardLoc"

// react-icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus, BsPersonFillDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation'
import { LocAuthority } from "@/services/importation/locAuthority"
import FormMadsNames from "@/components/madsrdf/formMadsNames";
import FormMadsSubjects from "@/components/madsrdf/formMadsSubjects";

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
  {
    link: "/admin/authority/importation",
    label: "Importação",
    icon: <BsPersonFillDown fontSize="small" />,
  },
];

export default function LOC() {
  
  const [hit, setHit] = useState(null)
  const [form, setForm] = useState(false)

  const searchParams = useSearchParams()
  const uri = searchParams.get('uri')

  useEffect(() => {
    if (uri) {
      LocAuthority(setHit, uri)
    }
  }, [])

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="LOC" />
      </Box>

      {!form ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            Importar Autoridades - Library of Congress
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={5} sx={{ mt: "15px" }}>
              <FormLCSH setHit={setHit} />
            </Grid>
            <Grid item xs={7} sx={{ mt: "15px" }}>
              {hit && <CardLoc hit={hit} setHit={setHit} setForm={setForm} />}
            </Grid>
          </Grid>
        </Box>

      ) : (hit?.type === 'PersonalName' ?
        <FormMadsNames authority={hit} /> : <FormMadsSubjects authority={hit} />
      )
      }
    </Container>
  );
}
