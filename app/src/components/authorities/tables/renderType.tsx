import { Typography, Box, Chip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { MdSubject } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import { HiBuildingOffice } from "react-icons/hi2";
import { blue, deepPurple, teal } from '@mui/material/colors';
import { SearchAuthority } from "@/services/authorities/searchAuthority";

const icons: any = {
    Topic: <MdSubject />,
    PersonalName: <IoPerson />,
    Geographic: <FaEarthAmericas />,
    CorporateName: <HiBuildingOffice />
}
const colors: any = {
    Topic: 'primary',
    PersonalName:'secondary',
    Geographic: 'info',
    CorporateName: 'warning'
}

// export function RenderType(props: GridRenderCellParams<any, string>) {
    const RenderType = (params: URLSearchParams, setRows: Function, setRowCount: Function ) => (props: GridRenderCellParams) => {
    const { value } = props;
    
    const handleSearch = () => {
        params.set("fq", `type:${value}`);
        SearchAuthority(
            params,
            setRows,
            setRowCount
        );

    }

    return (
        <Chip 
        icon={icons[`${value}`]} 
        label={value} 
        color={colors[`${value}`]} 
        variant="outlined"
        onClick={handleSearch}
         />
    );
}

export default RenderType