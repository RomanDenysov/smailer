import { ChangeEvent, FormEvent, useState } from "react"
import styled from "styled-components"


interface FormData {
    email: string;
    password: string;
}

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

    margin: 2rem 0;


    &:focus {
		outline: none;
	}
`

const ForgotPassword: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

  return (
    <SignContainer>
        <SignTitle>
            Enter your email, for password reset
        </SignTitle>
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">
                Email:
            </Label>
            <Input 
                placeholder='Your Email'
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required/>           
            <Submit onClick={handleSubmit}>Log in</Submit>
        </Form>
    </SignContainer>
  )
}

export default ForgotPassword