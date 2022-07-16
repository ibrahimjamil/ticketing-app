import axios from "axios";
import AppConfig from "../../constants/AppConfig";

type SignUpMutationType = {
    path: string;
	email: string;
	firstName: string;
	password: string;
	userType: string;
}

type SignInMutationType = {
    path: string;
	email: string;
	password: string;
}

const signUp = async (signUpFields: SignUpMutationType) => {
    return await axios.post(AppConfig.APP_URL + signUpFields.path,{
        email: signUpFields.email,
        userType: signUpFields.userType,
        name: signUpFields.firstName,
        password: signUpFields.password
    })
}

const signIn = async (signInFields: SignInMutationType) => {
    return await axios.post(AppConfig.APP_URL + signInFields.path,{
        email: signInFields.email,
        password: signInFields.password,
    })
}



const authApi = {
    signUp,
    signIn
}

export default authApi;