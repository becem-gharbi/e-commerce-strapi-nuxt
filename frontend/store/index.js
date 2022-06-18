import qs from "qs";

export const state = () => ({
    products: {},
    product: {},
})

export const getters = {

    product(state) {
        if (!state.product.id) return {};
        return {
            id: state.product.id,
            name: state.product.attributes.name,
            description: state.product.attributes.description,
            price: state.product.attributes.price,
            image: state.product.attributes.image.data
                ? state.product.attributes.image.data.attributes.url
                : require("assets/no_image.png"),
            user: {
                fullname: state.product.attributes.user.data.attributes.fullname,
                email: state.product.attributes.user.data.attributes.email,
                facebookLink: state.product.attributes.user.data.attributes.facebookLink,
                state: state.product.attributes.user.data.attributes.location.state,
                image: getFileUrl(state.product.attributes.user.data.attributes.image.data)
            },
            category: {
                id: state.product.attributes.category.data.id,
                name: state.product.attributes.category.data.attributes.name
            }
        }
    },

    products(state) {
        if (!state.products.data) return {};
        let data = [];
        state.products.data.forEach(product => {
            data.push({
                id: product.id,
                name: product.attributes.name,
                price: product.attributes.price,
                image: getFileUrl(product.attributes.image.data),
                createdAt: product.attributes.createdAt,
            })
        });
        return {
            data, pagination: {
                page: state.products.meta.pagination.page,
                pageCount: state.products.meta.pagination.pageCount
            }
        };
    }
}

export const actions = {

    async getProducts({ commit }, params = {}) {
        const query = qs.stringify({
            ...params,
            populate: {
                image: "*",
            },
            sort: ["updatedAt:desc"],
        });

        const res = await this.$axios.get("/products?" + query);
        commit('SET_PRODUCTS', res.data);
    },

    async getProduct({ commit }, productId) {
        const query = qs.stringify({
            populate: {
                image: "*",
                category: "*",
                user: {
                    populate: ["image", "location"],
                },
            },
            sort: ["updatedAt:desc"],
        });

        const res = await this.$axios.get(`/products/${productId}?` + query);
        commit('SET_PRODUCT', res.data.data);
    },

    async deleteProduct({ commit }, productId) {
        this.$swal
            .fire({
                title: "<p class='h2'>Delete product</p>",
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    await this.$axios.delete(`/products/${productId}`);
                    await commit('DELETE_PRODUCT', productId)
                }
            });
    },
}

export const mutations = {
    SET_PRODUCTS(state, products) { state.products = products },
    SET_PRODUCT(state, product) { state.product = product },
    DELETE_PRODUCT(state, productId) {
        state.products.data = state.products.data.filter((product) => product.id !== productId);
    },
}

function getFileUrl(data) {
    if (data) {
        if (process.env.NODE_ENV === 'production') {
            return data.attributes.url;
        }
        return `${process.env.STRAPI_URL}${data.attributes.url}`
    }
    require("assets/no_profile.svg");
}