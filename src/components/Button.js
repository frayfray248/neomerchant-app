import styled from 'styled-components';

const StyledButton = styled.button`
    background: none;
    color: ${props => props.color};
    border: 2px solid ${props => props.color};
    border-radius: 5px;
    padding: 3px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    transition: color 0.2s ease-in-out;

    ${props => props.hoverColor ?
        `&:hover {
            color: ${props.hoverColor};
            border: 2px solid ${props.hoverColor};
        }`
        :
        ""
    }
`

export default StyledButton