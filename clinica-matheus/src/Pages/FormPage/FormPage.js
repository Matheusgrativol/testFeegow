import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Base_URL } from "../../Components/Base_URL/Base_URL";
import { ContainerForm, Form, H2Form, InputForm, InputFormCpf, SelectForm } from "./styled";
import Button from '@mui/material/Button';


const ListPage = () => {

    const [sources, setSources] = useState([])
    const [sourceId, setSourceId] = useState("")
    const [nameUser, setNameUser] = useState("")
    const [birthdateUser, setBirthdateUser] = useState("")
    const [cpfUser, setCpfUser] = useState("")
    const [spec, setSpec] = useState()
    const [profissionais, setProfissionais] = useState()


    let id = useParams()

    useEffect(() => {
        getSources()
        getSpecs()
        getProfi()
    }, [])

    const changeSource = event => {
        setSourceId(event.target.value)
    };

    const changeName = event => {
        setNameUser(event.target.value)
    };

    const changeBirthdate = event => {
        setBirthdateUser(event.target.value)
    };

    const changeCpf = event => {
        setCpfUser(event.target.value)
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


    const getProfissional = (id)=>{
        const profiFind = profissionais.find((prof)=>{
            return +prof.profissional_id === +id
            
        })
        return profiFind?.nome
    }

    const getEspecialidade = (id)=>{
        const specFind = spec.find((name)=>{
            return +name.especialidade_id === +id
        })
        return specFind?.nome
    }

    const getStorage = () => {
        return JSON.parse(localStorage.getItem("dado")) || []
    }

    
    const saveForm = (event) => {
        event.preventDefault()
        const formUser = {
            specialty_id: id.specialty_id,
            professional_id: id.professional_id,
            name: nameUser,
            cpf: cpfUser,
            source_id: sourceId,
            birthdate: birthdateUser,
            date_time: new Date().toISOString()
        }
        if (!formUser.name || !formUser.cpf || !formUser.source_id || !formUser.birthdate) {
            return alert("Preencha os campos corretamente")
        }
        const storages = getStorage()
        storages.push(formUser)
        localStorage.setItem("dado", `${JSON.stringify(storages)}`)
    }

    const localList = getStorage()

    const getSource = (id)=>{
        const sourceFind = sources.find((source)=>{
            return +source.origem_id === +id
        })
        return sourceFind?.nome_origem
    }

    return (
        <div>
            <div>
                <H2Form>Preencha seus dados</H2Form>
                <Form onSubmit={saveForm}>
                    <InputForm
                        onChange={changeName}
                        value={nameUser}
                        placeholder="Nome completo"
                        type={"text"}
                    />
                    <SelectForm onChange={changeSource}>
                        <option disabled selected value={""}>Como conheceu?</option>
                        {sources.map((source) => {
                            return (
                                <option key={source.origem_id} value={source.origem_id}>
                                    {source.nome_origem}
                                </option>
                            )
                        })}
                    </SelectForm>
                    <InputForm
                        onChange={changeBirthdate}
                        value={birthdateUser}
                        placeholder="Nascimento"
                        type={"date"}
                    />
                    <InputFormCpf
                        onChange={changeCpf}
                        value={cpfUser}
                        placeholder="CPF"
                        type={"number"}
                    />
                    <Button onClick={saveForm} variant="contained" color="success">SOLICITAR HORÁRIOS</Button>
                </Form>
            </div>

            <ContainerForm>
                {!localList.length? <p>Não existe consulta agendada</p> : 
                <table border="1">
                    <tr>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>CPF</th>
                        <th>Especialidade</th>
                        <th>Profissional</th>
                        <th>Origem</th>
                    </tr>
                    <tbody>
                        {profissionais && spec && localList.map((user) => {
                            return (
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.birthdate}</td>
                                    <td>{user.cpf}</td>
                                    <td>{getEspecialidade(user.specialty_id)}</td>
                                    <td>{getProfissional(user.professional_id)}</td>
                                    <td>{getSource(user.source_id)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
            </ContainerForm>
        </div>
    )
}

export default ListPage