const modKeys = ["id", "title", "author", "description"]
export const STORAGE_KEY = 'inteach-app' // Maybe you want to persist data in LocalStorage

export const state = {
    modules: [],
    progress: 0,
    consent: false
}

export const mutations = {
    CONSENT(state) {
        state.consent = true;
    },

    FETCH_MODULE(state) {
        fetch('/modules.json')
            .then((result) => result.json())
            .then((data) => {
                if ('modules' in data) { // Trivial check for now
                    state.modules = data.modules
                }
            })
            .catch(() => {
                state.modules = []
            })
    },

    LOAD_DATA(state, { data }) {
        state.progress = 0
        let increment = 100 / data.length
        data.forEach(element => {
            if (modKeys.every((key) => { return key in element })) {
                state.modules.push(element)
                state.progress += increment
            }
        })
    },

    ADD_MOD(state, module) {
        state.modules.push(module)
    },

    DEL_MOD(state, module) {
        state.modules = state.modules.filter((item) => {
            return item.id != module.id
        })
    },

    UPDATE_MOD(state, module) {
        let l = state.modules.length
        for (let index = 0; index < l; index++) {
            if (state.modules[index].id == module.id) {
                state.modules[index] = module
            }
            break
        }
    }
}

export const actions = {
    giveConsent({ commit }) {
        commit('CONSENT')
    },

    fetchModule({ commit }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit('FETCH_MODULE')
                resolve();
            }, 1400);
        })
    },

    loadData({ commit }, payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit('LOAD_DATA', payload)
                resolve()
            }, 1400);
        })
    },

    addMod({ commit }, payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit('ADD_MOD', payload)
                resolve()
            }, 1400);
        })
    },

    updateMod({ commit }, module) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit('UPDATE_MOD', module)
                resolve()
            }, 1400);
        })
    },

    removeMod({ commit }, module) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit('DEL_MOD', module)
                resolve()
            }, 800);
        })
    },
}

export const getters = {
    modules: state => {
        return state.modules
    },

    modulesCount: state => {
        return state.modules.length
    },

    userConsent: state => {
        return state.consent
    },

    progress: state => {
        return state.progress
    }
}