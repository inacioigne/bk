const RemovePropreites = (obj: any) => {
    // console.log("Dt", obj)
    Object.entries(obj).forEach(function ([chave, valor]) {
        if (typeof valor === 'object') {
            RemovePropreites(valor)
            if (Object.keys(valor).length === 0) {
                delete obj[chave]
            }
        }
        if (valor === "") {
            delete obj[chave]
        }
    })
}

const RemoveEmpty = (obj: any) => {
    Object.entries(obj).forEach(function ([chave, valor]) {
        if (Array.isArray(valor)) {
            valor.forEach(element => {
                RemovePropreites(element)
            })
            if (Object.keys(valor[0]).length === 0) {
                delete obj[chave]
            }
        } else {
            RemovePropreites(valor)
            if (Object.keys(valor).length === 0) {
                delete obj[chave]
            }
        }
    });
}

export default RemoveEmpty