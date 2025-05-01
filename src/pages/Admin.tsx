import { MenuButton } from "../components/MenuButton"
import { PopupActionButton } from "../components/PopupActionButton"
import { Outlet } from "react-router"
import { FaLocationPin } from "react-icons/fa6"

export const Admin = () => {
    return (
        <div className="h-full w-full flex">
            <div className="w-[20vw] min-w-38 bg-blue-900 rounded-lg flex flex-col drop-shadow-xl text-wrap">
                <div className="p-3">
                    <PopupActionButton
                        text="Go Back"
                        bgColor="bg-orange-500"
                        bgHover="bg-orange-800"
                        route="/home"
                    />
                </div>
                <div className="w-full flex flex-col p-5 justify-center">
                    <div className="text-4xl py-3 font-semibold">
                        Admin Panel
                    </div>
                    <MenuButton
                        text="Location"
                        icon={FaLocationPin}
                        bgColor="bg-sky-700"
                        bgHover="bg-sky-800"
                        flex="row"
                        route="location"
                    />
                </div>
            </div>
            <div className="flex-grow"> {/* Main content area */}
                <div className="h-full p-5">
                    {/* Content from the Outlet will go here */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
