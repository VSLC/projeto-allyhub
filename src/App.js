import Input from './components/Input';
import Label from './components/Label';
import Button from './components/Button'

import styled from 'styled-components';

const App = () => {
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
                        <FormContainerIcon>
                            <Title>Destino de interesse</Title>
                            <div>
                                <Input />
                                <ion-icon name="arrow-down-outline"></ion-icon>
                            </div>
                            <div>
                                <Input />
                                <ion-icon name="arrow-down-outline"></ion-icon>
                            </div>
                        </FormContainerIcon>
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