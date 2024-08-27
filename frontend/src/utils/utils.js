const isDefined = v => typeof v !== 'undefined' && v !== null;

const isEmpty = obj => Object.keys(obj).length === 0;

const isObject = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const isString = value => typeof value === 'string';

const isImage = file => file['type'].split('/')[0] === 'image';

const isVideo = file => file['type'].split('/')[0] === 'video';

const parseLinks = text => {
    const urlRegex =
        /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/;
    return text.replace(urlRegex, url => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const filterQuery = query => {
    const params = {};

    for (let key in query) {
        const value = query[key];

        if (value === undefined || value === null || value === '') continue;

        params[key] = value;
    }

    return params;
};

export {
    isDefined,
    isImage,
    parseLinks,
    isVideo,
    isEmpty,
    isObject,
    isString,
    getBase64,
    filterQuery,
};
