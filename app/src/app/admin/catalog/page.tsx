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
    Alert,
    Collapse
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// React Hooks
import { ChangeEvent, useState, useEffect, FormEvent } from "react";

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
import { useFieldArray, useWatch, Controller } from "react-hook-form";

import Link from "next/link";
import { useForm } from "react-hook-form";
import FacetContribution from "@/components/facets/facetContribution";
import BtnRefine from "@/components/catalog/btnRefine";
import FacetSubject from "@/components/facets/facetSubject";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    }
];

interface Buckets {
    val: string
    count: number
}

export default function Catalog() {
    const [field, setField] = useState("search_general");
    const [facet, setFacet] = useState(null);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(5);
    const [params, setParams] = useState(new URLSearchParams());
    const [refine, setRefine] = useState(false);
    const [checked, setChecked] = useState([]);
    const [filters, setFilters] = useState([]);


    useEffect(() => {
        params.set("q", "*:*");
        params.set("fq", "isPartOf:Work");
        params.set("fl", "*,[child]");
        let facet = JSON.stringify({
            contribution: {
                domain: { blockChildren: "type:Work" },
                type: 'terms',
                field: 'contribution_label_str',
                limit: -1,
                facet: {
                    uri: {
                        type: "terms",
                        field: "uri"
                    }
                }
            },
            subject: {
                domain: { blockChildren: "type:Work" },
                type: 'terms',
                field: 'subject_label_str',
                limit: -1,
                facet: {
                    uri: {
                        type: "terms",
                        field: "uri"
                    }
                }
            }
        })
        params.set('json.facet', facet)
        // console.log(facet)
        setParams(params)
        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );
    }, [])

    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        if (data.filter.includes('label')) {
            params.set("q", `{!parent which=isPartOf:Work}${data.filter}:${data.search}`);
            console.log(data);
        } else {
            params.set("q", `${data.filter}:${data.search}`);
        }

        setParams(params)
        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );

    };

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Controller
                                name="filter"
                                control={control}
                                defaultValue="search_general"
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">Filtro</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            label="Filtro"
                                            {...field}
                                            error={!!errors.option}
                                        >
                                            <MenuItem value="search_general">Todos</MenuItem>
                                            <MenuItem value="mainTitle">Título Principal</MenuItem>
                                            <MenuItem value="contribution_label">Autor</MenuItem>
                                            <MenuItem value="subject_label">Assunto</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="search"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Este campo é obrigatório', minLength: { value: 3, message: 'Mínimo de 3 caracteres' } }}
                                render={({ field }) => (
                                    <TextField
                                        label="Busca"
                                        {...field}
                                        error={!!errors.textField}
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
                                )}
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
                        <Grid item xs={2}>
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box>
                                    <p>Refine sua busca:</p>
                                    {facet?.contribution &&
                                        <FacetContribution
                                            facet={facet}
                                            buckets={facet?.contribution.buckets}
                                            setParams={setParams}
                                            params={params}
                                            setRows={setRows}
                                            setRowCount={setRowCount}
                                            setFacet={setFacet}
                                            setRefine={setRefine}
                                            checked={checked}
                                            setChecked={setChecked}
                                            filters={filters}
                                            setFilters={setFilters} />}
                                    {facet?.subject &&
                                        <FacetSubject
                                            facet={facet}
                                            buckets={facet?.subject.buckets}
                                            setParams={setParams}
                                            params={params}
                                            setRows={setRows}
                                            setRowCount={setRowCount}
                                            setFacet={setFacet}
                                            setRefine={setRefine}
                                            checked={checked}
                                            setChecked={setChecked}
                                            filters={filters}
                                            setFilters={setFilters} />}
                                </Box>
                                <BtnRefine
                                    refine={refine}
                                    setRefine={setRefine}
                                    params={params}
                                    setParams={setParams}
                                    setRows={setRows}
                                    setRowCount={setRowCount}
                                    setFacet={setFacet}
                                    checked={checked}
                                    setChecked={setChecked}
                                    filters={filters}
                                    setFilters={setFilters} />

                            </Box>
                        </Grid>
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