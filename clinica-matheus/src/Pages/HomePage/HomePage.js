import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Base_URL } from "../../Components/Base_URL/Base_URL";
import { ContainerPai, ContainerSelect, SelectEspecialidades } from "./styled";
const HomePage = () => {

    const [spec, setSpec] = useState()
    const [specName, setSpecName] = useState()
    const [proficionais, setProficionais] = useState([])
    // const [mapProficionais, setMapProficionais] = useState()
    const history = useHistory()

    useEffect(() => {
        getSpecs()
        getProfi()
    }, [specName])


    const goToList = () => {
        history.push("/listPage")
    }

    const getSpecs = () => {
        axios.get(`${Base_URL}/specialties/list`)
            .then((res) => {
                setSpec(res.data.content)
            })
            .catch((err) => {
                alert(err)
            })
    }

    const getProfi = () => {
        axios.get(`${Base_URL}/professional/list`)
            .then((res) => {
                setProficionais(res.data.content)
            })
            .catch((err) => {
                alert(err)
            })
    }

    const prof = proficionais.map((proficionais) => {
        return (
            proficionais.especialidades
        )
    })

    console.log(prof)
    // console.log(prof)
    // console.log(filterEspec)

    // console.log(proficionais)
    // console.log(specName)
    const changeName = event => {
        setSpecName(event.target.value)
    };


    
    return (
        <ContainerPai>
            <div>
                <button onClick={goToList}> Lista </button>
            </div>
            <ContainerSelect>
                <h3>Consulta de </h3>
                <SelectEspecialidades onChange={changeName} placeholder={"Selecione a especialidade"}>
                    {spec && spec.map((especialidade) => {
                        return (
                            <option key={especialidade.especialidade_id} value={especialidade.especialidade_id}>
                                {especialidade.nome}
                            </option>
                        )
                    })}
                </SelectEspecialidades>
            </ContainerSelect>

            <h1>HomePage</h1>
        </ContainerPai>
    )
}

export default HomePage