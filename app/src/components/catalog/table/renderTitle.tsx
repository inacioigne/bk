import { Typography, Box } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
// import Image from 'next/image'
import Link from "next/link";

type Title = {
    mainTitle: string,
    subtitle: string

}

export function RenderTitle(props: GridRenderCellParams<any, Title>) {
    const { hasFocus, value } = props;
    // console.log(hasFocus, value)



    return (
        <Box
            sx={{
                // display: "flex",
                // alignItems: "center",
                // gap: "5px",
                // flexDirection: "column"
                // cursor: "pointer",
            }}
        >
            <Link href={"/admin"}>
            <Typography
                variant="subtitle2"
                sx={{ fontSize: "12px" }}
            >
                {value?.mainTitle}
            </Typography>
            </Link>
            
        </Box>
    );
}