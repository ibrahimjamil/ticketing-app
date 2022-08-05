import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Grid, createStyles, Text, Button, PasswordInput, Loader } from '@mantine/core';
import { authApi } from '../api';
import FormInputWrapperComponent from '../components/FormInputWrapper';

type FormInputType = {
	email: string;
  password: string;
}

type SignInMutationType = {
	email: string;
	password: string;
}

type SignInMutationResponse = {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  RefreshToken: string;
  TokenType: string;
}

type ErrorFieldsType = [...[keyof FormInputType]];

const useStyles = createStyles(()=>({
  container:{
		height: "101vh",
    width: "100%"
	},
  showCaseSide: {
		backgroundColor: "#228be6"
	},
  rootSignInContainer: {
		paddingLeft: "35px",
		paddingRight: "20px",
	},
  ticketingTitleContainer: {
		marginTop: "40px",
		height: "80px",
	},
  ticketingTitle: {
		color:  "#228be6",
		fontSize: "30px",
	},
	signInTitleContainer: {
		height: "80px",
	},
	signInTitle: {
		fontSize: "30px",
		color: "#00000099 !important",
	},
  inputWrapper:{
		label:{
			color:  "#00000099 !important"
		}
	},
  signInBtnContainer:{
		marginTop: "20px",
		display: "flex",
		flexDirection: "column",
		width: "90%"
	},
  accountContainer: {
		maxWidth: "unset"
	},
  haveAccount: {
		fontSize: "15px",
		color: "#00000099 !important",
		cursor: "pointer"
	},
  signUpSpan: {
		color:  "#228be6",
	},
  forgotPassword:{
    color:"#228be6 !important"
  },
  alertInfoContainer: {
		height: "10px",
    marginBottom: "7px"
	},
}))

const Login = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [error, setError] = useState({
		error: false,
		message: '',
	});
  const [errorFields, setErrorFields] = useState<ErrorFieldsType>();
  const { register, handleSubmit, formState } = useForm<FormInputType>({
		mode: "onChange"
	});
  const signInMutation = useMutation('signin', async (variables: SignInMutationType) => {
      return await authApi.signIn({
        path: 'users/signin',
        email: variables.email,
        password: variables.password
      })
    },
  )

  useEffect(() => {
    if (!!localStorage.getItem('accessToken') && !!localStorage.getItem('idToken')){
      router.push('/app');
    }
  }, [])

  const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
		if (
			formData.email &&
			formData.password 
		) {
			const email = formData.email;
			const password = formData.password;

		 await signInMutation.mutateAsync({
				email,
				password,
			},{
				onSuccess: (data) => {
					setError({
						error: false,
						message: ''
					})

          const signInResponse : SignInMutationResponse = data.data.AuthenticationResult;
          localStorage.setItem('accessToken', signInResponse.AccessToken);
          localStorage.setItem('idToken', signInResponse.IdToken);

          setTimeout(() => {
            router.push('/app')
          }, 2000)
				},
				onError: (err: any) => {
					if (err?.response.data === undefined) {
						setError({
							error: true,
							message: 'server down please contact IT team'
						})
					}else{
						if (!!err?.response.data?.zodError) {
							setErrorFields(err?.response.data?.errorFields)
						}else{
							setErrorFields(undefined);
							setError(err?.response.data)
						}
					}
				},
			});
		}
	}

  return (
    <Grid className={classes.container}>
      <Grid.Col span={7} className={classes.showCaseSide}/>
      <Grid.Col span={5} className={classes.rootSignInContainer}>
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
        <Grid.Col span={12} className={classes.signInTitleContainer}>
          <Text
            component="span"
            align="center"
            size="xl"
            weight={700}
            className={classes.signInTitle}
          >
            Log In
          </Text>
        </Grid.Col>
        <Grid.Col span={12} className={classes.alertInfoContainer}>
          {!!error?.error && (
            <span style={{ color: "red" }}>{error.message}</span>
          )}
        </Grid.Col>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid.Col span={12} pl={0} pb={0}>
            <Grid.Col span={7} pb={0}>
              <FormInputWrapperComponent
                label='Email'
                name="email"
                placeholder='Enter your email or username'
                required={true}
                className={classes.inputWrapper}
                register={register}
                error={
									!!errorFields?.includes("email") ? 
									'email field is not valid':
									''
								}
              />
            </Grid.Col>
          </Grid.Col>
          <Grid.Col span={12} pl={0} pb={0}>
            <Grid.Col span={7} pb={0}>
              <PasswordInput
								placeholder="Enter your password"
								label="Password"
								required
								className={classes.inputWrapper}
								{...register('password', { required: true })}
                error={
									!!errorFields?.includes("password") ? 
									'password must contain one upper case one lower case one special character and one digit':
									''
								}
							/>
            </Grid.Col>
          </Grid.Col>
          <Grid.Col span={7}>
            <Grid className={classes.signInBtnContainer}>
              <Grid.Col span={12}>
                <Text
                    component="a"
                    align="center"
                    weight={500}
                    className={classes.forgotPassword}
                  >
                  Forgot Password?
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Button
                  fullWidth
                  type='submit'
                  disabled={
                    ! formState.isValid
                  }
                >
                  {
											signInMutation.isLoading ? <Loader color="white" variant="dots" size="lg"/> : 'Sign In'
									}
                </Button>
              </Grid.Col>
              <Grid.Col span={12} className={classes.accountContainer}>
                <Text
                  component="a"
                  align="center"
                  weight={500}
                  className={classes.haveAccount}
                  href={'/signup'}
                >
                  Don't have an account? <span className={classes.signUpSpan}>Sign Up</span>
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </form>
      </Grid.Col>
    </Grid>
  )
}

export default Login