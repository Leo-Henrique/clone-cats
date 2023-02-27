import "./scss/style.scss";
import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import { UserStorage } from "./UserContext";
import LeoAnimate from "leo-animate.js";

export default function App() {
    const location = useLocation();
    const navigation = useNavigate();

    React.useEffect(() => {
        const duration = 200;
        const options = { transitions: { duration: `${duration}ms` } };
        const links = document.querySelectorAll("a");
        const change = (event) => {
            const animate = document.querySelector("[data-animate]");
            const { href } = event.currentTarget;
            const { origin } = window.location;
            const path = href.replace(origin, "");

            event.preventDefault();
            animate.classList.remove("--animated");
            setTimeout(() => navigation(path), duration);
        }

        links.forEach(link => link.addEventListener("click", change));

        new LeoAnimate(options);
        return () => links.forEach(link => link.removeEventListener("click", change));
    }, 
    [location])

    return (
        <UserStorage>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} />
            </Routes>
            <Footer />
        </UserStorage>
    );
}
