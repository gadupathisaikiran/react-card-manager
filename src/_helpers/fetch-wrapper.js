import { store, authActions } from '_store';
import { history } from '_helpers';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};


function request(method) {
    
   
    return async(url, body) => {
        const requestOptions = {
            method:method,
            mode:"cors",
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
         
        };

        if (body) {
            
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);

           
        }
        return await fetch(url,requestOptions).then((res)=>res.json()).then((res)=>handleResponse(res)).catch((e)=>{if(e){alert(e)}});
    }
}


// helper functions

// function authHeader(url) {
//     // return auth header with jwt if user is logged in and request is to the api url
//     const token = authToken();
//     const isLoggedIn = !!token;
//     const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
//     if (isLoggedIn && isApiUrl) {
//         return { Authorization: `Bearer ${token}` };
//     } else {
//         return {};
//     }
// }

function authToken() {
   
    return sessionStorage.getItem("token");
}


 function handleResponse(response) {
   

    
    if(response.user){
           
       console.log(response)
       
        sessionStorage.setItem("username",response.user.name)
      
        sessionStorage.setItem("token",response.tokens.access.token)
        
     
    }


        if (!response.ok) {
            if ([401, 403].includes(response.status) && authToken()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const logout = () => store.dispatch(authActions.logout());
                logout();
            }

            const error = (response && response.message) || response.statusText;
            return Promise.reject(error);
        }


        return response;
  
}