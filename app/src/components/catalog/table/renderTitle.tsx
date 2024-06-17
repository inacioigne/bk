import { Typography, Box } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

type Title = {
    mainTitle: string,
    subtitle: string

}

export function RenderTitle(props: GridRenderCellParams<any, string>) {
    const { hasFocus, value } = props;

    return (
        <Box sx={{pt: 3}}>
            <Typography variant="h6" component="h6">
                {value}
            </Typography>
        </Box>
    );
}