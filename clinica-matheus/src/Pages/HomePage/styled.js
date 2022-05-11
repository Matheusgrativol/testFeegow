import styled from "styled-components"

export const SelectEspecialidades = styled.select`
    border-radius: 5px;
    border: solid #2b4fe273;
    color: blueviolet;
    text-align: center;
    margin: 10px;
    padding: 10px;
    font-size: 15px;
`

export const ContainerPai = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const ContainerSelect = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 5px;
`

export const ImgProf = styled.img`
    width: 50px;
    margin: 10px;
`

export const DivProf = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: solid #2b4fe273;
    border-radius: 10px;
    box-shadow: 4px 4px 4px silver;
    margin: 20px;
    padding: 10px;
`

export const DivProfPai = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
`