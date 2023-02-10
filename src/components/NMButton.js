
import Button from "react-bootstrap/Button"
import styled from "styled-components"

// styled component to change the default bootstrap button
const NMButton = styled(Button)`
    background-color: #00ADB5!important;
    border: none;
    &:hover {
        background-color: #393E46!important;
    };
    &:active {
        background-color: #393E46!important;
    };
`



export default NMButton