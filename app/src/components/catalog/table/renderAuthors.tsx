import { SearchCatalog } from "@/services/catalog/searchCatalog";
import { Typography, Box, Chip } from "@mui/material";
import {
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

// export function RenderAuthors(
//     props: GridRenderCellParams) {
const RenderAuthors = (
    params: URLSearchParams,
    setParams: Function,
    setRows: Function, setRowCount: Function, setFacet: Function
) => (props: GridRenderCellParams) => {
    const { value } = props;
    const handleSearch = (contribution: any) => () => {
        let fq = `{!parent which=isPartOf:Work}uri:"${contribution.uri}"`
        params.delete('fq')
        params.append("fq", 'isPartOf:Work');
        params.set("q", fq);
        setParams(params)
        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );
        // console.log(params.getAll('fq'))
    }
    if (Array.isArray(value)) {
        return (
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexDirection: "column", cursor: 'pointer' }}  >
                {value.map((contribution, index) => (
                    <div key={index}>
                        <Chip
                            label={contribution.contribution_label}
                            color="primary"
                            size="small"

                            sx={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                            onClick={handleSearch(contribution)}
                        />

                    </div>

                ))}
            </Box>
        )
    } else {
        return (
            <Box sx={{ mt: 2, cursor: 'pointer' }}>
                <Chip
                    label={value.contribution_label}
                    color="primary"
                    size="small"
                    sx={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}
                    onClick={handleSearch(value)}
                />
            </Box>
        );
    }
}
export default RenderAuthors