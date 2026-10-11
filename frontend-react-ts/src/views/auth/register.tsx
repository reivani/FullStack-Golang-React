import { FC, useState, FormEvent } from 'react';
import { useNavigate } from "react-router";
import { AxiosError } from 'axios';
import { useRegister } from "../../hooks/auth/useRegister";

// Interface untuk menampung pesan error validasi dari backend
interface ValidationErrors {
    Name?: string;
    Username?: string;
    Email?: string;
    Password?: string;
    [key: string]: string | undefined;
}

// Interface sesuai struktur JSON error response dari Go/Gin
interface ErrorResponseBody {
    success: boolean;
    message: string;
    errors?: ValidationErrors;
}

const Register: FC = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useRegister();

    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleRegister = (e: FormEvent) => {
        e.preventDefault();

        // Reset error setiap kali tombol submit diklik
        setErrors({});

        mutate({
            name,
            username,
            email,
            password
        }, {
            onSuccess: () => {
                // Berhasil register -> Redirect ke halaman Login
                navigate('/login');
            },
            onError: (error) => {
                const axiosError = error as AxiosError<ErrorResponseBody>;
                
                // Ambil object errors dari backend jika ada
                if (axiosError.response?.data?.errors) {
                    setErrors(axiosError.response.data.errors);
                }
            }
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card border-0 rounded-4 shadow-sm">
                    <div className="card-body">
                        <h4 className='fw-bold text-center'>REGISTER</h4>
                        <hr />
                        <form onSubmit={handleRegister}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className="mb-1 fw-bold">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            className="form-control"
                                            placeholder="Full Name" 
                                        />
                                        {errors.Name && (
                                            <div className="alert alert-danger mt-2 rounded-4">
                                                {errors.Name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className="mb-1 fw-bold">Username</label>
                                        <input 
                                            type="text" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                            className="form-control"
                                            placeholder="Username" 
                                        />
                                        {errors.Username && (
                                            <div className="alert alert-danger mt-2 rounded-4">
                                                {errors.Username}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className="mb-1 fw-bold">Email address</label>
                                        <input 
                                            type="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            className="form-control"
                                            placeholder="Email Address" 
                                        />
                                        {errors.Email && (
                                            <div className="alert alert-danger mt-2 rounded-4">
                                                {errors.Email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className="mb-1 fw-bold">Password</label>
                                        <input 
                                            type="password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            className="form-control"
                                            placeholder="Password" 
                                        />
                                        {errors.Password && (
                                            <div className="alert alert-danger mt-2 rounded-4">
                                                {errors.Password}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-4" disabled={isPending}>
                                {isPending ? 'Loading...' : 'REGISTER'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;