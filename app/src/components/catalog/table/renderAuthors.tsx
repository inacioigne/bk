import { Typography, Box, Chip } from "@mui/material";
import {
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

export function RenderAuthors(props: GridRenderCellParams) {
    const { value } = props;
    // console.log(value)
    if (Array.isArray(value)) {
        return (
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexDirection: "column"}} >
                { value.map((contribution, index) => (
                    <div key={index}>
                        <Chip  label={contribution.contribution_label} color="primary" size="small"/>
                    </div>
                    
                ))}
            </Box>
        )        
    } else {
        return (
            <Box sx={{ mt: 2}}>
                <Chip label={value.contribution_label} color="primary" size="small"/>
            </Box>
        );
    }
}