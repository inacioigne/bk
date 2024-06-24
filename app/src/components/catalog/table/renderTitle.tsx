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

export function RenderTitle(props: GridRenderCellParams<any, string>) {
    const { value } = props;
    const title = value?.split("#")[0]
    const id = value?.split("#")[1]
    // console.log(id)

    return (
        <Link href={`/admin/catalog/${id}`}>
        <Box sx={{pt: 3}}>
            <Typography variant="subtitle1" component="p">
                {title}
            </Typography>
        </Box>
        </Link>
    );
}