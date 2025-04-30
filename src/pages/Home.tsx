import { useMutation, useQuery } from "@tanstack/react-query";
import { PopupActionButton } from "../components/PopupActionButton"
import { makeBackendRequest } from "../util/Request";
import { useNavigate } from "react-router";
import { useUser } from "../util/UserState";
import { Role, useRoleCheck } from "../util/Role";
import { MenuButton } from "../components/MenuButton";
import { FaBell, FaCog, FaDoorOpen, FaExclamationTriangle, FaMapSigns, FaPlaneDeparture, FaRestroom, FaTicketAlt, FaUniversalAccess, FaUserShield } from "react-icons/fa";

export const Home = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const logOut = async () => {
        user.loggedIn = false;
        return makeBackendRequest("/user/logout", null, false);
    };

    const { data: isManager } = useRoleCheck(Role.MANAGER);

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
                    <PopupActionButton text="Log out" bgColor="bg-red-600" bgHover="bg-red-700" callback={logoutMutation.mutate} />
                </div>
            </div>

            <div className="flex flex-1 space-x-4">

                <div className="grid grid-cols-2 gap-4 flex-1">
                    <MenuButton
                        text="Accessibility"
                        icon={FaUniversalAccess}
                        bgColor="bg-emerald-700"
                        bgHover="bg-emerald-800"
                    />
                    <MenuButton
                        text="Airport navigation"
                        icon={FaMapSigns}
                        bgColor="bg-sky-700"
                        bgHover="bg-sky-800"
                    />
                    <MenuButton
                        text="Notifications"
                        icon={FaBell}
                        bgColor="bg-emerald-700"
                        bgHover="bg-emerald-800"
                    />
                    <MenuButton
                        text="Boarding gate"
                        icon={FaDoorOpen}
                        bgColor="bg-sky-700"
                        bgHover="bg-sky-800"
                    />
                    <MenuButton
                        text="Emergency"
                        icon={FaExclamationTriangle}
                        bgColor="bg-orange-500"
                        bgHover="bg-orange-600"
                    />
                    <MenuButton
                        text="Toilets"
                        icon={FaRestroom}
                        bgColor="bg-sky-700"
                        bgHover="bg-sky-800"
                    />
                    {isManager && (
                        <MenuButton
                            text="Admin"
                            route="/admin"
                            icon={FaUserShield}
                            bgColor="bg-red-400"
                            bgHover="bg-red-500"
                        />
                    )}
                </div>


                <div className="w-48 bg-sky-800 p-4 rounded-lg flex flex-col space-y-6 items-center justify-center">
                    <MenuButton
                        text="Flight info"
                        icon={FaPlaneDeparture}
                        bgColor="bg-blue-600"
                        bgHover="bg-indigo-700"
                    />
                    <MenuButton
                        text="Flight ticket"
                        icon={FaTicketAlt}
                        bgColor="bg-purple-600"
                        bgHover="bg-purple-700"
                    />
                    <MenuButton
                        text="Settings"
                        icon={FaCog}
                        bgColor="bg-gray-700"
                        bgHover="bg-gray-800"
                    />
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