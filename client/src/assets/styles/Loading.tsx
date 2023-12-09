import { useEffect, useState } from "react"
import { FaRocket } from "react-icons/fa6"
import styled, {keyframes} from "styled-components"

const SwingAnimation = keyframes`
	from, 20%, 53%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transform: translate3d(0,0,0) rotate(-45deg);
    }

    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -30px, 0) rotate(-40deg);
    }

    70% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -15px, 0) rotate(-50deg);
    }

    90% {
      transform: translate3d(0,-4px,0) rotate(-40deg);
    }
`

const LoadingContainer = styled.div`
	width: 100%;
	min-height: 90vh;
	display: flex;
	align-items: center;
	justify-content: center;
`
const LoadingBox = styled.div`
	width: 100%;
	height: 100%;
	margin: auto;
	
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	position: relative;
`
const LoadingCounter = styled.h1`
	font-size: 5em;
	font-weight: 900;
	font-family: 'Bungee Inline', sans-serif;
	color: ${props => props.theme.colors.dark};

	z-index: 2;

	line-height: 100%;

	text-shadow: 4px 4px 2px rgba(0,0,0,0.3);
`
const LoadingLogo = styled.div`


	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	align-items: center;
	background: none;
	transition: all 0.5s ease-in-out;
	color: ${props => props.theme.colors.active};
	filter: drop-shadow(4px 5px 2px rgba(0,0,0,0.6));
	font-size: 6em;
	transform: translateY(0) rotate(-45deg);
	animation: ${SwingAnimation} 1s infinite alternate forwards;
	&:hover {
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



const Loading = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => {
			if (prevCount < 100) {
				return prevCount + 1;
			} else {
				clearInterval(interval);
				return prevCount;
			}
			});
		}, 10);
			return () => clearInterval(interval);
	}, []);


	return (
		<LoadingContainer>
				<LoadingBox>
						<LoadingCounter>{count}%</LoadingCounter>
						<LoadingLogo><FaRocket/></LoadingLogo>
				</LoadingBox>
		</LoadingContainer>
	)
}

export default Loading