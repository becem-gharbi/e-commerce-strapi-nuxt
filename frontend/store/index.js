import countriesAndStates from "~/static/countries+states.json";

export const state = () => ({
    states: [],
    country: '',
    categories: [],
    currency: 'undefined'
})

export const actions = {

    async init({ commit }) {
        console.log('Init Store');

        let res = await this.$axios.get("/categories");
        const categories = res.data.data;
        commit('SET_CATEGORIES', categories);

        res = await this.$axios.get('https://get.geojs.io/v1/ip/country.json');
        const country = res.data.name;
        commit('SET_COUNTRY', country);

        for (let el of countriesAndStates) {
            if (el.name === country) {
                commit('SET_STATES', el.states.flatMap(el => el.name));
                break;
            }
        }

        for (let el of countriesAndStates) {
            if (el.name === country) {
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
