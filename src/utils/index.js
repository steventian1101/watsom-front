export const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token){
        return {
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        }
    } else {
        return {};
    }
}

export const handleResponse = async (response, onError) => {
    const res = await response;
    const text = await res.text();

    const data = text && JSON.parse(text);
    if (!res.ok){
        if (res.status === 401 && onError){
            onError();
        }

        const error = (data && data.message) || res.statusText;
        throw new Error(error);
    }

    return data;
}

export const customizeBlogIntroParagraph = (content) => {
    let tmp_content = content;

    tmp_content = tmp_content.replace("Title:\n", "**Title:**\n## ")
    tmp_content = tmp_content.replace("Outline:", "**Outline:**")
    tmp_content = tmp_content.replace(/keywords: /g, "*keywords:* ")
    tmp_content = tmp_content.replace("1. ", "### 1. ")
    tmp_content = tmp_content.replace("2. ", "### 2. ")
    tmp_content = tmp_content.replace("3. ", "### 3. ")
    tmp_content = tmp_content.replace("4. ", "### 4. ")
    tmp_content = tmp_content.replace("5. ", "### 5. ")

    return tmp_content
}