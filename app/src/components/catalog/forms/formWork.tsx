// "use client"
import { Box, TextField } from "@mui/material";
// React-Hook-Form
import { useFieldArray, useWatch, useForm } from "react-hook-form";
import bibframe from "@/share/bibframe/work.json"
import BibframeField from "./bibframe/bibframeField";
import { useEffect, useState } from "react";

// BiblioKeia Components
import ModalThesarusNames from "@/components/thesaurus/modal/modalThesarus";
import { typeMetadata } from "@/schema/fieldMetadata";

// BiblioKeia Service
import { bkapi } from "@/services/api";
import BfField from "./bibframe/bfField";
import BfSubField from "./bibframe/bfSubField";

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};



export default function FormWork() {
    // const [thesaurus, setThesaurus] = useState({name:"", open: false});
    // const [open, setOpen] = useState(false);
    // const [field, setField] = useState("");
    // console.log("F: ", bibframe.fields)

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

    function CreateWork(data: any) {
        let obj = {
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isPartOf: `https://bibliokeia.com/catalog/work`,
        }

        const request = { ...obj, ...data };
        console.log("R", data)
        // bkapi
        //     .post("/catalog/work/create", request, {
        //         headers: headers,
        //     })
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             console.log("RS", response.data);
        //             request.identifiersLocal = response.data.id
        //             // setWork(request)
        //             // setOpenInstance(true)

        //             // setMessage("Registro criado com sucesso!")
        //             //   router.push(`/admin/authority/names/${response.data.id}`);
        //         }
        //     })
        //     .catch(function (error) {
        //         if (error.response.status === 409) {
        //             // setTypeAlert("error")
        //             // setMessage("Este registro já existe")
        //             console.error("ER:", error);
        //         }
        //     })
        //     .finally(function () {
        //         // setProgress(false)
        //         // setOpenSnack(true)
        //     });
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(CreateWork)}>
                {bibframe.fields.map((field: any, index) => (
                    <BfField
                        key={index}
                        field={field}
                        register={register}
                        control={control}
                        setValue={setValue}
                    />
                ))}
                <button>SALVAR</button>
            </form>
        </Box>
    )
}