import countries from "@/assets/countries.json";

export const state = () => ({
    country: '',
    states: [],
    currency: 'undefined',
    categories: [],
})

export const actions = {

    async init({ commit }) {

        let res = await this.$axios.get("/categories");
        const categories = res.data.data;

        commit('SET_CATEGORIES', categories);

        for (let el of countries) {
            if (el.iso2 === process.env.COUNTRY_ISO2) {
                commit('SET_COUNTRY', el.name);
                commit('SET_STATES', el.states);
                commit('SET_CURRENCY', el.currency);
                break;
            }
        }

    },
}

export const mutations = {
    SET_COUNTRY(state, country) { state.country = country },
    SET_STATES(state, states) { state.states = states },
    SET_CURRENCY(state, currency) { state.currency = currency },
    SET_CATEGORIES(state, categories) { state.categories = categories },
}
