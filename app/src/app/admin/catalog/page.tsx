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
    useScrollTrigger,
    Slide,
    Typography
} from "@mui/material";
import { grey, purple } from '@mui/material/colors';
import Select, { SelectChangeEvent } from "@mui/material/Select";

// React Hooks
import React, { ChangeEvent, useState, useEffect, FormEvent, useRef, MutableRefObject } from "react";

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
import FacetYear from "@/components/facets/facetYear";
import FacetCatalog from "@/components/facets/facetCatalog";

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
    uri: { buckets: Buckets[] }
}
interface Facets {
    contribution: { buckets: Buckets[] }
    subject: { buckets: Buckets[] }
    year: { buckets: Buckets[] }
}
const useIntersectionObserver = (
    options: IntersectionObserverInit
): [MutableRefObject<HTMLDivElement | null>, boolean] => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isIntersecting];
};



export default function Catalog() {
    const elementRef = useRef(null);
    const [field, setField] = useState("search_general");
    const [facet, setFacet] = useState<Facets | null>(null);
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(5);
    const [params, setParams] = useState(new URLSearchParams());
    const [refine, setRefine] = useState(false);
    const [checked, setChecked] = useState([]);
    const [filters, setFilters] = useState([]);
    const [clear, setClear] = useState(false);


    const [ref, isVisible] = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });


    useEffect(() => {
        params.set("q", "*:*");
        params.set("fq", "isPartOf:Work");
        params.set("fl", "*,[child]");
        params.set("rows", "5");
        let facet = JSON.stringify({
            contribution: {
                domain: { blockChildren: "type:Work" },
                type: 'terms',
                field: 'contribution_label_str',
                limit: 10,
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
                limit: 10,
                facet: {
                    uri: {
                        type: "terms",
                        field: "uri"
                    }
                }
            },
            "year": {
                "domain": { "blockChildren": "type:Work" },
                "type": "terms",
                "field": "publicationDate",
                "limit": 10,
                facet: {
                    uri: {
                        type: "terms",
                        field: "uri"
                    }
                }
            }
        })
        params.set('json.facet', facet)
        setParams(params)
        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );

    }, [])

    const { setValue, control, handleSubmit, formState: { errors } } = useForm();
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

    const handleClear = () => {
        params.delete('fq')
        params.set("fq", "isPartOf:Work");
        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );
        setClear(false)
        setChecked([])
    }

    const handleClearSearch = () => {
        setValue('search', '')
        params.set("q", "*:*");
        params.delete('fq')
        params.set("fq", "isPartOf:Work");
        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );
        setClear(false)
        setChecked([])
    }


    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}
            ref={elementRef}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Paper
                elevation={3}
                sx={{
                    p: "15px", mt: "10px"
                }}
            >
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
                        {rows.length > 0 ? (
                            <>
                                <Grid item xs={2}>
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    Refine sua busca:
                                                </Typography>
                                                {clear && <Button
                                                    size="small"
                                                    sx={{ textTransform: 'none' }}
                                                    onClick={handleClear}
                                                >
                                                    Limpar Filtros
                                                </Button>}

                                            </Box>
                                            {facet?.contribution &&
                                                <FacetCatalog
                                                    type={"contribution"}
                                                    label={"Autores"}
                                                    buckets={facet.contribution.buckets}
                                                    checked={checked}
                                                    filters={filters}
                                                    setFilters={setFilters}
                                                    setChecked={setChecked}
                                                    setRefine={setRefine}
                                                />}
                                            {facet?.subject &&
                                                <FacetCatalog
                                                    type={"subject"}
                                                    label={"Assuntos"}
                                                    buckets={facet.subject.buckets}
                                                    checked={checked}
                                                    filters={filters}
                                                    setFilters={setFilters}
                                                    setChecked={setChecked}
                                                    setRefine={setRefine}
                                                />}
                                            {facet?.year?.buckets && facet.year.buckets.length > 0 &&
                                                <FacetCatalog
                                                    type={"year"}
                                                    label={"Ano"}
                                                    buckets={facet.year.buckets}
                                                    checked={checked}
                                                    filters={filters}
                                                    setFilters={setFilters}
                                                    setChecked={setChecked}
                                                    setRefine={setRefine}
                                                />}
                                        </Box>
                                        <div ref={ref}>
                                        </div>
                                        <Box
                                            sx={isVisible ?
                                                { position: "relative" } :
                                                { position: "fixed", bottom: 0, pb: 1, pr: 1, bgcolor: grey[50] }
                                            }
                                        >
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
                                                setFilters={setFilters}
                                                setClear={setClear}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={10} >
                                    <TableCatalogResult
                                        rows={rows}
                                        rowCount={rowCount}
                                        setRowCount={setRowCount}
                                        setRows={setRows}
                                        params={params}
                                        setParams={setParams}
                                        setFacet={setFacet}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                    <Alert severity="info">
                                        Sua busca não retorno nenhum resultado.
                                    </Alert>
                                    <Button variant="outlined" onClick={handleClearSearch}>Limpar Busca</Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}