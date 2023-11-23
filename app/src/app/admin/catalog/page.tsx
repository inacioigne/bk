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


// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";
import { CiImport } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";


import Link from "next/link";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    }
];

export default function Catalog() {
    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Divider sx={{mt: "10px"}}/>
            <Paper elevation={3} sx={{ p: "15px", mt: "10px", height: 500 }}>
            <form //onSubmit={onSubmit}
            >
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="field-label">Filtro</InputLabel>
                                    <Select
                                        labelId="field-label"
                                        id="field-select"
                                        // value={field}
                                        label="Filtro"
                                        // onChange={handleChangeField}
                                    >
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
                                    // value={search}
                                    fullWidth
                                    // onChange={handleChangeSearch}
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
                                <Link href={"/admin/catalog/create"}>
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
            </Paper>

        </Container>

    )
}