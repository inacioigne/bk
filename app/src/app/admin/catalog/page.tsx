"use client";
import {
    Container,
    Box,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Divider,
    Button,
    Alert
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// React Hooks
import { useState, useEffect, FormEvent } from "react";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import { TableCatalogResult } from "@/components/catalog/table/tableCatalogResult"

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";
import { CiImport } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";

// BiblioKeia Services
import { SearchCatalog } from "@/services/catalog/searchCatalog";

// Providers BiblioKeia
// import { useParmasAutority } from "@/providers/paramsAuthority";

import Link from "next/link";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    }
];

export default function Catalog() {
    const [field, setField] = useState("search_general");
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(5);
    const [params, setParams] = useState(new URLSearchParams());

    useEffect(() => {

        params.set("q", "*:*");
        params.set("fq", "isPartOf:Work");
        params.set("fl", "*,[child]");
        setParams(params)
        SearchCatalog(
            params,
            setRows,
            setRowCount
        );

    }, [])

    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Divider sx={{ mt: "10px" }} />
            <Paper elevation={3} sx={{
                p: "15px", mt: "10px"
            }}>
                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="field-label">Filtro</InputLabel>
                                <Select
                                    labelId="field-label"
                                    id="field-select"
                                    value={field}
                                    label="Filtro" >
                                    <MenuItem value="search_general">Todos</MenuItem>
                                    <MenuItem value="authority">Nome Autorizado</MenuItem>
                                    <MenuItem value="fullerName">Nome completo</MenuItem>
                                    <MenuItem value="variant">Variantes</MenuItem>
                                    <MenuItem value="organization">Afiliação</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                label="Busca"
                                variant="outlined"
                                fullWidth
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
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            sx={{
                                display: "flex", gap: "15px"
                            }}
                        >
                            <Link href={"/admin/catalog/create/work"}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<FaBookOpenReader />}
                                    sx={{ lineHeight: 2.65, textTransform: "none" }}
                                >
                                    Catalogar
                                </Button>
                            </Link>
                            <Link href={"/admin/catalog/importation"}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<CiImport />}
                                    sx={{ lineHeight: 2.65, textTransform: "none" }}
                                >
                                    Importar
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Divider sx={{ mt: "10px" }} />
                <Box sx={{ mt: "10px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>Refine sua busca:</Grid>
                        {rows.length > 0 ? (
                            <Grid item xs={10} >
                                <TableCatalogResult
                                    rows={rows}
                                    rowCount={rowCount}
                                    setRowCount={setRowCount}
                                    setRows={setRows}
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={10}>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Alert severity="info">
                                        Sua busca não retorno nenhum resultado.
                                    </Alert>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}