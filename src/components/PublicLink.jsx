import React from "react";

function PublicLink(props) {
    const { url, title } = props;
    console.log(props);
    console.log(url);
    console.log(title);

    return (
        <React.Fragment>
            <div>
                <a href={`https://${url}`}> {title} </a>
            </div>
        </React.Fragment>
    );
}

export default PublicLink;
