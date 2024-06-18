import { Typography, Box } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

type Title = {
    href: string
    mainTitle: string
    subtitle: string

}

export function RenderTitle(props: GridRenderCellParams<any, Title>) {
    const { value } = props;
    // console.log(value)

    return (
        <Link href={`/admin/catalog/${value?.href}`}>
        <Box sx={{pt: 3}}>
            <Typography variant="subtitle1" component="p">
                {value?.mainTitle} {value?.subtitle}
            </Typography>
        </Box>
        </Link>
        
    );
}