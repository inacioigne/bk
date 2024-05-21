"use client"
import {
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';

import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// react Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { useState } from "react";

import Link from 'next/link'


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


export default function Create() {
  const [typeAuthority, setTypeAuthority] = useState('name');
  const handleChange = (event: SelectChangeEvent) => {
    setTypeAuthority(event.target.value as string);
  };
  const handleType = () => {
    console.log(handleType)
  }
  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={"novo"} />
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de Autoridade</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeAuthority}
            label="Tipo de Autoridade"
            onChange={handleChange}
          >
            <MenuItem value={'name'}>Nome</MenuItem>
            <MenuItem value={'subject'}>Assunto</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ pt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Link href={`/admin/authority/create/${typeAuthority}`}>
        <Button variant="contained">Próximo</Button>

        </Link>
      </Box>



    </Container>
  )
}