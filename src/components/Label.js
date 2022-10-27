import styled from 'styled-components'

const Label = ({ title }) => {
    return (
        <>
            <Paragraph>{title}</Paragraph>
        </>
    );
}

export default Label

const Paragraph = styled.label`
    margin: 5px 0;
    color: #000;
    font-weight: 600;
`