import {
    Container,
    Box,
    Divider,
    Typography,
    Grid,
    FormControl,
    Paper,
    TextField,
    Button,
} from "@mui/material";

// react Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";

const previousPaths = [
    {
      link: "/admin",
      label: "Início",
      icon: <FcHome fontSize="small" />,
    },
    {
      link: "/admin/authority/names",
      label: "Autoridades",
      icon: <BsPersonPlus fontSize="small" />,
    },
  ];

export default function Create() {
    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths} currentPath={"Criar"} />
            </Box>

        </Container>
    )
}