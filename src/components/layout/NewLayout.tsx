
// import MenuBarMobile from "./MenuBarMobile";
// import Sidebar from "./Sidebar";
import { Sidebar } from "./sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    // const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="min-h-screen min-w-screen max-w-screen">
            <div className="flex">
                <Sidebar />
                <div className="pl-[56px] flex flex-col flex-grow justify-center align-center bg-background">
                    {children}
                </div>
            </div>
        </div>
    )
}