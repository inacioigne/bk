export function RemoveEmptyAuthority(authority: string, data: any) {
    let auth = data[`${authority}`].filter((e: any) => e.term.value !== "")
    if (auth.length > 0) {
        data[`${authority}`] = auth
    } else {
        delete data[`${authority}`]
    }
}