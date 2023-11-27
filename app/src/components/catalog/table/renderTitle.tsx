import { Typography, Box } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";

type Title = {
    mainTitle: string,
    subtitle: string

}

export function RenderTitle(props: GridRenderCellParams<any, Title>) {
    const { hasFocus, value } = props;
    console.log(hasFocus, value)



    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
            }}
        >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {value?.mainTitle}
            </Typography>
            <Typography variant="body2" >
                {value?.subtitle}
            </Typography>


        </Box>
    );
}