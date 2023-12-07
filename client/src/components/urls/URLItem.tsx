import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {observer} from 'mobx-react-lite'
import URLStore from "@store/URLStore"
import { FaLink, FaTrash, FaCopy, FaRocket } from "react-icons/fa6"



const ListItem = styled.ul`
	width: calc((100% / 2) - 0.75rem);
	height: fit-content;
	border: 2px solid ${props => props.theme.colors.dark};
	border-radius: 5px;
	box-shadow: 3px 3px 2px rgba(0,0,0,0.6);
	transition: all 0.3s ease-in-out;
	&:hover {
		transform: scale(1.01);
	}
	z-index: 1;

	background-color: ${props => props.theme.colors.yellow};

	&:nth-child(2n) {
		background-color: ${props => props.theme.colors.blue};
	}
	&:nth-child(3n) {
		background-color: ${props => props.theme.colors.pink};
	}
	
`
const ItemCard = styled.div`
	width: 100%;
	height: 100%;
	padding: 1rem;
	position: relative;
	cursor: pointer;
	font-size: 1em;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	gap: 1rem;
	transition: all 0.3s ease-in-out;
`
const ItemIcon = styled.div`
	position: absolute;
	top: -1rem;
	right: 0.5rem;
	width: 2em;
	height:2em;
	border: 2px solid ${props => props.theme.colors.dark};
	border-radius: 50%;
	background-color: ${props => props.theme.colors.background};
	color: ${props => props.theme.colors.textblack};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.2em;
`
const ItemTitle = styled.h3`
	font-size: 1.2em;
	font-weight: 600;
	line-height: 100%;
	letter-spacing: -0.01rem;
	background-color: ${props => props.theme.colors.background};
	padding: 0.4rem;
	border: 2px solid ${props => props.theme.colors.dark};
	border-radius: 5px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
`
const ItemBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const ItemDescr = styled.span`
	border: 2px solid ${props => props.theme.colors.dark};
	width: 100%;
	height: 2.4rem;
	border-radius: 5px;
	position: relative;
	white-space: nowrap; /* Запрещаем перенос строк */
	text-overflow: ellipsis;

	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	font-size: 1em;
	line-height: 100%;
	letter-spacing: -0.04rem;
`
const ItemButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: .2rem;
	font-weight: 600;
	font-size: 1em;
	letter-spacing: -0.09rem;
	line-height: 100%;
	border-radius: 5px;
	padding: 0.4rem;
	color: ${props => props.theme.colors.dark};
	background-color:  ${props => props.theme.colors.secondary};
	box-shadow: 3px 3px 3px rgba(0,0,0,0.4);
	transition: all 0.3s ease-in-out;
	&:nth-child(1n) {
		&:hover{
			transform: scale(1.05);
		}
		&:hover .icon{
			color: green;
		}
		&:active {
			transform: scale(0.95);
		}
	}
	&:nth-child(2n) {
		&:hover{
			transform: scale(1);
		}
		&:hover .icon{
			color: ${props => props.theme.colors.active};
		}
		&:active {
			transform: scale(1);
		}
		&:focus {
			outline: none;
		}
	}
	&:nth-child(3n) {
		&:hover{
			transform: scale(1.05);
		}
		&:hover .icon{
			color: ${props => props.theme.colors.active};
		}
		&:active {
			transform: scale(0.95);
		}
	}
	
	
	span {
		font-size: 1.2em;
	}
`

const URLItem: React.FC<{urlStore: URLStore}> = observer(( {urlStore} ) => {
	const [isMounted, setIsMounted] = useState(false);

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
			<ListItem key={url._id}>
				<ItemCard>
						{/* <ItemIcon><FaQrcode /></ItemIcon> */}
						<ItemIcon><FaLink /></ItemIcon>
						<ItemTitle><FaRocket />{url.shortUrl.toLowerCase()}</ItemTitle>
						<ItemDescr>{url.originalUrl.toLowerCase()}</ItemDescr>
						<ItemBox>
							<ItemButton onClick={(e) => handleCopyTitle(url.shortUrl, e)}>copy<FaCopy className='icon'/></ItemButton>						
							<ItemButton>clicks:<span>{url.clicks}</span></ItemButton>
							<ItemButton onClick={() => handleDelete(url._id)}>delete<FaTrash className='icon'/></ItemButton>
						</ItemBox>
				</ItemCard>
			</ListItem>
		))
		}	
		</>
	)
})

export default URLItem