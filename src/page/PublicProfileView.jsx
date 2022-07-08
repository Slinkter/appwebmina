import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLink from "../components/PublicLink";
import {
    existsUsername,
    getProfilePhotoUrl,
    getUserPublicProfileInfo,
} from "../firebase/firebase";

function PublicProfileView() {
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState("");
    const [state, setState] = useState(0);

    useEffect(() => {
        const username = params.username;
        getProfle();
        async function getProfle() {
            try {
                const userUId = await existsUsername(username);
                console.log("userUId : ", userUId);
                if (userUId) {
                    const userInfo = await getUserPublicProfileInfo(userUId);
                    console.log(userInfo);
                    setProfile(userInfo); // profileInfo: profileInfo, linksInfo: linksInfo
                    const url = await getProfilePhotoUrl(
                        userInfo.profileInfo.profilePicture
                    );
                    setUrl(url);
                } else {
                    setState(7);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [params]);

    if (state === 7) {
        return <div> Username no existe </div>;
    }

    return (
        <div>
            <div>
                <img src={url} alt="" width={100} />
            </div>
            <h2>{profile?.profileInfo.username}</h2>
            <h3>{profile?.profileInfo.displayName}</h3>
            <div>
                {profile?.linksInfo.map((link) => (
                    <PublicLink
                        key={link.docId}
                        url={link.ulr}
                        title={link.title}
                    />
                ))}
            </div>
        </div>
    );
}

export default PublicProfileView;
/* 

 */
