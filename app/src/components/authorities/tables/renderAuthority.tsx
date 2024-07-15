import { Typography, Box, Chip, Avatar } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { MdSubject } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import { blue, deepPurple, teal } from '@mui/material/colors';
import { SearchAuthority } from "@/services/authorities/searchAuthority";
import Link from "next/link";

const colors: any = {
    subjects: 'primary',
    names:'secondary',
    place: 'info'
}

function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  

export default function RenderAuthority(props: GridRenderCellParams<any, string>) {
    // const RenderType = (params: URLSearchParams, setRows: Function, setRowCount: Function ) => (props: GridRenderCellParams) => {
    const { value } = props;
    let label = value?.split('#')[0]
    let id = value?.split('#')[1]
    let color = stringToColor(label as string)
    // console.log(color)
    
    // const handleSearch = () => {
    //     params.set("fq", `type:${value}`);
    //     SearchAuthority(
    //         params,
    //         setRows,
    //         setRowCount
    //     );
    // }

    return (
        <Link href={`/admin/authorities/${id}`}>
        <Chip 
        avatar={<Avatar //sx={{bgcolor: color, color: 'white'}}
        >{label?.charAt(0)}</Avatar>} 
        label={label} 
        // color={'primary'} 
        variant="outlined"
        // onClick={handleSearch}
         />
         </Link>
    );
}