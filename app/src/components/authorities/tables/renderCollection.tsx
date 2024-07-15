import { Typography, Box, Chip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { MdSubject } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import { blue, deepPurple, teal } from '@mui/material/colors';
import { SearchAuthority } from "@/services/authorities/searchAuthority";

const colors: any = {
    subjects: 'primary',
    names:'secondary',
    place: 'info'
}

export default function RenderCollection(props: GridRenderCellParams<any, string>) {
    // const RenderType = (params: URLSearchParams, setRows: Function, setRowCount: Function ) => (props: GridRenderCellParams) => {
    const { value } = props;
    // console.log(value)
    
    // const handleSearch = () => {
    //     params.set("fq", `type:${value}`);
    //     SearchAuthority(
    //         params,
    //         setRows,
    //         setRowCount
    //     );

    // }

    return (
        <Chip 
        label={value} 
        color={colors[`${value}`]} 
        variant="filled"
        size="small"
        // onClick={handleSearch}
         />
    );
}