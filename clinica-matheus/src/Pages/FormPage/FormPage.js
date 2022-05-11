import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Base_URL } from "../../Components/Base_URL/Base_URL";
import { Form, InputForm } from "./styled";

const ListPage = () =>{

    const [sources , setSources] = useState([])
    const [sourceId , setSourceId] = useState([])
    const history = useHistory()

    let id = useParams()
    
    const goToBack = () =>{
        history.goBack()
    }

    useEffect(()=>{
        getSources()
    }, [])
    
    const changeSource = event => {
        setSourceId(event.target.value)
    };

    const getSources = () => {
        axios.get(`${Base_URL}/patient/list-sources`)
            .then((res) => {
                setSources(res.data.content)
            })
            .catch((err) => {
                alert(err)
            })
    }

    return(
        <div>
            <div>
                <button onClick={goToBack}>Voltar</button>
            </div>
            <div>
                <Form>
                    <InputForm placeholder="Nome completo" type={"text"}/>
                    <select onChange={changeSource}>
                        <option value={""}>Como conheceu?</option>
                        {sources.map((source) => {
                        return (
                            <option key={source.origem_id} value={source.origem_id}>
                                {source.nome_origem}
                            </option>
                        )
                    })}
                    </select>
                    <InputForm placeholder="Nascimento" type={"date"}/>
                    <InputForm placeholder="CPF" type={"number"}/>
                    <button>SOLICITAR HORÁRIOS</button>
                </Form>
            </div>

            <h1>ListPage</h1>
        </div>
    )
}

export default ListPage