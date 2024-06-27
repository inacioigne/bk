"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Alert,
  Button,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

// React Hooks
import { useState, FormEvent, ChangeEvent, ReactNode } from "react";

// BiblioKeia Services
import { SearchLCSH } from "@/services/thesarus/searchLCSH";
import { LocAuthority } from "@/services/importation/locAuthority"

// import { bkapi } from "src/services/api";

// react-icons
import { FcHome, FcSearch } from "react-icons/fc";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineSubject, MdChildCare } from "react-icons/md";
import Link from "next/link";



interface typeHits {
  aLabel: string;
  uri: string;
}

const iconType = {
  names: <BsPersonCircle className="icone-personalizado" />,
  subjects: <MdOutlineSubject className="icone-personalizado" />,
  childrensSubjects: <MdChildCare className="icone-personalizado" />

}

interface Props {
  setHit: Function;
}

export default function FormLCSH(props: Props) {

  const { setHit } = props

  const [type, setType] = useState("SimpleType");
  const [search, setSearch] = useState("");
  const [hits, setHits] = useState<typeHits[]>([]);
  const [params, setParams] = useState(new URLSearchParams());

  const handleChangeType = (event: SelectChangeEvent, params: URLSearchParams) => {
    const target = event.target as HTMLButtonElement;
    setType(target.value);
    params.set("rdftype", target.value);
    search !== "" && SearchLCSH(params, setHits);
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const target = event.target as HTMLButtonElement;
    params.set("q", target.value);
    setSearch(target.value)
    target.value !== "" && SearchLCSH(params, setHits);
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault() }}>
        <Paper sx={{ p: "1rem" }}>
          <FormControl fullWidth sx={{ mb: "0.5rem" }}>
            <InputLabel id="label">Selecione uma opção</InputLabel>
            <Select
              labelId="label"
              id="demo-simple-select"
              value={type}
              label="Selecione uma opção"
              onChange={(e) => {
                handleChangeType(e, params);
              }}
            >
              <MenuItem value="SimpleType">Todos</MenuItem>
              <MenuItem value="Topic">Termo Topico</MenuItem>
              <MenuItem value="Geographic">Termo Geográfico</MenuItem>
              <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
              <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Busca"
            variant="outlined"
            value={search}
            fullWidth
            onChange={handleChangeSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    aria-label="Search"
                    type="submit"
                  >
                    <FcSearch />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </form>
      {
        search && (
          <Paper elevation={3} sx={{ mb: "10px" }}>
            {hits.length > 0 ? (
              <div>
                <List>
                  {hits.map((hit, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemButton
                        onClick={(e) => {
                          LocAuthority(setHit, hit.uri)
                        }}
                      >
                        <ListItemIcon color="primary">
                          {iconType[`${hit.uri.split('/')[4]}`]}

                        </ListItemIcon>
                        <ListItemText
                          primary={hit.aLabel}
                          secondary={hit.uri}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

              </div>
            ) : (
              <Box sx={{ p: 2, display: 'flex', gap:  1 }}>
                  <Alert severity="warning" sx={{width: '100%'}}>Nenhum resultado encontrado.</Alert>
                  <Link href={'/admin/authority/create'}>
                  <Button variant="outlined" size="large" sx={{ textTransform: 'none' }}>Criar</Button>
                  </Link>
                
              </Box>
            )}
          </Paper>
        )
      }
    </>
  );
}