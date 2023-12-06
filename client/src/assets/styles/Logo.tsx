import styled from 'styled-components'
import { FaFaceLaugh } from "react-icons/fa6"

const StyledLogo = styled.button`
    width: 2rem;
    height: 2rem;
    
    text-decoration: none;

    border: none;
    border-radius: 50%;

    color: ${props => props.theme.colors.secondary};

    background-color: ${props => props.theme.colors.text};

    font-size: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:active {
      background-color: ${props => props.theme.colors.button};
    }
`

export default function Logo() {
  return (
    <StyledLogo>
        <FaFaceLaugh className='icon'/>
    </StyledLogo>
  )
}
