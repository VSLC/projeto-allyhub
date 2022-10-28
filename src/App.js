import Input from './components/Input';
import Label from './components/Label';
import Button from './components/Button'

import styled from 'styled-components';
import Select from 'react-select';
import { useState, useEffect } from 'react';

import axios from 'axios';
import e from 'cors';

const App = () => {
    const [countries, setCountries] = useState({});
    const [cities, setCities] = useState({})
    const [getCountries, setGetCountries] = useState([])
    const [getCities, setGetCities] = useState([])

    console.log("countries", countries);
    console.log("cities", cities);


    useEffect(() => {
        const countriesGet = axios.get('https://amazon-api.sellead.com/country');
        const optionsCountries = countriesGet.then((response) => setGetCountries(response.data)).catch((error) => { console.log(error) });
    }, []);

    useEffect(() => {
        const citiesGet = axios.get('https://amazon-api.sellead.com/city');
        const optionsCountries = citiesGet.then((response) => setGetCities(response.data)).catch((error) => { console.log(error) });
    }, []);

    console.log("getCitiesList", getCities);

    const optionsCountry = getCountries.map((e) => {
        return {
            value: e.name_ptbr,
            label: e.name_ptbr
        }
    })

    const optionsCities = getCities.map((e) => {
        return {
            value: e.name,
            label: e.name
        }
    })

    return (
        <>
            <Container>
                <ContainerContent>
                    <FormDiv>
                        <FormContainer>
                            <Title>Dados Pessoais</Title>
                            <form>
                                <Label title="name" />
                                <Input />
                                <Label title="email" />
                                <Input />
                                <Label title="telefone" />
                                <Input />
                                <Label title="cpf" />
                                <Input />
                            </form>
                        </FormContainer>
                    </FormDiv>
                    <FormDiv>
                        <Title>Destino de interesse</Title>
                        <Select className='multi-select' isMulti options={optionsCountry} onChange={(element) => setCountries(element)} />
                        <Select className='multi-select' isMulti options={optionsCities} onChange={(element) => setCities(element)} />
                    </FormDiv>
                </ContainerContent>
                <Button />
            </Container>
        </>
    );
}

export default App


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color:#fff;
    width: 100vw;
    height: 100vh;
`;

const ContainerContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color:#fff;
`;

const Title = styled.div`
    padding: 20px 0;
    text-align: center;
    font-size: 20px;
    color: #000;

`

const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border: 3px solid #000;
    border-radius: 5px;
    width: 400px;
    height: 500px;
    form {
        display: flex;
        flex-direction: column;
        input {
            margin-top: 5px;
            margin-bottom: 20px;
        }
    }
    .multi-select{
        width: 300px;
        margin-top: 20px;
    }
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const FormContainerIcon = styled.div`
    display: flex;
    flex-direction: column;
    div {
        position: relative;
    }
    ion-icon{
        cursor:pointer;
        margin-top: 5px;
        font-size: 20px;
        position:absolute;
        right: 10px;
        top: 0px;
    }

`;