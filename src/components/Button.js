import styled from 'styled-components'

const Button = () => {
    const buttonClick = () => {
        console.log("clicou")
    }
    return (
        <>
            <ButtonSend onClick={buttonClick}>Enviar</ButtonSend>
        </>
    )
}

export default Button

const ButtonSend = styled.button`
    cursor:pointer;
    background-color: #fff;
    box-shadow: 5px 5px #000;
    width: 100px;
    height: 50px;
    border: 2px solid #000;
    border-radius: 2px;
`
