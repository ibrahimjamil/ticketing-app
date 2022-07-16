import axios from "axios";
import { QueryClient } from "react-query";
import AppConfig from "../../constants/AppConfig";

const client = new QueryClient();

type GetUserQueryType = {
    path: string;
    idToken: string;
    accessToken: string;
}

const getUser = async (getUserInfo: GetUserQueryType) => {
    return await client
        .fetchQuery(
            'getUser',
             async () => await axios.get(AppConfig.APP_URL + getUserInfo.path, {
                headers: {
                    authorization: `Bearer ${getUserInfo.accessToken}`,
                    idToken: getUserInfo.idToken,
                }
            }),
            {
                retry: false
            }
        )
}

const userApi = {
    getUser
}

export default userApi;