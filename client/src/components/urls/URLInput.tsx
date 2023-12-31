import React, { useRef } from "react"
import styled from "styled-components"
import { FaQrcode, FaLink, FaPaste  } from "react-icons/fa6"
import URLStore from "@store/URLStore"


const InputForm = styled.form`
    height: 100%;
    width: 100%;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
`
const InputBox = styled.div`
    border-radius: 5px;
    position: relative;
    width: 24rem;
    height: 4rem;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.4);
    z-index: 1;
`
const Input = styled.input`
    height: 4rem;
    width: 24rem;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: 5px;
    padding: 0.8rem;
    font-size: 1.4rem;
    border: 2px solid ${props => props.theme.colors.dark};
    &:focus {
        outline: none;
    }
    &::placeholder {
        opacity: 0.7;
    }
`
const InputButton = styled.button`
    height: 4rem;
    width: 4rem;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    cursor: alias;
`
const URLButton = styled.button`
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 4px 4px 2px rgba(0,0,0,0.4);
    border: 2px solid ${props => props.theme.colors.dark};
    cursor: pointer;
    z-index: 1;
    &:hover {
        opacity: 0.9;
        background-color: ${props => props.theme.colors.active};
    }
    &:active {
        transform: scale(0.9);
    }
`


const URLInput: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const urlStore = new URLStore();
    
    const handlePasteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigator.clipboard.readText().then((clipboardText) => {
            if(inputRef.current) {
                inputRef.current.value = clipboardText;
            }
        })
    }
    
    const handleURLCreate = async() => {
        try {
            if(inputRef.current) {
                await urlStore.createURL(inputRef.current.value)
            }
        } catch (err) {
            console.log(`Ошибка во время создания ссылки на клиенте: ${err}`)
        }
    }

  return (
    <InputForm>
        <InputBox>
            <Input
                ref={inputRef}
                placeholder="Enter your link"/>
            <InputButton
                onClick={handlePasteClick}>
            <FaPaste /></InputButton>
        </InputBox>
        <URLButton onClick={handleURLCreate}><FaLink /></URLButton>
        <URLButton><FaQrcode /></URLButton>
    </InputForm>
  )
}

export default URLInput