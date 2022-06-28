export default ({ app }, inject) => {

    inject('getFileUrl', (data) => {
        if (data) {
            if (process.env.NODE_ENV === "production") {
                return (data.attributes ? data.attributes.url : data.url);
            }
            return process.env.STRAPI_URL + (data.attributes ? data.attributes.url : data.url);
        }
        return require("@/assets/no_image.png");
    });

    inject('getFilesUrl', (data) => {
        if (data) {
            return data.flatMap(el => {
                if (process.env.NODE_ENV === 'production') {
                    return [el.attributes ? el.attributes.url : el.url];
                }
                return [process.env.STRAPI_URL + (el.attributes ? el.attributes.url : el.url)];
            });
        }
        return [require("@/assets/no_image.png")]
    });
}