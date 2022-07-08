
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { existsUsername, updateUser } from "../firebase/firebase";

function ChooseUsernameView() {
    const navigate = useNavigate();
    const [state, setCurrentState] = useState(0);
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState({});

    function handleInputUsername(e) {
        setUsername(e.target.value);
        console.log(username);
    }

    async function handleBtnContinue() {
        if (username !== "") {
            const exists = await existsUsername(username);
            console.log("exists : ", exists);
            if (exists) {
                setCurrentState(5);
                // mensaje de que existe
            } else {
                // no existe el username en la db

                const tmp = { ...currentUser };
                tmp.username = username;
                tmp.processCompleted = true;
                await updateUser(tmp);
                setCurrentState(6);
            }
        }
    }

    function handleUserLoggedIn(user) {
        navigate("/dashboard");
    }

    function handleUserNotRegister(user) {
        /*     navigate("/choose-username"); */
        setCurrentState(3);
        setCurrentUser(user);
    }

    function handleUserNotLoggedIn() {
        navigate("/login");
    }

    if (state === 3 || state === 5) {
        return (
            <React.Fragment>
                <h1> Bienvenido {currentUser.displayName}</h1>
                <p> Introduce nuevo nombre de usuario</p>
                {state === 5 ? <p> el username ya existe escoge otro</p> : ""}
                <div>
                    <input type="text" onInput={handleInputUsername} />
                </div>
                <div>
                    <button onClick={handleBtnContinue}> Continuar </button>
                </div>
            </React.Fragment>
        );
    }

    if (state === 6) {
        return (
            <React.Fragment>
                <h1> Bienvenido {currentUser.username}</h1>
                <p> usaurio correado </p>
                <Link to="/dashboard"> Continuar </Link>
            </React.Fragment>
        );
    }

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegister={handleUserNotRegister}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>
                <div>...Loading</div>
            </div>
        </AuthProvider>
    );
}

export default ChooseUsernameView;
