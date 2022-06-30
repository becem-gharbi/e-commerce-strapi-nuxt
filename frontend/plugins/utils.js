export default ({ $config }, inject) => {

    inject('getFileUrl', (data) => {
        if (data) {
            return $config.uploadBaseUrl + (data.attributes ? data.attributes.url : data.url);
        }
        return require("@/assets/no_image.png");
    });

    inject('getFilesUrl', (data) => {
        if (data) {
            return data.flatMap(el => {
                return [$config.uploadBaseUrl + (el.attributes ? el.attributes.url : el.url)];
            });
        }
        return [require("@/assets/no_image.png")]
    });
}