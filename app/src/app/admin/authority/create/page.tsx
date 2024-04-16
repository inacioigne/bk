import {
    Container,
    Box,
    Divider,
    Typography,
    Button,
} from "@mui/material";

import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// react Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";



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
                <BreadcrumbsBK previousPaths={previousPaths} currentPath={"novo"} />
            </Box>

        </Container>
    )
}