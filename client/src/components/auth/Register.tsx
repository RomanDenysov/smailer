import { ChangeEvent, FormEvent, useContext, useState } from "react"
import styled from "styled-components"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { Context } from "../../App";



const SignContainer = styled.div`
    height: 90vh;
	width: 100%;

	background-color: ${props => props.theme.colors.textwhite};

	margin: auto;

	padding: 2rem;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;
`
const SignTitle = styled.h1`
    color: ${props => props.theme.colors.textblack};
    font-size: clamp(2rem, 3vw, 3rem);

    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    
    padding: 1.4rem;
`
const Label = styled.label`
    font-weight: 600;
    color: ${props => props.theme.colors.textblack};

    font-size: clamp(1rem, 2.5vw, 2rem);

    width: 100%;
    max-width: 30rem;
    margin-bottom: 0.6rem;
`
const Input = styled.input`
    color: ${props => props.theme.colors.textblack};
    border-radius: 10px;
    
    width: 100%;
    max-width: 30rem;

    padding: 0.8rem;

    font-size: clamp(1.2rem, 2.5vw, 2rem);

    margin-bottom: 2rem;

    &::placeholder {
        opacity: 0.7;
    }
`
const SignDescr = styled.span`
    color: ${props => props.theme.colors.textblack};

    font-size: clamp(0.8rem, 2.5vw, 2rem);

    margin-bottom: 2rem;

    align-self: center;
    text-align: center;
`
const Submit = styled.button`
    align-self: center;

    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.secondary};
    
    width: 16rem;
	height: 4rem;

	border: none;
	
	border-radius: 50px;
	
	font-size: 1.2rem;
	font-weight: 600;

    margin-top: 2rem;
    

    &:focus {
		outline: none;
	}
`
const NavLink = styled(Link)`
    color: ${props => props.theme.colors.textblack};
    text-decoration: underline;
    text-align: center;

    margin-top: 2rem;

    font-size: clamp(0.8rem, 2.5vw, 1.4rem);

    align-self: center;
`

interface FormData {
    username: string;
    email: string;
    password: string;
}

const SignForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const {store} = useContext(Context);

    const fromPage = location.state?.from?.pathname || '/';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        store.registration(formData.username, formData.email, formData.password);
        navigate(fromPage, {replace: true})
    }

  return (
    <SignContainer>
        <SignTitle>
            Create Your Account
        </SignTitle>
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="username">
                Username:
            </Label>
            <Input 
                placeholder='Username'
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required/>
            <Label htmlFor="email">
                Email:
            </Label>
            <Input 
                placeholder='Email'
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required/>
            <Label htmlFor="password">
                Password:
            </Label>
            <Input 
                placeholder='Password'
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required/>
            <SignDescr>
                By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY LEGACY</b>
            </SignDescr>
            <Submit onClick={handleSubmit}>Create account</Submit>
            <NavLink to='/login'>If you already have an account?</NavLink>
        </Form>
    
    </SignContainer>
  )
}

export default observer(SignForm)