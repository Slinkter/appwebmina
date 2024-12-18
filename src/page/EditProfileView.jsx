import { async } from "@firebase/util";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import {
    getProfilePhotoUrl,
    setUserProfilePhoto,
    updateUser,
} from "../firebase/firebase";

function EditProfileView() {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [profileUrl, setProfileUrl] = useState(null);
    const fileRef = useRef(null);

    async function handleUserLoggedIn(user) {
        setCurrentUser(user);
        // cuando carga por primera vez la pagina obtener el url-imagen de la usuariop
        const url = await getProfilePhotoUrl(user.profilePicture);
        setProfileUrl(url);
        setState(2);
    }

    function handleUserNotRegister() {
        navigate("/login");
    }

    function handleUserNotLoggedIn(user) {
        navigate("/login");
    }

    function handleOpenFilePicket() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    function handleChangeFile(e) {
        // control de almacenamiento
        const files = e.target.files;
        const fileReader = new FileReader(); //es una api para aceder a un archivo
        if (fileReader && files && files.length > 0) {
            // ya se tiene el archivo selecionado
            fileReader.readAsArrayBuffer(files[0]); // convetir solo un archivo en blod
            fileReader.onload = async function () {
                const imageData = fileReader.result; // ya tiene convertido el archivo
                const res = await setUserProfilePhoto(
                    currentUser.uid,
                    imageData
                );
                console.log(res);
                if (res) {
                    const tmpUser = { ...currentUser };
                    tmpUser.profilePicture = res.metadata.fullPath;
                    await updateUser(tmpUser);
                    const url = await getProfilePhotoUrl(
                        currentUser.profilePicture
                    );
                    setProfileUrl(url);
                    setCurrentUser(tmpUser);
                }
            };
        }
    }

    if (state !== 2) {
        return (
            <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegister={handleUserNotRegister}
                onUserNotLoggedIn={handleUserNotLoggedIn}
            >
                ...loading
            </AuthProvider>
        );
    }

    return (
        <DashboardWrapper>
            <h1>EditProfileView</h1>
            <div>
                <div>
                    <img src={profileUrl} alt="" width={100} />
                </div>
                <div>
                    <button onClick={handleOpenFilePicket}>
                        Choose new profile
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        hidden
                        onChange={handleChangeFile}
                    />
                </div>
            </div>
        </DashboardWrapper>
    );
}

export default EditProfileView;
