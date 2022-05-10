import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ListPage = () =>{

    const history = useHistory()

    const goToBack = () =>{
        history.goBack()
    }

    useEffect(()=>{

    }, [])
    
    return(
        <div>
            <div>
                <button onClick={goToBack}>Voltar</button>
            </div>
            <h1>ListPage</h1>
        </div>
    )
}

export default ListPage