import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Grid, createStyles, Text, Checkbox, Button, PasswordInput, Loader } from '@mantine/core';
import { authApi } from '../api';
import SelectComponent from '../components/Select';
import FormInputWrapperComponent from '../components/FormInputWrapper';

type FormInputType = {
	email: string;
	password: string;
	firstName: string;
}

type SignUpMutationType = {
	email: string;
	firstName: string;
	password: string;
	userType: string;
}

type SignInMutationResponse = {
	AccessToken: string;
	ExpiresIn: number;
	IdToken: string;
	RefreshToken: string;
	TokenType: string;
  }

type ErrorFields = {
	firstName: string;
	email: string;
	password: string;
}

type ErrorFieldsType = [...[keyof ErrorFields]];

const useStyles = createStyles(()=>({
	container:{
		height: "101vh",
		width: "100%",
	},
	showCaseSide: {
		backgroundColor: "#228be6"
	},
	rootSignUpContainer: {
		paddingLeft: "35px",
		paddingRight: "20px",
	},
	ticketingTitleContainer: {
		marginTop: "25px",
		height: "80px",
	},
	ticketingTitle: {
		color:  "#228be6",
		fontSize: "30px",
	},
	signUpTitleContainer: {
		height: "80px",
	},
	alertInfoContainer: {
		height: "auto",
		marginBottom: "7px"
	},
	signUpTitle: {
		fontSize: "30px",
		color: "#00000099 !important",
	},
	SignUpContainer: {
		height: "auto",
		padding: "10px"
	},
	checkbox: {
		color:  "#228be6",
	},
	haveAccountContainer: {
		maxWidth: "unset"
	},
	haveAccount: {
		fontSize: "15px",
		color: "#00000099 !important",
		cursor: "pointer"
	},
	signUpBtnContainer:{
		marginTop: "20px",
		display: "flex",
		flexDirection: "column",
		width: "90%"
	},
	logInSpan: {
		color:  "#228be6",
	},
	inputWrapper:{
		label:{
			color:  "#00000099 !important"
		}
	}
})) 

const SignUp = () => {
	const { classes } = useStyles();
	const router = useRouter();
	const [error, setError] = useState([{
		error: false,
		message: '',
	}]);
	const [errorFields, setErrorFields] = useState<ErrorFieldsType>();
	const [userType, setUserType] = useState();
	const [checked, setChecked] = useState(false);
	const { register, handleSubmit, formState } = useForm<FormInputType>({
		mode: "onChange"
	});
	const signUpMutation = useMutation('signup', async (variables: SignUpMutationType) => {
		return await authApi.signUp({
				path: 'users/signUp',
				email: variables.email,
				firstName: variables.firstName,
				password: variables.password,
				userType: variables.userType,
			})
		},
	)

	const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
		if (
			formData.firstName && 
			formData.password &&
			formData.email &&
			checked && userType
		) {
			const email = formData.email;
			const password = formData.password;
			const firstName = formData.firstName;

			await signUpMutation.mutateAsync({
				email,
				firstName,
				password,
				userType
			},{
				onSuccess: (data) => {
					setError([{
						error: false,
						message: ''
					}])
					const signInResponse : SignInMutationResponse = data.data.AuthenticationResult;
					localStorage.setItem('accessToken', signInResponse.AccessToken);
					localStorage.setItem('idToken', signInResponse.IdToken);

					setTimeout(() => {
						router.push('/app')
					}, 2000)
				},
				onError: (err: any) => {
					if (err?.response.data === undefined) {
						setError([{
							error: true,
							message: 'server down please contact IT team'
						}])
					}else{
						console
						if (!!err?.response.data?.error[0].zodError) {
							setErrorFields(err?.response.data?.error.map((error: any)=> error.field))
						}else{
							setErrorFields(undefined);
							setError(err?.response.data.error[0])
						}
					}
				}
			});
		}
	}
	return (
		<Grid className={classes.container}>
			<Grid.Col span={6} className={classes.showCaseSide}/>
			<Grid.Col span={6} className={classes.rootSignUpContainer}>
				<Grid.Col span={12} className={classes.ticketingTitleContainer}>
					<Text
						component="span"
						align="center"
						size="xl"
						weight={700}
						className={classes.ticketingTitle}
					>
						Ticketing
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.signUpTitleContainer}>
					<Text
						component="span"
						align="center"
						size="xl"
						weight={700}
						className={classes.signUpTitle}
					>
						Sign Up
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.alertInfoContainer}>
					{!!error[0]?.error && (
						<span style={{ color: "red" }}>{error[0].message}</span>
					)}
				</Grid.Col>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid className={classes.SignUpContainer}>
						<Grid.Col span={6}>
							<FormInputWrapperComponent
								label='First Name'
								name="firstName"
								placeholder='Enter your first name'
								required={true}
								className={classes.inputWrapper}
								register={register}
								error={
									!!errorFields?.includes("firstName") ? 
									'must be minimum 5 character':
									''
								}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<SelectComponent
								label='User Type'
								placeholder='Select user type'
								data={['admin', 'noice']}
								required={true}
								className={classes.inputWrapper}
								value={userType}
								handleChange={(e: any)=>setUserType(e)}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<FormInputWrapperComponent
								label='Company Email'
								name="email"
								required={true}
								placeholder='Enter your email'
								className={classes.inputWrapper}
								register={register}
								error={
									!!errorFields?.includes("email") ? 
									'email field is not valid':
									''
								}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<PasswordInput
								placeholder="Enter your password"
								label="Password"
								required
								className={classes.inputWrapper}
								error={
									!!errorFields?.includes("password") ? 
									'password must contain one upper case one lower case one special character and one digit':
									''
								}
								{...register('password', { required: true })}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<Grid className={classes.signUpBtnContainer}>
								<Grid.Col span={12}>
									<Checkbox
										label="Accept Terms & Conditions"
										className={classes.checkbox}
										checked={checked}
										onChange={(event) => setChecked(event.currentTarget.checked)} 
									/>
								</Grid.Col>
								<Grid.Col span={12}>
									<Button
										fullWidth
										type='submit'
										disabled={
											! formState.isValid || 
											! checked ||
											! userType 
										}
									>
										{
											signUpMutation.isLoading ? <Loader color="white" variant="dots" size="lg"/> : 'Sign Up'
										}
									</Button>
								</Grid.Col>
								<Grid.Col span={12} className={classes.haveAccountContainer}>
									<Text
										component="a"
										align="center"
										weight={500}
										className={classes.haveAccount}
										href={'/login'}
									>
										Already have an account? <span className={classes.logInSpan}>Log In</span>
									</Text>
								</Grid.Col>
							</Grid>
						</Grid.Col>
					</Grid>
				</form>
			</Grid.Col>
		</Grid>
	)
}

export default SignUp