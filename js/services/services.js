const postData = async(url, data) => {
    const result = await fetch(url, {
        method: "POST",
            headers: {
                "Content-type": "application/JSON"
            },
            body: data

    });
    return await result.json();
};

export {postData};