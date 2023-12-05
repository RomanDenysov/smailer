import styled from "styled-components"
import {  FaChartSimple, FaListUl, FaUser } from "react-icons/fa6"
import { Link } from 'react-router-dom'


const FooterContainer = styled.div`
    height: 6vh;
    min-height: 3.2rem;
    width: 100%;
    background-color: ${props => props.theme.colors.secondary};
    position: sticky;
    bottom: 0;
`
const Wrapper = styled.div`
    height: 100%;
	max-width: 1366px;

	margin: auto;
	padding: 1rem;

	display: flex;
	align-items: center;
	justify-content: space-around;
	
`
const LinkButton = styled(Link)`
    width: 3rem;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.4rem;
`

const Footer = () => {
  return (
    <FooterContainer>
        <Wrapper>
            <LinkButton to='/'>
                <FaListUl className='icon'/>
            </LinkButton>
            <LinkButton to='/'>
                <FaChartSimple className='icon'/>
            </LinkButton>
            <LinkButton to=''>
                <FaUser className='icon'/>
            </LinkButton>
        </Wrapper>
    </FooterContainer>
  )
}

export default Footer