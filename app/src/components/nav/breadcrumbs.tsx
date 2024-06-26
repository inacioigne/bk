"use client";
// MUI Components
import { Breadcrumbs, Typography, Chip, Divider, Box } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";

// Next Components
import Link from "next/link";
import { ReactElement } from "react";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";



const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    cursor: "pointer",
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

interface Path {
  link: string,
  label: string,
  icon: ReactElement
}

interface Props {
  previousPaths: Path[],
  currentPath: string
}

export default function BreadcrumbsBK({ previousPaths, currentPath }: Props) {

  const { setProgress } = useProgress();
  
  return (
    <Box>
      <Breadcrumbs separator="/">
      {previousPaths?.map((path, index) => (
        <Link key={index} href={path.link} >
          <StyledBreadcrumb
            label={path.label}
            icon={path.icon} 
            // onClick={initProgress}
          />
        </Link>
      ))}
      <Typography color="text.primary" variant="subtitle2">{currentPath}</Typography>
      
    </Breadcrumbs>
    <Divider sx={{ my: "10px" }} />


    </Box>
    
  );
}