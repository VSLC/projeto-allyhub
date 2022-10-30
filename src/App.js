import Label from './components/Label';

import styled from 'styled-components';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import axios from 'axios';

import { mask, unMask } from 'remask'

const App = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [getCountries, setGetCountries] = useState([]);
    const [getCities, setGetCities] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [isValid, setIsValid] = useState(false);
    console.log(isValid, "isValid initial")

    const schema = yup.object().shape({
        name: yup.string().min(2).required(),
        email: yup.string().email().required(),
        phone: yup.string().min(10).max(11).required(),
        cpf: yup.string().min(11).max(11).required()
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        const countriesGet = axios.get('https://amazon-api.sellead.com/country');
        const optionsCountries = countriesGet.then((response) => setGetCountries(response.data)).catch((error) => { console.log(error) });
    }, []);

    useEffect(() => {
        const citiesGet = axios.get('https://amazon-api.sellead.com/city');
        const optionsCountries = citiesGet.then((response) => setGetCities(response.data)).catch((error) => { console.log(error) });
    }, []);


    const optionsCountry = getCountries.map((e) => {
        return {
            value: e.name_ptbr,
            label: e.name_ptbr,
            countryCode: e.code
        }
    })

    const countriesCode = countries.map((element) => element.countryCode);
    console.log(countriesCode, "countriesCode");


    useEffect(() => {
        setIsValid(cities.length !== 0 ? true : false);
    }, [cities])

    const optionsCities = getCities.filter((element) => countriesCode.includes(element.country_code)).map((e) => {
        return {
            value: e.name,
            label: e.name
        }
    });

    const onSubmit = (data, event) => {
        const object = { ...data, countries: countries, cities: cities }
        console.log(object);
    };

    console.log(isValid, "is valid")

    return (
        <>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ContainerContent>
                        <FormDiv>
                            <FormContainer>
                                <Title>Dados Pessoais</Title>

                                <Label title="name" />
                                <InputForm onChange={(e) => setName(e.target.value)} name="name" {...register("name")}></InputForm>
                                <p>{errors.name?.message}</p>

                                <Label title="email" />
                                <InputForm onChange={(e) => setEmail(e.target.value)} name="email" {...register("email")}></InputForm>
                                <p>{errors.email?.message}</p>

                                <Label title="phone" />
                                <InputForm onChange={(e) => setPhone(mask(unMask(e.target.value), '(31) 9 9999-9999'))} name="phone" {...register("phone")}></InputForm>
                                <p>{errors.phone?.message}</p>

                                <Label title="cpf" />
                                <InputForm onChange={(e) => setCpf(e.target.value)} name="cpf" {...register("cpf")}></InputForm>
                                <p>{errors.cpf?.message}</p>

                            </FormContainer>
                        </FormDiv>
                        <FormDiv>
                            <Title>Destino de interesse</Title>
                            <Select className='multi-select' isMulti options={optionsCountry} onChange={(element) => setCountries(element)} />
                            <Select className='multi-select' isMulti options={optionsCities} onChange={(element) => setCities(element)} />
                        </FormDiv>
                    </ContainerContent>
                    <div className='button'>
                        <ButtonSend disabled={!isValid} type="submit">Enviar</ButtonSend>
                    </div>
                </form>
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
    .button{
        display: flex;
        justify-content: center;
        }
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
    p{
        color: red;
        font-size: 15px;
        margin-top: -10px;
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
    margin-top: 20px;
`