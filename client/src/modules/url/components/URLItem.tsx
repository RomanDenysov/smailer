import React, { useEffect, useState } from "react";
import styled, {css, keyframes} from "styled-components";
import {observer} from 'mobx-react-lite'
import URLStore from "../store/URLStore"
import { FaQrcode, FaLink, FaTrash, FaCopy } from "react-icons/fa6"

interface ActiveItemType {
	activeItem: boolean;
}

const ListItem = styled.ul<ActiveItemType>`
	width: calc((100% / 3) - 0.34rem);
	height: 6rem;

	background-color: ${props => props.theme.colors.secondary};

	transition: all 0.3s ease-in-out;

	border-radius: 5px;

	${props => props.activeItem && css`
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
	justify-content: flex-start;
	gap: 1rem;

	transition: all 0.3s ease-in-out;
`

const ItemIcon = styled.div`
	width: 2em;
	height: 2em;

	border-radius: 50%;

	background-color: ${props => props.theme.colors.text};
	color: ${props => props.theme.colors.textblack};

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 1.5em;
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
	
	cursor: copy;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 1.3em;
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

	border-radius: 5px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	position: relative;
`
const ItemDelete = styled.button`
	right: 1rem;
	width: 2em;
	height: 2em;
	border: none;

	border-radius: 50%;

	background-color: ${props => props.theme.colors.text};
	color: ${props => props.theme.colors.textblack};

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 1.5em;
`
const ItemDescr = styled.span`
	
`
const ItemCounter = styled.span`
`

const URLItem: React.FC<{urlStore: URLStore}> = observer(( {urlStore} ) => {
	const [isMounted, setIsMounted] = useState(false);
	const [activeItem, setActiveItem] = useState<string | null>(null);

	const handleActivator = (_id: string) => {
		setActiveItem(_id === activeItem ? null : _id);
		
	}


	useEffect(() => {
	  // Component is mounted, set the flag to true
	  setIsMounted(true);
  
	  // Make the request only when the component is mounted
	  if (isMounted) {
		urlStore.getURLs();
	  }
  
	  // Clean-up: set the flag to false when the component is unmounted
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
						<TextCopy><FaCopy /></TextCopy>
				</URLItemCard>
			</ListItem>
			{url._id === activeItem && (
				<ItemBox activeItem={url._id === activeItem}>
					<ItemDelete><FaTrash /></ItemDelete>
					<ItemDescr>
						{url.originalUrl.toLowerCase()}
					</ItemDescr>
					<ItemCounter>{url.clicks}</ItemCounter>
				</ItemBox>
			)}
			</>
		))
		}	
		</>
	)
})

export default URLItem