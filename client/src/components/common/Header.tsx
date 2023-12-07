import styled from "styled-components"
import { FormEvent } from "react"
import { FaArrowRightToBracket, FaBoltLightning } from "react-icons/fa6"



import { Link, Outlet, useNavigate } from 'react-router-dom'
import Logo from "@assets/icons/Logo"
import { observer } from "mobx-react-lite"
import { useAuth } from "@providers/AuthContext"

const HeaderContainer = styled.div`
	height: 10vh;
	min-height: 3.4rem;
	width: 100%;
	position: sticky;
	top: 0;
    background-color: ${props => props.theme.colors.primary};
    filter: brightness(1.2) contrast(0.9) saturate(1.2);
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%, #f3f3f3);
      background-size: 0.05em 0.05em;
      opacity: 0.1;
      pointer-events: none;
    }
	z-index: 99;
	box-shadow: 0 0 10px rgba(0,0,0,0.6);
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

	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
`
const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: .2rem;

	font-weight: 600;
	font-size: 1em;
	letter-spacing: -0.01rem;
	line-height: 100%;


	border-radius: 5px;
	padding: 0.4rem;

	color: ${props => props.theme.colors.dark};
	background-color:  ${props => props.theme.colors.secondary};
	box-shadow: 4px 4px 2px rgba(0,0,0,0.6);

	transition: all 0.3s ease-in-out;
	&:hover{
		transform: scale(1.1);
	}
	&:hover .icon{
		color: ${props => props.theme.colors.active};
	}
`


const Header: React.FC = observer(() => {
	const {store} = useAuth();
	const navigate = useNavigate();
	
	const handleLogout = async (e: FormEvent) => {
        e.preventDefault();
        await store.logout();
		navigate('/');
    }


	return (
		<>
		<HeaderContainer>
				<Wrapper>
					<Logo/>
					<NavBox>
						<NavLink to='/premium'>
							premium
							<FaBoltLightning className='icon'/>
						</NavLink>
						<NavLink to='/' onClick={(e)=>handleLogout(e)}>
							logout
							<FaArrowRightToBracket className='icon'/>
						</NavLink>
					</NavBox>
				</Wrapper>
		</HeaderContainer>
		
		<Outlet />

		</>
	)
})

export default Header