import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { insertNewLink } from "../firebase/firebase";

function DashboardView() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

    const [title, setTitle] = useState("");
    const [url, setURL] = useState("");
    const [links, setLinks] = useState([]);

    function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(2);
    }

    function handleUserNotRegister(user) {
        navigate("/login");
    }

    function handleUserNotLoggedIn() {
        navigate("/login");
    }

    if (state === 0) {
        return (
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >
                <div>Loading... </div>
            </AuthProvider>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addLink();
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        const e_name = e.target.name;

        if (e_name === "title") {
            setTitle(value);
        }
        if (e_name === "url") {
            setURL(value);
        }
    };

    function addLink() {
        console.log(title);
        console.log(url);
        if (title !== "" && url !== "") {
            const newLink = {
                id: uuidv4(),
                title: title,
                url: url,
                uid: currentUser.uid,
            };
            const res = insertNewLink(newLink);
            newLink.docId = res.id;
            setTitle("");
            setURL("");
            setLinks([...links, newLink]); // de la lista links que tengo le add newLink
        }
    }

    return (
        <DashboardWrapper>
            <h1>Dashboard... </h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="" name="title" onChange={handleOnChange} />

                <label htmlFor="url">URL</label>
                <input type="" name="url" onChange={handleOnChange} />

                <input type="submit" value="Create new Link" />
            </form>

            <div>
                {links.map((link) => (
                    <div key={link.id}>
                        <a href={link.url}> {link.title}</a>
                    </div>
                ))}
            </div>
        </DashboardWrapper>
    );
}

export default DashboardView;
