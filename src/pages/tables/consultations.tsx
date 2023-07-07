import { useEffect, Fragment } from "react"

type childrenProps = {
    dataList: any[]
}

const Consultations = ({ dataList }: childrenProps) => {

    useEffect(() => {
        if(dataList && dataList.length && dataList.length > 0){
            console.log(dataList)
        }
    }, [dataList])
    


    return (

        <Fragment>
            {
                
            }
            <div>Consultations</div>
        </Fragment>

    )
}

export default Consultations