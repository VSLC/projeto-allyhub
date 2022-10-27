import styled from 'styled-components'
import { useState } from 'react'

const Input = () => {
    const [field, setField] = useState('');
    console.log(field);

    return (
        <>
            <InputForm onChange={(e) => setField(e.target.value)} ></InputForm>
        </>
    );
}

export default Input


const InputForm = styled.input`
    height: 25px;
    width: 300px;
    margin-bottom: 20px;

`



