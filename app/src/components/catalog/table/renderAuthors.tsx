// import { Typography, Box } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

export function RenderAuthors(props: GridRenderCellParams<any, String>) {
    const { hasFocus, value } = props;

    // console.log(value)

    return (
        <div>
            {value.label}
        </div>
    );
}