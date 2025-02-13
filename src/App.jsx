import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { MainLayout } from "./layout/MainLayout";
import Home from "./pages/Home";
import CreateEventPage from "./pages/CreateEventPage";
import LoginPage from "./pages/LoginPage"; // Add this import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route
                            path="create-event"
                            element={<CreateEventPage />}
                        />
                        <Route path="login" element={<LoginPage />} />{" "}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
