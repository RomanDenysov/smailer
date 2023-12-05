import styled from "styled-components"
import { FaArrowRightToBracket, FaBoltLightning } from "react-icons/fa6"



import { Link, Outlet } from 'react-router-dom'
import Logo from "@common/components/Logo"

const HeaderContainer = styled.div`
	height: 8vh;
	min-height: 3.4rem;
	width: 100%;
	position: sticky;
	top: 0;
	background-color: ${props => props.theme.colors.secondary};
	z-index: 99;
`
const Wrapper = styled.div`
	height: 100%;
	max-width: 1366px;

	margin: auto;
	padding: 1.5rem;

	display: flex;
	align-items: center;
	justify-content: space-between;
`
const NavBox = styled.div`
	height: 100%;
	width: 6rem;

	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1.4rem;

	font-size: 1.4rem;

  	color: ${props => props.theme.colors.text};
`


const Header = () => {
	return (
		<>
			<HeaderContainer>
					<Wrapper>
						<Logo/>
						<NavBox>
							<Link to=''>
								<FaBoltLightning className='icon'/>
							</Link>
							<Link to='' >	
								<FaArrowRightToBracket className='icon'/>
							</Link>
						</NavBox>
					</Wrapper>
			</HeaderContainer>
			
			<Outlet />

		</>
	)
}

export default Header