import { ReactNode } from "react";

interface LargePopupProps {
    children: ReactNode;
}

export const LargePopup: React.FC<LargePopupProps> = ({ children }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center lg:p-20 p-10">
            <div className="bg-gray-700 w-full h-full rounded-lg shadow-lg animate-second-fade">
                {children}
            </div>
        </div>
    )
}