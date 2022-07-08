import React, { useEffect, useRef, useState } from "react";

function Links(props) {
    const { docId, title, url, onDelete, onUpdate } = props;

    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentUrl, setCurrentUrl] = useState(url);

    const [editTitle, setEditTitle] = useState(false);
    const [editUrl, setEditUrl] = useState(false);

    const titleRef = useRef(null);
    const urlRef = useRef(null);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, [editTitle]);

    useEffect(() => {
        if (urlRef.current) {
            urlRef.current.focus();
        }
    }, [editUrl]);

    function handleEditTitle() {
        //cambia la interfaz
        setEditTitle(true);
    }

    function handleEditUrl() {
        //cambia la interfaz
        setEditUrl(true);
    }

    function handleChangeTitle(e) {
        setCurrentTitle(e.target.value);
    }

    function handleChangeUrl(e) {
        setCurrentUrl(e.target.value);
    }

    function handleBlurTitle(e) {
        // cuando ya no hace focus del input , actualizar
        setEditTitle(false);
        onUpdate(docId, currentTitle, currentUrl);
    }

    function handleBlurUrl(e) {
        setEditUrl(false);
        onUpdate(docId, currentTitle, currentUrl);
    }


    function handleDelete(){
        onDelete(docId)
    }

    return (
        <div key={docId}>
            <div>
                <div className="title">
                    {/*  */}
                    {editTitle ? (
                        <div>
                            <input
                                ref={titleRef}
                                value={currentTitle}
                                onChange={handleChangeTitle}
                                onBlur={handleBlurTitle}
                            />
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleEditTitle}>Edit</button>
                            {currentTitle}
                        </div>
                    )}
                </div>
                <div className="url">
                    {editUrl ? (
                        <div>
                            <input
                                ref={urlRef}
                                value={currentUrl}
                                onChange={handleChangeUrl}
                                onBlur={handleBlurUrl}
                            />
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleEditUrl}> Edit</button>
                            {currentUrl}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <button onClick={handleDelete}> Delete</button>
            </div>
            <br />
        </div>
    );
}

export default Links;
