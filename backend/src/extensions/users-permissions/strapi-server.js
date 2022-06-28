const _ = require('lodash');
// const { parseMultipartData } = require('@strapi/utils');

module.exports = (plugin) => {

    plugin.controllers.user.me = async (ctx) => {

        if (!ctx.state.user) {
            return ctx.unauthorized();
        }
        const user = await strapi.entityService.findOne(
            'plugin::users-permissions.user',
            ctx.state.user.id,
            { populate: ['image', 'location', 'favouriteProducts'] }
        );

        const {
            password, resetPasswordToken, confirmationToken, ...sanitizedUser
        } = user;

        ctx.body = sanitizedUser;
    };

    // plugin.controllers.user.updateMe = async (ctx) => {

    //     if (!ctx.state.user) {
    //         return ctx.unauthorized();
    //     }

    //     const { data } = parseMultipartData(ctx);

    //     const files = ctx.request.files;

    //     if (!_.isEmpty(files)) {

    //         for (let file in files) {
    //             const fieldName = file.split('.')[1];

    //             const res = await strapi.entityService.findOne('plugin::users-permissions.user', ctx.state.user.id, { populate: "*" });
    //             let fileId = res[fieldName] ? res[fieldName].id : null;

    //             ctx.query = { id: fileId };

    //             ctx.request.files = { files: files[file] };

    //             await strapi.controller('plugin::upload.content-api').upload(ctx);

    //             if (Array.isArray(ctx.body)) {
    //                 fileId = ctx.body[0].id;
    //             }

    //             else fileId = ctx.body.id;

    //             data[fieldName] = fileId;
    //         }

    //     }

    //     ctx.params.id = ctx.state.user.id;

    //     ctx.request.body = data;

    //     return await strapi.controller('plugin::users-permissions.user').update(ctx);
    // };

    // // Add the custom route
    // plugin.routes['content-api'].routes.unshift({
    //     method: 'PUT',
    //     path: '/users/me',
    //     handler: 'user.updateMe',
    //     config: {
    //         prefix: ''
    //     },
    // });

    return plugin;
};
