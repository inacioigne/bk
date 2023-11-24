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
import FormLocResources from "@/components/forms/formLocResources"
import CardLocResource from "@/components/cards/cardLocResource"
import FormLocWork from "@/components/catalog/forms/formLocWork"
// import FormLocName from "@/components/thesaurus/loc/formLocName";
import FormLocSubject from "@/components/thesaurus/loc/formLocSubject";

// react-icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus, BsPersonFillDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams, useSearchParams  } from 'next/navigation'
import { LocAuthority } from "@/services/importation/locAuthority"

import { Bibframe } from "@/schema/bibframe"

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
  {
    link: "/admin/authority/importation",
    label: "Importação",
    icon: <BsPersonFillDown fontSize="small" />,
  },
];

const names = ["PersonalName",  "CorporateName"]

export default function LOC() {
  const [hit, setHit] = useState<Bibframe|null>(null)
  const [form, setForm] = useState(false)

  const searchParams = useSearchParams()
  const uri = searchParams.get('uri')

  useEffect(() => {
    if (uri) {
      LocAuthority(setHit, uri)
    }
  },[])


  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="LOC" />
      </Box>
     
      {!form ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            Importar Obras - Library of Congress
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={5} sx={{ mt: "15px" }}>
              <FormLocResources setHit={setHit} />
            </Grid>
            <Grid item xs={7} sx={{ mt: "15px" }}>
              {hit && <CardLocResource hit={hit} setHit={setHit} setForm={setForm} />}
            </Grid>
          </Grid>
        </Box>

      ) :  <FormLocWork hit={hit} setForm={setForm} />
    //  ( names.includes(hit?.type) ? 
      // <FormLocName hit={hit} setForm={setForm} /> : 
    //   <FormLocSubject hit={hit} setForm={setForm} /> )
}  
    </Container>
  );
}
