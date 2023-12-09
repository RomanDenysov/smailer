import { ChangeEvent, FormEvent } from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { useAuth } from "@providers/AuthProviders/AuthContext";
import useForm, { FormData }from '@store/FormStore';
import useCusomNavigate from "@hooks/useCustomNavigate";

const SignContainer = styled.div`
    min-height: 100vh;
	width: 100%;
	margin: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;
`
const SignTitle = styled.h1`
    color: ${props => props.theme.colors.primary};
    font-size: clamp(2em, 3vw, 3em);
    text-align: center;
    font-weight: 800;
    z-index: 1;
    user-select: none;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Label = styled.label`
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    font-size: clamp(0.4em, 1.2vw, 1.6em);
    user-select: none;
    text-align: start;
    align-self: flex-start;
    width: 100%;
    max-width: 30rem;
    margin-bottom: 0.6rem;
    z-index: 1;
`
const Input = styled.input<ValidProps>`
    display: block;
    color: ${props => props.theme.colors.primary};
    border-radius: 10px;
    width: 100%;
    padding: 0.5rem;
    font-size: 1.5em;
    font-weight: 400;
    line-height: 100%;
    background-clip: padding-box;
    margin-bottom: 2rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    z-index: 1;
    border: 2px solid ${props => props.isValid ? 'black' : 'red'};
    &::placeholder {
        opacity: 0.8;
    }
`
const SignDescr = styled.span`
    color: ${props => props.theme.colors.dark};

    align-self: center;
    text-align: center;
    
    font-size: clamp(0.4em, 1.2vw, 1.6em);
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
`
const NavLink = styled(Link)`
    color: ${props => props.theme.colors.contrast};
    text-decoration: underline;
    text-align: center;

    font-size: clamp(0.4em, 1.2vw, 1.6em);

    align-self: center;

    transition: all 0.3 ease;
    &:hover {
        color: ${props => props.theme.colors.dark};
    }
`
const Submit = styled.button`
    width: 70%;
	height: 4rem;
	border: none;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;

    margin: 2rem;
    
	font-size: 2em;
	font-weight: 600;
	color: ${props => props.theme.colors.primary};

	transition: all 0.3s ease;

	box-shadow: 2px 2px 10px rgba(0,0,0,0.6);
    z-index: 1;

	&:focus {
		outline: none;
	}
	&:hover {
		transform: scale(1.1)
	}

    border: 2px solid ${props => props.theme.colors.dark};
`

interface ValidProps {
    isValid?: boolean;
}
interface SignFormProps {
    type: 'login' | 'register' | 'forgot';
}

const SignForm: React.FC<SignFormProps> = observer(({ type }) => {
    const { store } = useAuth();
    const formStore = useForm()
    const customNavigate = useCusomNavigate();
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        formStore.updateFormData(name as keyof FormData, value);

        formStore.validateField(name as keyof FormData)
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formStore.isValid) {
          switch (type) {
            case 'login':
                store.login(formStore.formData.email, formStore.formData.password);
                console.log(formStore.formData.email, formStore.formData.password)
                break;
            case 'register':
                store.registration(
                    formStore.formData.username!,
                    formStore.formData.email,
                    formStore.formData.password
                );
              break;
            default:
              console.error('Invalid form type');
          }
          customNavigate();
        } else {
          console.error('Invalid data. Please check your inputs.');
        }
      };

  return (
    <SignContainer>
        <SignTitle>
        {type === 'login' ?  "Log in to your account" : "Create Your Account"}
        </SignTitle>
        <Form onSubmit={handleSubmit}>
            {type === 'register' && (
                <>
                    <Label htmlFor="username">
                        Username:
                    </Label>
                    <Input 
                        placeholder='Username'
                        type="text"
                        id="username"
                        name="username"
                        value={formStore.formData.username}
                        onChange={handleChange}
                        required
                        isValid={formStore.isValid}/>
                </>
            )}
            <Label htmlFor="email">
                Email:
            </Label>
            <Input 
                placeholder='Email'
                type="email"
                id="email"
                name="email"
                value={formStore.formData.email}
                onChange={handleChange}
                required
                isValid={formStore.isValid}/>
            <Label htmlFor="password">
                Password:
            </Label>
            <Input 
                placeholder='Password'
                type="password"
                id="password"
                name="password"
                value={formStore.formData.password}
                onChange={handleChange}
                required
                isValid={formStore.isValid}/>
            {type === 'login' && (
                <NavLink to='/forgot'>Forgot password?</NavLink>
            )}
                <Submit onClick={handleSubmit}>
                {type === 'login' ? 'Log in' : 'Create account'}
                </Submit>
            <SignDescr>
                {type === "login"
                ? "Don't have an account?"
                : "If you already have an account?"}
            <NavLink to={type === "login" ? "/register" : "/login"}>
                {type === "login" ? "Sign Up" : "Log in"}
            </NavLink>
            </SignDescr>
        </Form>
    </SignContainer>
  )
})

export default SignForm