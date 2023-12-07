import styled, { css } from "styled-components"

import { Link } from 'react-router-dom'
import { observer } from "mobx-react-lite"


const InfoContainer = styled.div`
	min-height: 100vh;
	max-width: 1366px;

	margin: auto;
	padding: 2rem;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	z-index: 1;
	`
const InfoBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 2em;
	letter-spacing: 0.01rem;
	line-height: 1.5;
	font-weight: 400;
	text-align: center;
	margin-bottom: 5rem;
	`
const InfoButton = styled(Link)<InfoButtonProps>`
	width: calc((100% / 4));
	height: 4rem;
	border: none;
	border-radius: 10px;
	
	display: flex;
	align-items: center;
	justify-content: center;
	
	font-size: 2em;
	font-weight: 600;
	color: ${props => props.theme.colors.secondary};
	
	transition: all 0.3s ease;
	
	box-shadow: 2px 2px 10px rgba(0,0,0,0.6);
	
	${props => props.primary && css`
	background-color: ${props => props.theme.colors.primary};
	`}
	${props => props.outlined && css`
	background-color: ${props => props.theme.colors.background};
	border: 2px solid ${props => props.theme.colors.dark};
	color: ${props => props.theme.colors.primary};
	`}
	
	&:focus {
		outline: none;
	}
	z-index: 1;
	&:hover {
		transform: scale(1.1)
	}
	`
interface InfoButtonProps {
	primary?: boolean;
	outlined?: boolean;
  }

const InfoPage = observer(() => {
	return (
		<InfoContainer>
			<InfoBox>
			Discover our user-friendly URL shortening service! Easily create concise links, manage them effortlessly, and track clicks with our intuitive interface. 
			Enjoy streamlined link management – happy shortening!
			</InfoBox>
			<InfoButton to='/register' primary>Sign Up</InfoButton>
			<InfoButton to='/login' outlined>Log In</InfoButton>
		</InfoContainer>
	)
})

export default InfoPage