import { useState } from "react";
import { LargePopup } from "../components/LargePopup";
import { PopupActionButton } from "../components/PopupActionButton";
import { useUser } from "../util/UserState";
import { TextInput } from "../components/TextInput";
import { makeBackendRequest } from "../util/Request";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

// Interface for login credentials
interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials extends LoginCredentials {
    firstName: string;
    lastName: string;
}

// Define the expected response type for login (example)
interface AuthResponse {
    status: string;
    message: string;
    session: Record<string, any>;
}

const loginRequest = async (loginCredentials: LoginCredentials) => {
    return makeBackendRequest<AuthResponse>('/user/login', loginCredentials);
};

const registerRequest = async (registerCredentials: RegisterCredentials) => {
    const { email, password, firstName, lastName } = registerCredentials;
    return makeBackendRequest<AuthResponse>("/user/register", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
    });
};

export const Login = () => {
    const { setUser } = useUser();
    const [registering, setRegistering] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const navigate = useNavigate();

    const redirectToHome = () => {
        setTimeout(() => {
            navigate("/home")
        }, 1000)
    }

    // Mutation for login
    const loginMutation = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            setErrorMessage(null);
            console.log("Login success data:", data.session);
            const session = data.session
            setUser({
                id: session.id,
                firstName: session.first_name,  // Mapping snake_case to camelCase
                lastName: session.last_name,    // Mapping snake_case to camelCase
                email: session.email,
                loggedIn: true,
            });
            setSuccessMessage(data.message); // Show success message
            redirectToHome();
        },
        onError: () => {
            setErrorMessage('Login failed');
        },
    });

    // Mutation for registration
    const registerMutation = useMutation({
        mutationFn: registerRequest,
        onSuccess: (data) => {
            setErrorMessage(null);
            setSuccessMessage(data.message); // Show success message
            setRegistering(false); // Switch to login form
        },
        onError: () => {
            setErrorMessage('Registration failed');
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (registering) {
            registerMutation.mutate({ email, password, firstName, lastName });
        } else {
            loginMutation.mutate({ email, password });
        }
    };

    const handleSwitchToRegister = () => {
        setRegistering(true);
        setSuccessMessage(null);  // Clear success message when switching to register
        setErrorMessage(null);    // Clear error message when switching to register
    };

    const handleSwitchToLogin = () => {
        setRegistering(false);
        setSuccessMessage(null);  // Clear success message when switching to login
        setErrorMessage(null);    // Clear error message when switching to login
    };

    return (
        <LargePopup>
            <div className="relative w-full h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden">
                {/* Top Row: Title */}
                <div className="w-full flex justify-center p-3">
                    <div className="text-5xl font-bold">{registering ? "Register" : "Login"}</div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col justify-center items-center flex-grow">
                    <div className="absolute top-5 left-5">
                        <PopupActionButton
                            text="Go Back"
                            bgColor="bg-orange-500"
                            bgHover="bg-orange-800"
                            route="/welcome"
                        />
                    </div>

                    <div className="flex flex-col font-semibold justify-center items-center">
                        <p className="text-2xl font-semibold">{registering ? "Create an Account" : "Log in to your account"}</p>
                        <div className="pt-3 flex justify-center items-center">
                            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                                <div className="flex flex-col space-y-4">
                                    <TextInput
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextInput
                                        placeholder="Password"
                                        password={true}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {registering && (
                                        <>
                                            <TextInput
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <TextInput
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center p-3">
                                    {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
                                    {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
                                </div>

                                <div className="flex-row items-center justify-center">
                                    <PopupActionButton
                                        text={registering ? "Submit" : "Login"}
                                        bgColor="bg-green-500"
                                        type="submit"
                                    />

                                    <div className="flex justify-center mt-4 space-x-4">
                                        {!registering && (
                                            <PopupActionButton
                                                text="Register"
                                                bgColor="bg-blue-500"
                                                bgHover="bg-blue-800"
                                                callback={handleSwitchToRegister} // Switch to register form
                                            />
                                        )}
                                        {registering && (
                                            <PopupActionButton
                                                text="Cancel"
                                                bgColor="bg-orange-500"
                                                bgHover="bg-orange-800"
                                                callback={handleSwitchToLogin} // Switch to login form
                                            />
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LargePopup>
    );
};
