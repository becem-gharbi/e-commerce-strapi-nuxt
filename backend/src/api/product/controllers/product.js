'use strict';

/**
 *  product controller
 */

const _ = require('lodash');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
    // async delete(ctx) {
    //     const { id } = ctx.params;

    //     const [product] = await strapi.entityService.findMany('api::product.product', {
    //         populate: ["user"],
    //         filters: {
    //             id: id,
    //             user: ctx.state.user.id
    //         }
    //     },
    //     );

    //     if (!product) {
    //         return ctx.unauthorized(`You can't delete this entry`);
    //     }

    //     await deleteFile(strapi, id, "image");

    //     const response = await super.delete(ctx);

    //     return response;
    // },

    // async update(ctx) {
    //     const { id } = ctx.params;

    //     const [product] = await strapi.entityService.findMany('api::product.product', {
    //         populate: ["user"],
    //         filters: {
    //             id: id,
    //             user: ctx.state.user.id
    //         }
    //     },
    //     );

    //     if (!product) {
    //         return ctx.unauthorized(`You can't update this entry`);
    //     }

    //     const files = ctx.request.files;

    //     if (!_.isEmpty(files)) {

    //         for (let file in files) {
    //             const fieldName = file.split('.')[1];
    //             await deleteFile(strapi, id, fieldName);
    //         }
    //     }

    //     const response = await super.update(ctx);
    //     return response;
    // }
}));

// async function deleteFile(strapi, productId, fieldName) {

//     const res = await strapi.service('api::product.product').findOne(productId, { populate: "*" });

//     const fileId = res[fieldName]?.id;

//     if (fileId) {
//         const fileEntry = await strapi.db.query('plugin::upload.file').delete({
//             where: { id: fileId },
//         });

//         strapi.plugins.upload.services.upload.remove(fileEntry);
//     }
// }

