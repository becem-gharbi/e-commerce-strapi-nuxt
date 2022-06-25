export default async function ({ store }) {
    if (!store.state.country) {
        await store.dispatch("init");
    }
}