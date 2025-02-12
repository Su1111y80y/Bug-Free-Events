import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { MainLayout } from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route
                            path="create-event"
                            element={<CreateEventPage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
