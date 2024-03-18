import {
    TextField
 } from "@mui/material";
 
 interface Props {
     subfield: any;
     register: Function;
     name: string;
     index: number | boolean;
 }
 
 export default function BfTextArea(
     { subfield, register, name, index }: Props
 ) {
 
     // console.log("F: ", subfield)
 
     return (
         <TextField
             disabled={subfield.disabled}
             fullWidth
             multiline
             rows={4}
             required={subfield.required}
             size="small"
             label={`${subfield.label}`}
             variant="outlined"
             {...register(index === false ? `${name}.${subfield.name}` : `${name}.${index}.${subfield.name}`)}
         />
     )
 
 }