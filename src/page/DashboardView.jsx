import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
    delenteLink,
    getLinks,
    insertNewLink,
    updateLink,
} from "../firebase/firebase";
import Link from "../components/Link";

function DashboardView() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});

    const [title, setTitle] = useState("");
    const [url, setURL] = useState("");
    const [links, setLinks] = useState([]);

    async function handleUserLoggedIn(user) {
        setCurrentUser(user);
        setState(2);
        // obtener la lista de links del usuarios
        const resLinks = await getLinks(user.uid);
        setLinks([...resLinks]);
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

    async function handleUpdateLink(docId, currentTitle, currentUrl) {
        const link = links.find((item) => item.docId === docId);
        console.log(docId, currentTitle, currentUrl);
        link.title = currentTitle;
        link.url = currentUrl;
        // al crear el link ya tenia el docID pero no estaba en su campo y ahora del local se va a actualizar
        await updateLink(docId, link);
    }
    async function handleDeleteLink(docId) {
        // eliminar un link al nivel firebase
        await delenteLink(docId);
        // eliminar un link al nivel local
        const tmp = links.filter((link) => link.docId !== docId);
        setLinks([...tmp]);
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
                    <Link
                        key={link.docId}
                        docId={link.docId}
                        title={link.title}
                        url={link.url}
                        onUpdate={handleUpdateLink}
                        onDelete={handleDeleteLink}
                    />
                ))}
            </div>
        </DashboardWrapper>
    );
}

export default DashboardView;
