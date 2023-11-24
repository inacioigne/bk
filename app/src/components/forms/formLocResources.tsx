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
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

// React Hooks
import { useState, FormEvent, ChangeEvent, ReactNode } from "react";

// BiblioKeia Services
// import { LocAuthority } from "@/services/importation/locAuthority"
import { LocResources } from "@/services/importation/locResources"
import { SearchLocResources } from "@/services/importation/searchLocResources"

// import { bkapi } from "src/services/api";

// react-icons
import { FcSearch } from "react-icons/fc";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineSubject, MdChildCare } from "react-icons/md";



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

export default function FormLocResources(props: Props) {

  const { setHit } = props

  const [type, setType] = useState("/");
  const [search, setSearch] = useState("");
  const [hits, setHits] = useState<typeHits[]>([]);
  const [params, setParams] = useState(new URLSearchParams());

  const handleChangeType = (event: SelectChangeEvent, params: URLSearchParams) => {
    const target = event.target as HTMLButtonElement;
    setType(target.value);
    // params.set("rdftype", target.value);
    search !== "" && SearchLocResources(params, target.value, setHits);
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const target = event.target as HTMLButtonElement;
    params.set("q", target.value);
    setSearch(target.value)
    SearchLocResources(params, type, setHits);
  };

  return (
    <>
      <form onSubmit={(e) => {e.preventDefault()}}>
        <Paper sx={{ p: "1rem" }}>
          {/* <FormControl fullWidth sx={{ mb: "0.5rem" }}>
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
              <MenuItem value="/">Todos</MenuItem>
              <MenuItem value="/works/">Work</MenuItem>
              <MenuItem value="/hubs/">Hub</MenuItem>
              <MenuItem value="/instances/">Instance</MenuItem>
              <MenuItem value="CorporateName">Nome Coorporativo</MenuItem> 
            </Select>
          </FormControl> */}
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
                        onClick={() => {
                            LocResources(setHit, hit.uri)
                            // console.log(hit)
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
              <Typography variant="subtitle2" sx={{ p: "5px" }}>
                Nenhum resultado encontrado
              </Typography>
            )}
          </Paper>
        )
      }
    </>
  );
}