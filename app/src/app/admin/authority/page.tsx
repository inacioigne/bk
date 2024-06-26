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
    Typography,
    Alert
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { CiImport } from "react-icons/ci";
import { AiOutlineClear } from "react-icons/ai";

// React Hooks
import { useState, useEffect, FormEvent } from "react";

// BiblioKeia Components
import { TabName } from "@/components/thesaurus/tables/tabNames";
import FacetTypeNames from "@/components/facets/names/typeNames";
import Affiliation from "@/components/facets/affiliations";
import Occupations from "@/components/facets/occupations";

import Link from "next/link";


const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    }
];


export default function Authority() {

    const [field, setField] = useState("search_general");
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [facetType, setFacetType] = useState([]);
    const [rowCount, setRowCount] = useState("*");
    const [cleanOn, setCleanOn] = useState(false)
    const [facetAffiliation, setFacetAffiliation] = useState([]);
    const [facetOccupation, setOccupation] = useState([]);
    const [params, setParams] = useState(new URLSearchParams());

    const handleChangeField = (event: SelectChangeEvent) => {
        setField(event.target.value as string);
    };
    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value as string);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // paramsAuthority.set("q", `${field}:${search}`);
        // paramsAuthority.has("start") && paramsAuthority.delete("start");
        // SearchNames(
        //     paramsAuthority,
        //     setRows,
        //     setRowCount,
        //     setFacetType,
        //     setFacetAffiliation,
        //     setOccupation
        // );
        // console.log(paramsAuthority.has("start"));
    };

    const handleClean = () => {
        // paramsAuthority.set("q", "search_general:*");
        // paramsAuthority.delete("fq");
        // paramsAuthority.has("start") && paramsAuthority.delete("start");
        // setSearch("");
        // setField("search_general");
        // SearchNames(
        //     paramsAuthority,
        //     setRows,
        //     setRowCount,
        //     setFacetType,
        //     setFacetAffiliation,
        //     setOccupation
        // );
        setCleanOn(false)
    };

    // useEffect(() => {
    //     params.set("q", "*:*");
    //     params.set("fq", "isPartOf:Work");
    //     params.set("fl", "*,[child]");
    //     setParams(params)
    //     SearchCatalog(
    //         params,
    //         setRows,
    //         setRowCount
    //     );
    // }, [])


    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths} currentPath={"Autoridades"} />
            </Box>
            <Paper elevation={3} sx={{ p: "15px", mt: "10px", height: 500 }}>
                <form onSubmit={onSubmit}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="field-label">Filtro</InputLabel>
                            <Select
                                labelId="field-label"
                                id="field-select"
                                value={field}
                                label="Filtro"
                                onChange={handleChangeField}
                            >
                                <MenuItem value="search_general">Todos</MenuItem>
                                <MenuItem value="authority">Nome Autorizado</MenuItem>
                                <MenuItem value="fullerName">Nome completo</MenuItem>
                                <MenuItem value="variant">Variantes</MenuItem>
                                <MenuItem value="organization">Afiliação</MenuItem>
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
                        <Link href={"/admin/authority/create"}>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<BsPersonPlus />}
                                sx={{ lineHeight: 2.65, textTransform: "none" }}
                            >
                                Novo
                            </Button>
                        </Link>
                        <Link href={"/admin/authority/importation"}>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<CiImport />}
                                sx={{ lineHeight: 2.65, textTransform: "none" }}
                            >
                                Importar
                            </Button>
                        </Link>

                    </Box>
                </form>
                <Divider sx={{ mt: "10px" }} />
                <Box sx={{ mt: "10px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {rows.length > 0 && <Typography variant="body1" gutterBottom>
                                Refine sua busca:
                            </Typography>
                            }
                            <Box sx={{
                                height: 300, justifyContent: "space-between",
                                display: "flex", flexDirection: "column", alignContent: "space-between"
                            }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                    }}
                                >
                                    {facetType?.length > 0 && (
                                        <FacetTypeNames
                                            setCleanOn={setCleanOn}
                                            facets={facetType}
                                            setRows={setRows}
                                            setRowCount={setRowCount}
                                            setFacetType={setFacetType}
                                            setFacetAffiliation={setFacetAffiliation}
                                            setOccupation={setOccupation}
                                        />
                                    )}
                                    {facetAffiliation?.length > 0 && (
                                        <Affiliation
                                            facets={facetAffiliation}
                                            setRows={setRows}
                                            setRowCount={setRowCount}
                                            setFacetType={setFacetType}
                                            setFacetAffiliation={setFacetAffiliation}
                                            setOccupation={setOccupation}
                                        />
                                    )}
                                    {facetOccupation?.length > 0 && (
                                        <Occupations
                                            facets={facetOccupation}
                                            setRows={setRows}
                                            setRowCount={setRowCount}
                                            setFacetType={setFacetType}
                                            setFacetAffiliation={setFacetAffiliation}
                                            setOccupation={setOccupation}
                                        />
                                    )}
                                </Box>
                                <Box sx={cleanOn ? { display: "block" } : { display: "none" }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<AiOutlineClear />}
                                        sx={{
                                            textTransform: "none",
                                        }}
                                        onClick={handleClean}
                                    >
                                        Limpar Filtros
                                    </Button>
                                </Box>
                            </Box>

                        </Grid>
                        {rows.length > 0 ? (
                            <Grid item xs={8}>
                                <TabName
                                    rows={rows}
                                    rowCount={rowCount}
                                    setRowCount={setRowCount}
                                    setRows={setRows}
                                    setFacetType={setFacetType}
                                    setFacetAffiliation={setFacetAffiliation}
                                    setOccupation={setOccupation}
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={8}>
                                <Box sx={{ display: "flex" }}>
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