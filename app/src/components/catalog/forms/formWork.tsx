import { Box, TextField } from "@mui/material";
// React-Hook-Form
import { useFieldArray, useWatch, useForm } from "react-hook-form";
import bibframe from "@/share/bibframe/work.json"
import BibframeField from "./bibframeField";
import { useEffect, useState } from "react";

// BiblioKeia Components
import ModalThesarusNames from "@/components/thesaurus/modal/modalThesarusNames";
import ModalThesarus from "@/components/thesaurus/modal/modalThesarus";



export default function FormWork() {
    const [thesaurus, setThesaurus] = useState({name:"", open: false});
    const [open, setOpen] = useState(false);
    const [field, setField] = useState("");

    // console.log(bibframe.defaultValues)


    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm(
        {
            // resolver: zodResolver(ZodWork),
            defaultValues: bibframe.defaultValues
        }
    );

    //  useEffect(() => {
    //     console.log(thesaurus)
    //     if (thesaurus === 'names') {
    //         setOpenName(true)

    //     }
    //   }, [thesaurus, openName])



    function CreateWork(data: any) {
        console.log(data)
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(CreateWork)}>
                {bibframe.ontology.map((field, index) => (
                    <BibframeField
                        key={index}
                        metadado={field}
                        control={control} 
                        register={register}
                        setThesaurus={setThesaurus}
                        setField={setField}
                        setValue={setValue}
                        defaultValue={bibframe.defaultValues[`${field.property}`]}
                         />

                ))}
                <button>SALVAR</button>


            </form>
            <ModalThesarusNames
                setOpen={setThesaurus}
                thesaurus={thesaurus}
                defaultValues={bibframe.defaultValues}
                field={field}
                setValue={setValue} />

        </Box>
    )
}