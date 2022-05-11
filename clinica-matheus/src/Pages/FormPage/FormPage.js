import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Base_URL } from "../../Components/Base_URL/Base_URL";
import { Form, H2Form, InputForm, InputFormCpf, SelectForm } from "./styled";
import Button from '@mui/material/Button';


const ListPage = () => {

    const [sources, setSources] = useState([])
    const [sourceId, setSourceId] = useState("")
    const [nameUser, setNameUser] = useState("")
    const [birthdateUser, setBirthdateUser] = useState("")
    const [cpfUser, setCpfUser] = useState("")
    // const [formStorage , setFormStorage] = useState([])

    let id = useParams()

    useEffect(() => {
        getSources()
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
        if(!formUser.name || !formUser.cpf || !formUser.source_id || !formUser.birthdate){
            return alert("Preencha os campos corretamente")
        }
        const storages = getStorage()
        storages.push(formUser)
        localStorage.setItem("dado", `${JSON.stringify(storages)}`)
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
                    <SelectForm onChange={changeSource} required>
                        <option value={""}>Como conheceu?</option>
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

            <div>

            </div>
        </div>
    )
}

export default ListPage