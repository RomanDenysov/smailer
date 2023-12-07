import React, { useEffect, useState } from "react";
import styled, {css, keyframes} from "styled-components";
import {observer} from 'mobx-react-lite'
import URLStore from "@store/URLStore"
import { FaLink, FaTrash, FaCopy, FaLocationCrosshairs, FaCode } from "react-icons/fa6"

interface ActiveItemType {
	activeItem: boolean;
}

const ListItem = styled.ul<ActiveItemType>`
	width: calc((100% / 2) - 0.34rem);
	height: 6rem;
		background-color: ${props => props.theme.colors.yellow};
	&:nth-child(2n) {
		background-color: ${props => props.theme.colors.blue};
	}
	&:nth-child(3n) {
		background-color: ${props => props.theme.colors.pink};
	}
	transition: all 0.3s ease-in-out;
	border-radius: 5px;
	${props => props.activeItem && css`
		border: 3px solid ${props => props.theme.colors.text};
		transform: scale(1.1);
		&::after{
			content: '';
			opacity: 0;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: -1.6rem;
			border: 1.5rem solid transparent;
			border-bottom: 1.5rem solid ${props => props.theme.colors.secondary};
			transform: translateY(-1rem);
			animation: ${keyframes`
			to {
			opacity: 1;
			transform: translateY(0);
			}
		`} 0.2s ease-in-out forwards;
		}
	`}
	&:hover {
		transform: scale(1.1);
		border: 3px solid ${props => props.theme.colors.text};
		z-index: 3;
	}
	z-index: 2;
`
const URLItemCard = styled.div<ActiveItemType>`
	width: 100%;
	height: 100%;
	
	padding: 1rem;

	position: relative;

	cursor: pointer;

	font-size: 1em;

	${props => props.activeItem && css`
	`}

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	transition: all 0.3s ease-in-out;
`

const ItemIcon = styled.div`
	position: absolute;
	top: 0.5rem;
	left: 0.3rem;
	width: 1.3em;
	height: 1.3em;

	border-radius: 50%;

	background-color: ${props => props.theme.colors.text};
	color: ${props => props.theme.colors.textblack};

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 1.2em;
`
const ItemTitle = styled.h3`
	font-size: 1em;
	font-weight: 600;
	line-height: 100%;
	letter-spacing: -0.01rem;
`
const TextCopy = styled.button`
	position: absolute;
	top: 0.3em;
	right: 0.25em;
	border: none;
	background-color: transparent;
	color: ${props => props.theme.colors.text};
	
	width: 1.5em;
	height: 1.5em;
	border-radius: 50%;

	cursor: copy;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 1.3em;
	&:active {
		color: lightgreen;
		background-color:green;
	}
`

const ItemBox = styled.div<ActiveItemType>`
	opacity: 0;
	z-index: 2;

	transition: all 0.3 ease-in-out;

	${props => props.activeItem && css`
		margin-top: 1rem;
		width: 100%;
		height: 12rem;
    	transform: translateY(-20px);
    	animation: ${keyframes`
    	to {
		opacity: 1;
		transform: translateY(0);
		}
  `		} 0.3s ease-in-out forwards;
	`}
	background-color: ${props => props.theme.colors.secondary};
	color: ${props => props.theme.colors.text};

	flex-direction: column;

	border-radius: 5px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	position: relative;
`
const ItemDelete = styled.button`
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	width: 1.8em;
	height: 1.8em;
	border: none;

	border-radius: 50%;

	background-color: ${props => props.theme.colors.text};
	color: ${props => props.theme.colors.textblack};

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 1.2em;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	&:hover {
		background-color: ${props => props.theme.colors.active};
		transform: scale(1.1);
	}
`
const ItemDescr = styled.span`
	background-color: ${props => props.theme.colors.primary};
	padding-right: 0.8rem ;
	border: 2px solid ${props => props.theme.colors.text};
	
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.8rem;
	
	font-size: 1.2em;
	.descr-icon {
		height: 100%;
		border-radius: 0;
		padding: 0.2rem;
		font-size: 2em;
		background-color: ${props => props.theme.colors.text};
		color: ${props => props.theme.colors.textblack};
	}
`
const ItemCounter = styled.span`
	background-color: ${props => props.theme.colors.primary};
	border-radius: 5px;
	padding-right: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 0.8rem;
	font-size: 1.8em;

	border: 2px solid ${props => props.theme.colors.text};

	user-select: none;
	.count-icon {
		height: 100%;
		font-size: 1.2em;
		padding: 0.4rem;
		background-color: ${props => props.theme.colors.text};
		color: ${props => props.theme.colors.textblack};
	}
`
const CloseButton = styled.button`
	position: absolute;
	right: 1rem;
	top: 1rem;
	width: 2.5em;
	height: 2.5em;
	border: none;
	background-color: transparent;
	transition: all 0.3s ease-in-out;
	border-radius: 50%;

	cursor: pointer;

	&::before{
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		height: 3px;
		width: 80%;
		background-color: ${props => props.theme.colors.text};
	}
	&::after{
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(135deg);
		height: 3px;
		width: 80%;
		background-color: ${props => props.theme.colors.text};
	}

	&:hover {
		background-color: ${props => props.theme.colors.active};
		transform: scale(1.1);
	}
`

const URLItem: React.FC<{urlStore: URLStore}> = observer(( {urlStore} ) => {
	const [isMounted, setIsMounted] = useState(false);
	const [activeItem, setActiveItem] = useState<string | null>(null);

	const handleActivator = (_id: string) => {
		setActiveItem(_id === activeItem ? null : _id);
	}
	const handleClose = () => {
		setActiveItem(null)
	}
	const handleCopyTitle = (title: string, event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation(); // Предотвращаем всплытие события
		navigator.clipboard.writeText(title)
	};
	const handleDelete = async (id: string) => {
		try {
		  await urlStore.deleteURL(id);

		  urlStore.setURLs(urlStore.urls.filter(url => url._id !== id));
		} catch (error) {
		  console.error('Error deleting URL:', error);

		}
	  };


	useEffect(() => {
	  setIsMounted(true);
  
	  if (isMounted) {
		urlStore.getURLs();
	  }
  
	  return () => setIsMounted(false);
	}, [urlStore, isMounted]);

    


	return (
		<>
		{urlStore.urls.map((url) => (
			<>
			<ListItem activeItem={url._id === activeItem} key={url._id}>
				<URLItemCard activeItem={url._id === activeItem} onClick={() => handleActivator(url._id)}>
        			{/* <ItemIcon><FaQrcode /></ItemIcon> */}
						<ItemIcon><FaLink /></ItemIcon>
						<ItemTitle>
							{url.shortUrl.toLowerCase()}
						</ItemTitle>
						<TextCopy onClick={(e) => handleCopyTitle(url.shortUrl, e)}><FaCopy /></TextCopy>
				</URLItemCard>
			</ListItem>
			{url._id === activeItem && (
				<ItemBox activeItem={url._id === activeItem}>
					<ItemDelete onClick={() => handleDelete(url._id)}><FaTrash /></ItemDelete>
					<ItemDescr>
						<FaCode className='descr-icon'/>
						{url.originalUrl.toLowerCase()}
					</ItemDescr>
					<ItemCounter><FaLocationCrosshairs className='count-icon'/>{url.clicks}</ItemCounter>
					<CloseButton onClick={handleClose}></CloseButton>
				</ItemBox>
			)}
			</>
		))
		}	
		</>
	)
})

export default URLItem