function RemoveNull(obj: any) {
  const formData = Object.keys(obj).reduce((acc: any, key) => {
    // console.log(acc);
    if (obj[key] !== "") {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
  return formData;
}

export function ParserData(data: any) {
  let formData = RemoveNull(data);

  return formData;
}
