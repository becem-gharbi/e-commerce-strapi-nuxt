import countries from "@/assets/countriesDb.json";

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

            // const result = [];

            // for (let el of countries) {
            //     let states = el.states;
            //     let sanitizedStates = [];
            //     for (let i of states) {
            //         sanitizedStates.push({
            //             name: i.name
            //         })
            //     }
            //     result.push({
            //         name: el.name,
            //         iso2: el.iso2,
            //         currency: el.currency,
            //         states: sanitizedStates
            //     });
            // }

            // console.log(result);

            console.log("initialize store");

            let res = await this.$axios.get("/categories");
            const categories = res.data.data;
            commit('SET_CATEGORIES', categories);

            res = await this.$axios.get(`https://ipinfo.io/?token=${this.$config.ipInfoToken}`);
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
