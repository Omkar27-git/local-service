import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    return(
        <div className="min-h-screen flex">
            {/* Sidebar Section */}
            <Sidebar />

            {/* Page Content */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout;