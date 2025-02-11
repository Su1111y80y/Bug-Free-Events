// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateEventPage from "./pages/CreateEventPage";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/create" element={<CreateEventPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
