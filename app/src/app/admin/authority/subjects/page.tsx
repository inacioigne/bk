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

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";
import { TbUserSearch } from "react-icons/tb";
import { MdSubject } from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import { BsPersonPlus } from "react-icons/bs";
import { CiImport } from "react-icons/ci";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Hooks
import { useState, useEffect, FormEvent } from "react";

// Providers BiblioKeia
import { useParmasAutority } from "@/providers/paramsAuthority";

// BiblioKeia Services
import { SearchSubjects } from "@/services/thesarus/searchSubjects";

// BiblioKeia Components
import { TabSubjects } from "@/components/thesaurus/tables/tabSubjects";
import FacetTypeNames from "@/components/facets/typeNames";
import FacetType from "@/components/facets/subjects/facetType"
// import Affiliation from "@/components/facets/affiliations";
// import Occupations from "@/components/facets/occupations";

// Nextjs
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    },
];

export default function Subjects() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { paramsAuthority } = useParmasAutority();

    // const [value, setValue] = useState(0);
    const [cleanOn, setCleanOn] = useState(false)
    const [rowCount, setRowCount] = useState(5);
    const [field, setField] = useState("search_general");
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [facetType, setFacetType] = useState([]);

    useEffect(() => {

        paramsAuthority.set("rows", "5");
        SearchSubjects(
            paramsAuthority,
            setRows,
            setRowCount,
            setFacetType,
        );

    }, [pathname, searchParams]);

    const handleChangeField = (event: SelectChangeEvent) => {
        setField(event.target.value as string);
    };

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value as string);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        paramsAuthority.set("q", `${field}:${search}*`);
        paramsAuthority.has("start") && paramsAuthority.delete("start");
        SearchSubjects(
            paramsAuthority,
            setRows,
            setRowCount,
            setFacetType,
        );
        console.log(paramsAuthority.has("start"));
    };

    const handleClean = () => {
        paramsAuthority.set("q", "search_general:*");
        paramsAuthority.delete("fq");
        paramsAuthority.has("start") && paramsAuthority.delete("start");
        setSearch("");
        setField("search_general");
        SearchSubjects(
            paramsAuthority,
            setRows,
            setRowCount,
            setFacetType,
        );
        setCleanOn(false)
    };
    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK
                    previousPaths={previousPaths}
                    currentPath="Autoridades - Assuntos"
                />
                <Link href={"/admin/authority/names"}>
                    <Button
                        startIcon={<TbUserSearch />}
                        sx={{ "textTransform": "none", color: grey[500] }}
                    >Nomes</Button>
                </Link>

                <Button
                    startIcon={<MdSubject />}
                    sx={{ "textTransform": "none" }}
                >Assuntos</Button>


                <Divider />
                <Paper elevation={3} sx={{ p: "15px", mt: "10px" }}>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <FormControl fullWidth>
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
                            </Grid>
                            <Grid item xs={6}>
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
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sx={{ display: "flex", gap: "15px" }}
                            >

                                <Link href={"/admin/authority/subjects/create"}>
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
                            </Grid>
                        </Grid>
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
                                            <FacetType
                                                facets={facetType}
                                                setRows={setRows}
                                                setFacetType={setFacetType}
                                                setRowCount={setRowCount}
                                                setCleanOn={setCleanOn}

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
                            <Grid item xs={8}>
                                {rows.length > 0 ? (
                                    <TabSubjects
                                        rows={rows}
                                        rowCount={rowCount}
                                        setRowCount={setRowCount}
                                        setRows={setRows}
                                        setFacetType={setFacetType}
                                    />
                                ) : (
                                    <Grid item xs={8}>
                                    <Box sx={{ display: "flex" }}>
                                        <Alert severity="info" >
                                            Sua busca não retorno nenhum resultado.
                                        </Alert>
                                    </Box>
                                </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container >

    )
}