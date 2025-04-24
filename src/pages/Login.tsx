import { LargePopup } from "../components/LargePopup"
import { PopupActionButton } from "../components/PopupActionButton"

export const Login = () => {
    return (
        <LargePopup>
            <div className="w-full h-full">
                <div className="p-5">
                    <PopupActionButton text="Go Back" bgColor="bg-orange-500" bgHover="bg-orange-800" route="/welcome"/>
                </div>
                <div className="flex-col flex justify-center items-center"></div>
            </div>
        </LargePopup>
    )
}