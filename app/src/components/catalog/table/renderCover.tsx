import { Box } from "@mui/material";
import {
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Image from 'next/image'

export function RenderCover(props: GridRenderCellParams<any, String>) {
    const { value } = props;
    return (
        <Box
            sx={{
                width: 110, height: 130, m: 1
            }}
        >
            <Image
                alt="cover"
                src={value ? value as string : '/cover.png'}
                width={100}
                height={130}
            />
        </Box>
    );
}