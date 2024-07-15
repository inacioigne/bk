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
import { grey } from '@mui/material/colors';

import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { CiImport } from "react-icons/ci";
// import { AiOutlineClear } from "react-icons/ai";

// React Hooks
import { useState, useEffect, FormEvent, SetStateAction, MutableRefObject, useRef } from "react";

// BiblioKeia Components
import { TabName } from "@/components/authorities/tables/tabNames";
import FacetTypeNames from "@/components/facets/names/typeNames";
import Affiliation from "@/components/facets/affiliations";
import Occupations from "@/components/facets/occupations";

import Link from "next/link";
import { SearchAuthority } from "@/services/authorities/searchAuthority";
import { TableAuthoritiesResult } from "@/components/authorities/tables/tableAuthoritiesResult"
import { useSearchParams } from 'next/navigation'
import FacetAuthority from "@/components/facets/facetAuthority";
import BtnRefineAuthority from "@/components/authorities/tables/btnRefineAuthority";

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
    // uri: { buckets: Buckets[] }
}

interface Facets {
    type: { buckets: Buckets[] }
    // subject: { buckets: Buckets[] }
    // year: { buckets: Buckets[] }
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


export default function Authority() {

    const [field, setField] = useState("search_general");
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [facet, setFacet] = useState<Facets | null>(null);
    const [rowCount, setRowCount] = useState(0);
    const [cleanOn, setCleanOn] = useState(false)
    const [facetAffiliation, setFacetAffiliation] = useState([]);
    const [facetOccupation, setOccupation] = useState([]);
    const [params, setParams] = useState(new URLSearchParams());
    const [clear, setClear] = useState(false);
    const [checked, setChecked] = useState([]);
    const searchParams = useSearchParams()
    const [filters, setFilters] = useState([]);
    const [refine, setRefine] = useState(false);
    const [ref, isVisible] = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });


    const handleChangeField = (event: SelectChangeEvent) => {
        setField(event.target.value as string);
    };
    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value as string);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(field, search)
        params.set("q", `${field}:${search}`);
        setParams(params)
        // paramsAuthority.has("start") && paramsAuthority.delete("start");
        SearchAuthority(
            params,
            setRows,
            setRowCount,
            setFacet
        );
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

    useEffect(() => {
        params.set("q", "*:*");
        params.set("fq", "type:Authority");
        params.set("fl", "*,[child]");
        let facet = JSON.stringify({
            "type": {
                "type": "terms",
                "field": "type"
            }
        })
        params.set('json.facet', facet)
        setParams(params)
        SearchAuthority(
            params,
            setRows,
            setRowCount,
            setFacet
        );
    }, [])

    const handleClear = () => {
        params.delete('fq')
        params.set("fq", "type:Authority");
        SearchAuthority(
            params,
            setRows,
            setRowCount,
            setFacet
        );
        setClear(false)
        setChecked([])
    }


    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths} currentPath={"Autoridades"} />
            </Box>
            <Paper
                elevation={3}
                sx={{ p: "15px", mt: "10px" }}>
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
                        <Link href={"/admin/authorities/create"}>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<BsPersonPlus />}
                                sx={{ lineHeight: 2.65, textTransform: "none" }}
                            >
                                Novo
                            </Button>
                        </Link>
                        <Link href={"/admin/authorities/importation"}>
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
                                            {facet?.type &&
                                                <FacetAuthority
                                                    type={"type"}
                                                    label={"Tipo"}
                                                    buckets={facet.type.buckets}
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
                                            <BtnRefineAuthority
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
                                    <TableAuthoritiesResult
                                        rows={rows}
                                        setRows={setRows}
                                        setRowCount={setRowCount}
                                        params={params}
                                        setParams={setParams}
                                        rowCount={rowCount} />
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                    <Alert severity="info">
                                        Sua busca não retorno nenhum resultado.
                                    </Alert>
                                    <Button variant="outlined" //onClick={handleClearSearch}
                                    >Limpar Busca</Button>
                                </Box>
                            </Grid>
                        )}
                        {/* <Grid item xs={4}>
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
                        )} */}
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}