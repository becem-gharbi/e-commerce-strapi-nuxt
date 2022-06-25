export default ({ app }, inject) => {

    inject('getFileUrl', (data) => {
        if (data) {
            if (process.env.NODE_ENV === "production") {
                return data.attributes.url;
            }
            return `${process.env.STRAPI_URL}${data.attributes.url}`;
        }
        return require("~/static/no_image.png");
    });

    inject('getFilesUrl', (data) => {
        if (data) {
            return data.flatMap(el => {
                if (process.env.NODE_ENV === 'production') {
                    return [el.attributes.url];
                }
                return [`${process.env.STRAPI_URL}${el.attributes.url}`];
            });
        }
        return [require("~/static/no_image.png")]
    });
}