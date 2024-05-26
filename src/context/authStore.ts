import createStore from 'react-auth-kit/createStore';
import createRefresh from 'react-auth-kit/createRefresh';
import axios from 'axios';

const refreshApi = createRefresh({
    interval: 15, // minutes
    refreshApiCallback: async ({
        authToken,
        refreshToken,
        authUserState,
    }) => {
        console.log(authToken)
        console.log(authUserState)
        console.log(refreshToken)
        try {
            const res = await axios.post('/refresh-token', { refreshToken });

            return {
                isSuccess: true,
                newAuthToken: res.data.accessToken,
                newAuthTokenExpireIn: 15,
            };
        } catch (err) {
            console.log(err);
            return {
                isSuccess: false,
                newAuthToken: '',
            };
        }
    }
});


const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refreshApi
});


export default store;