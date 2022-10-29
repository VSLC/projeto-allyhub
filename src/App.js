import Label from './components/Label';

import styled from 'styled-components';
import Select from 'react-select';
import { useState, useEffect } from 'react';

import axios from 'axios';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([])
    const [getCountries, setGetCountries] = useState([])
    const [getCities, setGetCities] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')

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

    console.log(getCountries, 'countries');
    console.log(getCities, 'cities');

    const optionsCountry = getCountries.map((e) => {
        return {
            value: e.name_ptbr,
            label: e.name_ptbr,
            countryCode: e.code
        }
    })

    const countriesCode = countries.map((element) => element.countryCode);
    console.log(countriesCode, "countriesCode");

    const optionsCities = getCities.filter((element) => countriesCode.includes(element.country_code)).map((e) => {
        return {
            value: e.name,
            label: e.name
        }
    });

    const handleSubmit = () => {
        const formObject = { name: name, email: email, phone: phone, cpf: cpf, countries: countries, cities: cities };
        console.log(formObject);
    }

    return (
        <>
            <Container>
                <ContainerContent>
                    <FormDiv>
                        <FormContainer>
                            <Title>Dados Pessoais</Title>
                            <form>
                                <Label title="name" />
                                <InputForm onChange={(e) => setName(e.target.value)} required></InputForm>
                                <Label title="email" />
                                <InputForm onChange={(e) => setEmail(e.target.value)} required></InputForm>
                                <Label title="phone" />
                                <InputForm onChange={(e) => setPhone(e.target.value)} required></InputForm>
                                <Label title="cpf" />
                                <InputForm onChange={(e) => setCpf(e.target.value)} required></InputForm>
                            </form>
                        </FormContainer>
                    </FormDiv>
                    <FormDiv>
                        <Title>Destino de interesse</Title>
                        <Select className='multi-select' isMulti options={optionsCountry} onChange={(element) => setCountries(element)} required />
                        <Select className='multi-select' isMulti options={optionsCities} onChange={(element) => setCities(element)} required />
                    </FormDiv>
                </ContainerContent>
                <ButtonSend onClick={handleSubmit}>Enviar</ButtonSend>
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


const InputForm = styled.input`
    height: 25px;
    width: 300px;
    margin-bottom: 20px;

`

const ButtonSend = styled.button`
    cursor:pointer;
    background-color: #fff;
    box-shadow: 5px 5px #000;
    width: 100px;
    height: 50px;
    border: 2px solid #000;
    border-radius: 2px;
`