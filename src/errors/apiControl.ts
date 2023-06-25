export const apiControl = (result: any) => {
    let data = null
    if(result && result.data){
      data = result.data
    }
    return data
}