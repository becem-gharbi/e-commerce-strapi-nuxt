export default async function ({ store }) {
    if (!store.state.initialized) {
        await store.dispatch("init");
    }
}