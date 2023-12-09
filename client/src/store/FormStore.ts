import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';

export interface FormData {
  email: string;
  password: string;
  username?: string;
}

type ValidationFunction = (value: string) => boolean;

class FormStore {
    formData: FormData = {
    email: '',
    password: '',
    };

    isValid: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    updateFormData(key: keyof FormData, value: string) {
        this.formData = {...this.formData,[key]: value,};
    }

    validateField = (name: keyof FormData) => {
        switch (name) {
            case 'email':
                this.isValid = this.isEmailValid(this.formData.email);
            break;
            case 'password':
                this.isValid = this.isPasswordValid(this.formData.password);
            break;
            case 'username':
                this.isValid = this.formData.username ? this.isUsernameValid(this.formData.username) : true;
            break;
            default:
                this.isValid = false;
        }
    }

    isEmailValid: ValidationFunction = (value) => {
        return value.includes('@') && value.includes('.');
    }

    isPasswordValid: ValidationFunction = (value) => {
        return value.length >= 3;
    }

    isUsernameValid: ValidationFunction = (value) => {
        return value.length >= 2;
    }
    }

const FormContext = createContext(new FormStore());

const useForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useForm must be used within a FormContext');
    }
    return context;
};

export default useForm;
