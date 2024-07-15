interface Props {
    type: string[]
}

export default function GetType(params: string[]) {
    let [type] = params.filter((param) => param !== 'Authority')

    // console.log("P:", type)
    return type
}