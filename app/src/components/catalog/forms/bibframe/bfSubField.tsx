import FieldChild from "../fieldChild";
import BfModal from "./bfModal";
import BfSelect from "./bfSelec";
import BfTextArea from "./bfTextArea";
import BfTextField from "./bfTextField";
import BfTextfieldThesarus from "./bfTextfieldThesarus";

interface Props {
    subfield: any;
    register: Function;
    index: number | boolean;
    control: any;
    setValue: Function;
    name: string;
    commonType: any | undefined
}

export default function BfSubField(
    { subfield, register, index, control, setValue, name, commonType }: Props
) {
    

    if (subfield.thesarus) {
        // console.log("T: ", subfield)
        return (
            <BfTextfieldThesarus
                name={name}
                control={control}
                subfield={subfield}
                register={register}
                index={index}
                setValue={setValue}
            />
        )
    } else {
        if (subfield.type === 'select') {
            return (
                <BfSelect
                    subfield={subfield}
                    setValue={setValue}
                    index={index}
                    control={control}
                    nameField={name}
                    commonType={commonType} 
                 />
            )
        } else if (subfield.type === 'textField') {
            return (
                <BfTextField
                    subfield={subfield}
                    register={register}
                    nameField={name}
                    index={index} />
            )
        } else if (subfield.type === 'textArea') {
            return (
                <BfTextArea
                    subfield={subfield}
                    register={register}
                    name={name}
                    index={index} />
            )
        } else if (subfield.type === 'fieldChild') {
            // console.log("fieldChild", index)

            return (
                <FieldChild
                    subfield={subfield}
                    register={register}
                    control={control}
                    setValue={setValue}
                    nameField={name}
                    nestIndex={index}
                />

            )

        }
    }
}