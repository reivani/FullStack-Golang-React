//import FC from react
import { FC, useState, FormEvent } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import useNavigate and Link from react-router
import { useNavigate, Link } from 'react-router';

//import AxiosError untuk type assertion error yang aman
import { AxiosError } from 'axios';

//import custom hook useUserCreate
import { useUserCreate } from '../../../hooks/user/useUserCreate';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string | undefined;
}

//interface response error dari backend
interface ErrorResponseBody {
    success: boolean;
    message: string;
    errors?: ValidationErrors;
}

const UserCreate: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //define state user
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Inisialisasi useUserCreate
    const { mutate, isPending } = useUserCreate();

    // Handle submit form
    const storeUser = async (e: FormEvent) => {
        e.preventDefault();

        // Reset state errors sebelum submit
        setErrors({});

        // Call the user create mutation
        mutate({
            name,
            username,
            email,
            password
        }, {
            onSuccess: () => {

                // Redirect to users index
                navigate('/admin/users');
            },
            onError: (error) => {
                // Cast error ke AxiosError agar aman dari aturan TypeScript ESLint
                const axiosError = error as AxiosError<ErrorResponseBody>;

                // set errors to state "errors" jika ada response dari backend
                if (axiosError.response?.data?.errors) {
                    setErrors(axiosError.response.data.errors);
                }
            }
        });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header">
                            ADD USER
                        </div>
                        <div className="card-body">
                            <form onSubmit={storeUser}>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="form-control" 
                                        placeholder="Full Name" 
                                    />
                                    {(errors.Name || errors.name) && (
                                        <div className="alert alert-danger mt-2 rounded-4">
                                            {errors.Name || errors.name}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Username</label>
                                    <input 
                                        type="text" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        className="form-control" 
                                        placeholder="Username" 
                                    />
                                    {(errors.Username || errors.username) && (
                                        <div className="alert alert-danger mt-2 rounded-4">
                                            {errors.Username || errors.username}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Email address</label>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="form-control"
                                        placeholder="Email Address" 
                                    />
                                    {(errors.Email || errors.email) && (
                                        <div className="alert alert-danger mt-2 rounded-4">
                                            {errors.Email || errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label className="mb-1 fw-bold">Password</label>
                                    <input 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="form-control"
                                        placeholder="Password" 
                                    />
                                    {(errors.Password || errors.password) && (
                                        <div className="alert alert-danger mt-2 rounded-4">
                                            {errors.Password || errors.password}
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-4 shadow-sm border-0" disabled={isPending}>
                                    {isPending ? 'Saving...' : 'Save'}
                                </button>

                                <Link to="/admin/users" className="btn btn-md btn-secondary rounded-4 shadow-sm border-0 ms-2">Cancel</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCreate;