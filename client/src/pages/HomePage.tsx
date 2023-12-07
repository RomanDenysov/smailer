import styled, {css, keyframes} from "styled-components"
import { FaPlus, FaArrowLeft } from "react-icons/fa6"
import React, { useMemo, useState } from "react"
import URLInput from "@urls/URLInput"
import {observer} from 'mobx-react-lite'
import URLItem from "@urls/URLItem"
import URLStore from "@store/URLStore"

const ListContainer = styled.div`
    width: 100%;
    min-height: 100vh;

    background-color: transparent;
    color: ${props => props.theme.colors.textwhite};
`
const ListWrapper = styled.div`
    max-width: 1366px;
    width: 100%;
    height: 100%;

    margin: auto;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
`
const ListBox = styled.ul`
    border: 3px solid ${props => props.theme.colors.secondary};

    position: relative;

    border-radius: 5px;
    padding: 0.5rem;
    margin: auto;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: row wrap;
    gap: 0.5rem;
`
const ButtonBox = styled.div`
    height: 6rem;
    width: 100%;

    margin: auto;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    transition: all 0.5s ease-in-out;
`
const InputAnimationBox = styled.div`
    height: 100%;
    opacity: 0;
    transform: translateX(-20px);
    animation: ${keyframes`
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `} 0.3s ease-in-out forwards;
`
const PlusButton = styled.button<PlusButtonProps>`
    position: absolute;
    top: 0;
    right: 0;
    width: 6rem;
    height: 6rem;
    ${props => props.isOpen && css`
        transform: rotate(360deg);
    `}

    border: none;
    border-radius: 50%;
    
    background-color: ${props => props.theme.colors.button};
    color: ${props => props.theme.colors.text};

    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.5s ease-in-out;

    cursor: pointer;
`



interface PlusButtonProps {
    isOpen: boolean;
}

const URLList: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    const urlStore = useMemo(()=> new URLStore(), []) 

    const handlePlusClick = () => {
        setIsOpen(!isOpen)
    }


    return (
        <ListContainer>
            <ListWrapper>
                <ListBox>
                    <URLItem urlStore={urlStore} />
                </ListBox>
                <ButtonBox>
                    {isOpen && 
                        <InputAnimationBox>
                            <URLInput/>
                        </InputAnimationBox>}
                    <PlusButton
                        isOpen={isOpen}
                        onClick={handlePlusClick}>
                            {isOpen ? <FaArrowLeft /> : <FaPlus className='icon plus'/>}
                    </PlusButton>
                </ButtonBox>
            </ListWrapper>
        </ListContainer>
    )
}

export default observer(URLList)