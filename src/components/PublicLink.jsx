import React from "react";

function PublicLink(props) {
    const { url, title } = props;

    return (
        <React.Fragment>
            <div>
                <div>
                    <a href={url}> {title} </a>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PublicLink;
