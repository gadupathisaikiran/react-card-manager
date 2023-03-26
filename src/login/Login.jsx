import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom"


import { history } from '_helpers';
import { useSelector, useDispatch } from 'react-redux';


import { authActions } from '_store';

export { Login };

function Login() {
    
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);
   const [token,settoken]=useState(sessionStorage.getItem("token"))
   const navigate = useNavigate();
    useEffect(() => {
        
        // // redirect to home if already logged in
        // if (authUser) history.navigate('/home');

        if(!sessionStorage.getItem("token")){
            history.navigate("/");

        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ email, password }) {


        return dispatch(authActions.login({ email, password }));

        
    }

useEffect(()=>{

    if(sessionStorage.getItem("token")){

        history.navigate("/home");
   
    }


},[])
   
  









    return (
        <div className="col-md-6 offset-md-3 mt-5">
          
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    
                        <div className="form-group">
                            <label>Username</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
