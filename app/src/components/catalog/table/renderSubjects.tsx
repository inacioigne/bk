import { Typography, Box, Chip } from "@mui/material";
import { amber } from '@mui/material/colors';
import {
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

export function RenderSubjects(props: GridRenderCellParams) {
    const { value } = props;
    if (Array.isArray(value)) {
        return (
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexDirection: "column"}} >
                { value.map((contribution, index) => (
                    <div key={index}>
                        <Chip  label={contribution.label} sx={{ backgroundColor: amber[500]}} size="small"/>
                    </div>
                ))}
            </Box>
        )        
    } else {
        return (
            <Box sx={{ mt: 2}}>
                <Chip label={value.label} sx={{ backgroundColor: amber[500]}} size="small"/>
            </Box>
        );
    }
}