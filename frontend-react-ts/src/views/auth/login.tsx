// import FC from react
import { FC, useState, FormEvent, useContext } from 'react';

// import hook useNavigate from react router
import { useNavigate } from "react-router";

// import AxiosError untuk handling error
import { AxiosError } from 'axios';

// import Cookies
import Cookies from 'js-cookie';

// import custom hook useLogin
import { useLogin } from "../../hooks/auth/useLogin";

// import AuthContext
import { AuthContext } from '../../context/AuthContext';

// interface untuk struktur data user dari backend
interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
}

// interface untuk response login sukses
interface LoginResponse {
    data: {
        token: string;
        id: number;
        name: string;
        username: string;
        email: string;
    };
}

// interface untuk validation errors
interface ValidationErrors {
    [key: string]: string;
}

// interface untuk response error dari backend
interface ErrorResponseBody {
    errors: ValidationErrors;
}

export const Login: FC = () => {

    // initialize navigate
    const navigate = useNavigate();

    // initialize useLogin
    const { mutate, isPending } = useLogin();

    // access AuthContext
    const authContext = useContext(AuthContext);

    // define state
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Handle submit form
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // Call the login mutation
        mutate({
            username,
            password
        }, {
            onSuccess: (data: LoginResponse) => {

                // set token to cookie
                Cookies.set('token', data.data.token);

                // set user to cookie
                const userData: UserData = {
                    id: data.data.id,
                    name: data.data.name,
                    username: data.data.username,
                    email: data.data.email
                };
                Cookies.set('user', JSON.stringify(userData));

                // set isAuthenticated to true
                if (authContext) {
                    authContext.setIsAuthenticated(true);
                }

                // Redirect to dashboard page
                navigate('/admin/dashboard');
            },
            onError: (error) => {
                // Cast error ke AxiosError agar aman dari ESLint
                const axiosError = error as AxiosError<ErrorResponseBody>;

                // set errors to state "errors"
                if (axiosError.response?.data?.errors) {
                    setErrors(axiosError.response.data.errors);
                }
            }
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm">
                    <div className="card-body">
                        <h4 className='fw-bold text-center'>LOGIN</h4>
                        <hr />
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="mb-1 fw-bold">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"
                                    placeholder="Username" />
                                {errors.Username && <div className="alert alert-danger mt-2 rounded-4">{errors.Username}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="mb-1 fw-bold">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
                                    placeholder="Password" />
                                {errors.Password && <div className="alert alert-danger mt-2 rounded-4">{errors.Password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-4" disabled={isPending}>
                                {isPending ? 'Loading...' : 'LOGIN'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;