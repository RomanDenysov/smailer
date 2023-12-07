import styled, {keyframes} from 'styled-components'
import { FaRocket  } from "react-icons/fa6"

const StyledLogo = styled.span`
	color: ${props => props.theme.colors.white};
	background-color: transparent;
	font-family: 'Bungee Inline', sans-serif;
	font-size: 2.5em;
	line-height: 100%;
	letter-spacing: -0.05em;

	padding: 0.2rem;

	text-shadow: 4px 4px 2px rgba(0,0,0,0.6);

	cursor: pointer;

	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.1rem;
	transition: all 0.5s ease-in-out;
	.icon {
		background: none;
		transition: all 0.5s ease-in-out;
		color: ${props => props.theme.colors.white};
		filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.6));
		font-size: 1em;
	}
	&:hover .icon {
		color: ${props => props.theme.colors.active};
		animation: ${keyframes`
		0% {
		opacity: 0.9;
		transform: translateY(0) rotate(-45deg);
		}
		50% {
			transform: translateY(-0.5rem) rotate(-45deg);
		}
		100% {
			transform: translateY(-10rem) rotate(-45deg);
		}
	`} 1s ease-in-out forwards;
	}
`

export default function Logo() {
	return (
		<StyledLogo>
				PROPEL<FaRocket className='icon'/>NK
		</StyledLogo>
	)
}
