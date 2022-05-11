import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Base_URL } from "../../Components/Base_URL/Base_URL";
import { ContainerPai, ContainerSelect, DivProf, DivProfPai, SelectEspecialidades } from "./styled";

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button';

const HomePage = () => {

    const [spec, setSpec] = useState()
    const [specId, setSpecId] = useState()
    const [profissionais, setProfissionais] = useState([])

    useEffect(() => {
        getSpecs()
        getProfi()
    }, [specId])


    const goToForm = (specialty_id , professional_id) => {
        window.location = `/formPage/${specialty_id}/${professional_id}`
        // history.push(`/formPage/${id}`)
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
        axios.get(`${Base_URL}/professionals/list`)
            .then((res) => {
                setProfissionais(res.data.content)
            })
            .catch((err) => {
                alert(err)
            })
    }

    const profs = profissionais.filter((profissional) => {
        if (!specId) {
            return false
        }
        const especialidade = profissional.especialidades.find((especialidade) => {
            return especialidade.especialidade_id === +specId
        })
        if (especialidade) {
            return true
        } else {
            return false
        }
    })

    const changeId = event => {
        setSpecId(event.target.value)
    };

    return (
        <ContainerPai>
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
                        <DivProf key={prof.profissional_id}>
                            <h4> {prof.tratamento} {prof.nome} </h4>
                            <Avatar alt={prof.nome} sx={{ width: 70, height: 70 }}  src={prof.foto} />
                            <p>CRM {prof.documento_conselho}</p>
                            <Button 
                                onClick={()=>{goToForm(prof.especialidades[0].especialidade_id , prof.profissional_id)}} 
                                variant="contained" color="success">
                                    Agendar
                            </Button>
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