import { PopupActionButton } from "../components/PopupActionButton";
import { useUser } from "../util/UserState";

const Welcome = () => {
    let route;
    const { user } = useUser();
    if (user.loggedIn) {
        route = "/home"
    } else {
        route = "/login"
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-10 animate-first-fade">
            <div className="p-5 flex-col w-full bg-orange-500 flex items-center justify-center text-5xl lg:text-8xl">
                <div>Welcome!</div>
            </div>
            <div className="text-2xl font-bold">Choose your preferred language...</div>
            <PopupActionButton route={route} text="Proceed"/>
        </div>
    )
}

export default Welcome;