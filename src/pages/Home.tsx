import { useMutation } from "@tanstack/react-query";
import { PopupActionButton } from "../components/PopupActionButton"
import { makeBackendRequest } from "../util/Request";
import { useNavigate } from "react-router";
import { useUser } from "../util/UserState";

export const Home = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const logOut = async () => {
        user.loggedIn = false;
        return makeBackendRequest("/user/logout", null, false);
    };

    const logoutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            setTimeout(() => {
                navigate("/welcome");
            }, 500)
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });

    return (
        <div className="w-full h-full flex flex-col space-y-4">
            <div className="flex justify-center items-center">
                <div className="flex min-h-5">
                    <button className="bg-blue-600 px-4 py-2 rounded">Hello, {user.firstName}</button>
                    <PopupActionButton text="Log out" bgColor="bg-red-600" bgHover="bg-red-700" callback={logoutMutation.mutate}/>
                </div>
            </div>

            <div className="flex flex-1 space-x-4">

                <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="bg-emerald-700 p-4 rounded-lg">Accessibility</div>
                    <div className="bg-sky-700 p-4 rounded-lg">Airport navigation</div>
                    <div className="bg-emerald-700 p-4 rounded-lg">Notifications</div>
                    <div className="bg-sky-700 p-4 rounded-lg">Boarding gate</div>
                    <div className="bg-orange-500 p-4 rounded-lg">Emergency</div>
                    <div className="bg-sky-700 p-4 rounded-lg">Toilets</div>
                </div>


                <div className="w-48 bg-sky-800 p-4 rounded-lg flex flex-col space-y-6 items-center justify-center">
                    <div className="text-center">Flight info</div>
                    <div className="text-center">Flight ticket</div>
                    <div className="text-center">Settings</div>
                </div>
            </div>
            <div className="flex items-center justify-between bg-sky-800 p-4 rounded-lg">
                <div>
                    <div className="font-bold">Sky Airlines, flight A 0137</div>
                    <div>From: London</div>
                    <div>To: Paris</div>
                    <div>Time: 10:30 A.M.</div>
                </div>

                <div className="text-center">
                    <div className="text-lg">Time left till boarding</div>
                    <div className="text-3xl font-bold">00:01:15</div>
                </div>

                <div className="bg-teal-600 p-4 rounded-full">
                    🔊
                </div>
            </div>
        </div>
    )
}