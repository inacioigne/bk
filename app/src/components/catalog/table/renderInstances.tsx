import { hasInstance } from "@/types/solrCatalog";
import { Box, Chip } from "@mui/material";
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";

export function RenderInstances(props: GridRenderCellParams) {
    const { value } = props;

    return (
        <div>{
            value.map((instance: hasInstance, index: number) => (
                <Box key={index} sx={{ mt: 2 }}>
                    <Chip
                        label={<Box sx={{ display: "flex", gap: 1 }}>
                            <p>{instance.publicationPlace}:</p>
                            <p>{instance.publicationAgent},</p>
                            <p>{instance.publicationDate}</p>
                        </Box>}
                        sx={{}}
                    />
                </Box>
            ))
        }</div>
    );
}