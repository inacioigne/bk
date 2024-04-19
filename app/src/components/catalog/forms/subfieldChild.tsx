import ChildSelectField from "./ChildSelectField";
import BfSelect from "./bibframe/bfSelec";
import BfTextField from "./bibframe/bfTextField";
import mads from "@/share/mads/mads.json"

interface Props {
    subfield: any;
    register: Function;
    index: number | boolean;
    control: any;
    setValue: Function;
    nameField: string;
    // nestIndex: number
    // commonType: any | undefined
    // childs: [any]
}

export default function SubfieldChild(
    { subfield, register, control, setValue, nameField, index }: Props
) {
    // console.log("SubfieldChild", nameField, subfield.name, index)
    

    if (subfield.thesarus) {
        return (
            <h1>SubfieldChild</h1>
        )
    } else {
        if (subfield.type === 'textField') {
            return (
                <BfTextField
                    subfield={subfield}
                    register={register}
                    nameField={nameField}
                    index={index} />
            )
        } else if (subfield.type === 'select') {
            // console.log("select", `${nameField}.${index}.${subfield.name}`)

            return (
                <ChildSelectField
                    subfield={subfield}
                    setValue={setValue}
                    index={index}
                    control={control}
                    nameField={nameField}
                    commonType={mads.commonTypes[`${subfield.commonType}`]}
                />
            )

        }
    }

   
}