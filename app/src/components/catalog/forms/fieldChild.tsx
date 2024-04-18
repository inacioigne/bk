import { Box, Button, Grid, IconButton } from "@mui/material"
import BfSubField from "./bibframe/bfSubField"
import SubfieldChild from "./subfieldChild";
import { useFieldArray } from "react-hook-form";
import { MdOutlinePlaylistAdd, MdOutlineDeleteSweep } from "react-icons/md";

interface Props {
    subfield: any;
    register: Function;
    // index: number | boolean;
    control: any;
    setValue: Function;
    nameField: string;
    nestIndex: number;
    // commonType: any | undefined
    // childs: [any]
}

export default function FieldChild({ subfield, register, control, setValue, nameField, nestIndex }: Props) {
    // console.log("fieldChild", nestIndex)

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: `${nameField}.${nestIndex}.${subfield.name}`,
    });

    const addField = () => {
        append({
            lang: "",
            type: "http://www.loc.gov/mads/rdf/v1#FullNameElement",
            value: ""
        })
    };


    return (
        <Box sx={{
            p: 2,
            display: "flex", flexDirection: "column", gap: 2
        }}>
            {subfield.repeatable ? (
                <>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}
                    >
                        {
                            fields.map((item, index) => (
                                <Box key={index} sx={{ display: "flex", gap: 2}}>
                                    <Grid container spacing={2} key={index}>
                                        {
                                            subfield.childs.map((child: any, i: number) => (
                                                <Grid item key={i} xs={child.width} >
                                                    <SubfieldChild
                                                        subfield={child}
                                                        register={register}
                                                        control={control}
                                                        setValue={setValue}
                                                        nameField={`${nameField}.${nestIndex}.${subfield.name}`}
                                                        nestIndex={nestIndex}
                                                        index={index} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                    <IconButton
                                        onClick={addField}>
                                        <MdOutlinePlaylistAdd />
                                    </IconButton>
                                    {fields.length > 1 &&
                                    <IconButton
                                        onClick={() => {
                                            remove(index);
                                        }}>
                                        <MdOutlineDeleteSweep />
                                    </IconButton> }
                                </Box> 
                            ))
                        }
                    </Box>
                </>
            ) : (null)
            }

        </Box>


    )
}