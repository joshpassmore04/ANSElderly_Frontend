import { FaPlaneDeparture } from "react-icons/fa"
import { MenuButton } from "../components/MenuButton"

export const Admin = () => {
    return (
        <div className="h-full w-full flex flex-row">
            <div className="w-[20vw] min-w-38 bg-blue-900 rounded-lg flex flex-col drop-shadow-xl text-wrap">
                <div className="w-full flex flex-col p-5 justify-center">
                    <div className="text-4xl py-3 font-semibold">
                        Admin Panel
                    </div>
                    <MenuButton
                        text="Aircraft"
                        icon={FaPlaneDeparture}
                        bgColor="bg-sky-700"
                        bgHover="bg-sky-800"
                        flex="row"
                    />
                </div>
                <div className="flex-grow"> {/* Transparent blue background */}
                    {/* Content here */}
                </div>
            </div>
        </div>
    )
}