import { Typography, Box, Chip } from "@mui/material";
import {
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

export function RenderAuthors(
    props: GridRenderCellParams) {
    const { value } = props;
    const handleSearch = (contribution) => () => {
        console.log(contribution)
    }
    if (Array.isArray(value)) {
        return (
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexDirection: "column" }}  >
                {value.map((contribution, index) => (
                    <div 
                    key={index}
                    onClick={handleSearch(contribution)}
                    >
                        <Chip 
                        label={contribution.contribution_label} 
                        color="primary"
                        size="small" 
                        // onClick={() => console.log('olha')}
                        />
                    </div>

                ))}
            </Box>
        )
    } else {
        return (
            <Box sx={{ mt: 2 }}>
                <Chip label={value.contribution_label} color="primary" size="small" />
            </Box>
        );
    }
}