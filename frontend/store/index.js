import countries from "@/assets/countries.json";

export const state = () => ({
    initialized: false,
    country: '',
    states: [],
    currency: 'undefined',
    categories: [],
})

export const actions = {

    async init({ commit }) {

        try {

            let res = await this.$axios.get("/categories");
            const categories = res.data.data;
            commit('SET_CATEGORIES', categories);

            res = await this.$axios.get(`https://ipinfo.io/?token=${process.env.IPINFO_TOKEN}`);
            const countryCode = res.data.country;

            for (let el of countries) {
                if (el.iso2 === countryCode) {
                    commit('SET_COUNTRY', el.name);
                    commit('SET_STATES', el.states.flatMap(el => el.name));
                    commit('SET_CURRENCY', el.currency);
                    break;
                }
            }

            commit('SET_INITIALIZED', true);
        }
        catch (err) {
            commit('SET_INITIALIZED', false);
        }
    },
}

export const mutations = {
    SET_INITIALIZED(state, initialized) { state.initialized = initialized },
    SET_COUNTRY(state, country) { state.country = country },
    SET_STATES(state, states) { state.states = states },
    SET_CURRENCY(state, currency) { state.currency = currency },
    SET_CATEGORIES(state, categories) { state.categories = categories },
}
