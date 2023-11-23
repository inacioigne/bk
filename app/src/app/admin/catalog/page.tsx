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

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    },
];

export default function Catalog() {
    return (
        <Container maxWidth="xl" sx={{py: "1rem"}}>
             <BreadcrumbsBK
                    previousPaths={previousPaths}
                    currentPath="Catálogo"
                />
        </Container>

    )
}