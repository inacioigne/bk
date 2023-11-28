import { Typography, Box } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Image from 'next/image'

type Title = {
    mainTitle: string,
    subtitle: string

}

export function RenderCover(props: GridRenderCellParams<any, String>) {
    const { hasFocus, value } = props;
    // console.log(hasFocus, value)



    return (
        <Box
            sx={{ pt: "5px" }}
        >
            <Image
                alt="cover"
                src={"https://m.media-amazon.com/images/I/81XxDqBss6L._SY425_.jpg"}
                width={80}
                height={100}
            />
        </Box>
    );
}