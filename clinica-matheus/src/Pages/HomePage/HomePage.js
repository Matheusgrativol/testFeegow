import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Base_URL } from "../../Components/Base_URL/Base_URL";
import { ContainerPai, ContainerSelect, DivNameProf, DivProf, DivProfPai, ImgProf, SelectEspecialidades } from "./styled";

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button';


const HomePage = () => {

    const [spec, setSpec] = useState()
    const [specId, setSpecId] = useState()
    const [profissionais, setProfissionais] = useState([])
    const [sources, setSources] = useState([])
    const history = useHistory()

    useEffect(() => {
        getSpecs()
        getProfi()
        getSources()
    }, [specId])


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
                setProfissionais(res.data.content)
            })
            .catch((err) => {
                alert(err)
            })
    }

    const getSources = () => {
        axios.get(`${Base_URL}/patient/list-sources`)
            .then((res) => {
                setSources(res.data.content)
            })
            .catch((err) => {
                alert(err)
            })
    }

    console.log(profissionais)


    const profs = profissionais.filter((profissional) => {
        if (!specId) {
            return false
        }
        const especialidade = profissional.especialidades.find((especialidade) => {
            return especialidade.especialidade_id == specId
        })
        if (especialidade) {
            return true
        } else {
            return false
        }
    })


    console.log(profs)
    // console.log(prof)
    // console.log(filterEspec)

    // console.log(proficionais)
    console.log(specId)
    const changeId = event => {
        setSpecId(event.target.value)
    };

    const changeSource = (event) => {
        setSources(event.target.value)
    }

    const renderProfs = profs.map((prof) => {
        return (
            <h4>prof.na</h4>
        )
    })

    return (
        <ContainerPai>
            <div>
                <button onClick={goToList}> Lista </button>
            </div>
            <ContainerSelect>
                <h3>Consulta de </h3>
                <SelectEspecialidades onChange={changeId}>
                    <option value={""}>Selecione a especialidade</option>
                    {spec && spec.map((especialidade) => {
                        return (
                            <option key={especialidade.especialidade_id} value={especialidade.especialidade_id}>
                                {especialidade.nome}
                            </option>
                        )
                    })}
                </SelectEspecialidades>
            </ContainerSelect>

            <DivProfPai>
                {profs.map((prof) => {
                    return (
                        <DivProf>
                            <h4> {prof.tratamento} {prof.nome} </h4>
                            <Avatar src={prof.foto} />
                            <p>{prof.documento_conselho}</p>
                            <Button variant="contained" color="success">Agendar</Button>
                        </DivProf>
                    )
                })}
            </DivProfPai>

            <div>
            </div>
        </ContainerPai>
    )
}

export default HomePage