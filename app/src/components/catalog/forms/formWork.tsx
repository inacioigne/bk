import { Box, TextField } from "@mui/material";
// React-Hook-Form
import { useFieldArray, useWatch, useForm } from "react-hook-form";
import bibframe from "@/share/bibframe/work.json"
import Field from "./field";



export default function FormWork() {

    const defaultValues = bibframe.map((e) =>  {
        const obj = { [e._class]: [{label:""}]}
        return obj
        
      })
      console.log(defaultValues)
    

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
                defaultValues
            }
        );

    

    function CreateWork(data: any) {
        console.log(data)
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(CreateWork)}>
                {bibframe.map((field, index) => (
                    <Field key={index} field={field} control={control} register={register} />
                    // <Box key={index}>
                    //     <TextField
                    //         id="outlined-basic"
                    //         label={field.label}
                    //         variant="outlined"
                    //         {...register(`contribution.${index}.label`)}
                    //     />
                    // </Box>
                ))}
                <button>SALVAR</button>


            </form>

        </Box>
    )
}