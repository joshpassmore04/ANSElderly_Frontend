import { ReactNode } from "react";

interface AttributePageProps {
    children: ReactNode;
}

export const AttributePage: React.FC<AttributePageProps> = ({ children }) => {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="flex flex-row">
                {children}
            </div>
        </div>
    )
}