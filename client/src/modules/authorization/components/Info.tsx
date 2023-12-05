import styled, { css } from "styled-components"

import { Link } from 'react-router-dom'

interface InfoButtonProps {
	primary?: boolean;
	outlined?: boolean;
  }

const InfoContainer = styled.div`
	height: 90vh;
	width: 100%;

	background-color: ${props => props.theme.colors.primary};

	margin: auto;

	padding: 2rem;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	gap: 2rem;
`
const InfoBox = styled.div`
	flex: 2;

	display: flex;
	align-items: center;
	justify-content: center;

	text-align: center;
`
const InfoButton = styled(Link)<InfoButtonProps>`
	width: 12rem;
	height: 4rem;

	border: none;
	
	border-radius: 50px;
	
	font-size: 1.2rem;
	font-weight: 600;
	color: ${props => props.theme.colors.textblack};

	${props => props.primary && css`
		background-color: ${props => props.theme.colors.text};
	`}
	${props => props.outlined && css`
  		border: 2px solid ${props => props.theme.colors.text};
		background-color: transparent;
		color: ${props => props.theme.colors.text};
	`}

	&:focus {
		outline: none;
	}
`

const InfoPage = () => {
	return (
		<InfoContainer>

			<InfoBox>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit esse odio aliquid dolores, porro maxime cupiditate inventore quis consequuntur beatae accusamus explicabo quisquam veritatis! Fugit quo nisi autem nobis dignissimos?
			</InfoBox>
			<InfoButton to='/register' primary>Sign Up</InfoButton>
			<InfoButton to='/login' outlined>Log In</InfoButton>
		</InfoContainer>
	)
}

export default InfoPage