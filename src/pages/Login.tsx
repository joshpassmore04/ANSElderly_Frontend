import { useState, useRef } from "react";
import { LargePopup } from "../components/LargePopup";
import { PopupActionButton } from "../components/PopupActionButton";
import { User, useUser } from "../util/UserState";
import { TextInput } from "../components/TextInput";
import axios from "axios";
import { useApiUrl } from "../util/ApiContext";

// Interface for login credentials
interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials extends LoginCredentials {
    first_name: string;
    last_name: string;
}

// Define the expected response type for login (example)
interface AuthResponse {
    status: string;
    message: string;
    session: User;
}

export const Login = () => {
    const { setUser } = useUser();
    const apiUrl = useApiUrl();
    const [registering, setRegistering] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const login = async (loginCredentials: LoginCredentials) => {
        try {
            const response = await axios.post<AuthResponse>(`${apiUrl}api/v1/user/login`, loginCredentials);
            const { status, session } = response.data;
            if (status === "success") {
                setSuccessMessage("Login successful! Welcome back.");
                setErrorMessage(null)
                setUser(session);
                setTimeout
            } else {
                setErrorMessage("That didn't work. Perhaps try different credentials?");
            }
        } catch (error) {
            setErrorMessage("That didn't work. Perhaps try different credentials?");
            console.error(error);
        }
    };

    const register = async (registerCredentials: RegisterCredentials) => {
        const { email, password, first_name, last_name } = registerCredentials;
        try {
            const response = await axios.post<AuthResponse>(`${apiUrl}api/v1/user/register`, {
                email,
                password,
                first_name: first_name,
                last_name: last_name,
            });
            const { status, session } = response.data;
            if (status === "success") {
                setSuccessMessage("Registration successful! Welcome!");
                setErrorMessage(null)
                setUser(session);
                setRegistering(false);
            } else {
                setErrorMessage("Registration failed. Please try again. Did you fill out all the fields?");
            }
        } catch (error) {
            setErrorMessage("Registration failed. Did you fill out all the fields?");
            console.error(error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (registering) {
            register({ email, password, first_name: firstName, last_name: lastName });
        } else {
            login({ email, password });
        }
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
                    {/* Button positioned absolutely inside a relatively-positioned parent */}
                    <div className="absolute top-5 left-5">
                        <PopupActionButton
                            text="Go Back"
                            bgColor="bg-orange-500"
                            bgHover="bg-orange-800"
                            route="/welcome"
                        />
                    </div>

                    {/* Centered text */}
                    <div className="flex flex-col font-semibold justify-center items-center">
                        <p className="text-2xl font-semibold">{registering ? "Create an Account" : "Log in to your account"}</p>
                        <div className="pt-3 flex justify-center items-center">
                            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                                {/* Email and Password fields */}
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
                                    {/* Only show first and last name fields if registering */}
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
                                    {/* Show success or error message */}
                                    {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
                                    {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
                                </div>
                                {/* Submit Button */}
                                <div className="flex-row items-center justify-center">

                                    {/* Submit/Login Button */}
                                    <PopupActionButton
                                        text={registering ? "Submit" : "Login"}
                                        bgColor="bg-green-500"
                                        type="submit" // Submit button
                                    />
                                    {/* Show the "Register" button when not registering */}
                                    <div className="flex justify-center mt-4 space-x-4">
                                        {!registering && (
                                            <PopupActionButton
                                                text="Register"
                                                bgColor="bg-blue-500"
                                                bgHover="bg-blue-800"
                                                callback={() => setRegistering(true)} // Switch to registration form
                                            />
                                        )}
                                        {registering && (
                                            <PopupActionButton
                                                text="Cancel"
                                                bgColor="bg-orange-500"
                                                bgHover="bg-orange-800"
                                                callback={() => setRegistering(false)}
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
