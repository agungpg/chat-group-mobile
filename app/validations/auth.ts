import {object, string, ref} from 'yup'

export const LoginSchema = object({
  username: string()
        .required('username is required'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const SignUpSchema = object({
  username: string()
        .required('name is required'),
  email: string()
        .required('email is required')
        .email(),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), ""], 'Passwords must match')
    .required('Confirm password is required'),
});