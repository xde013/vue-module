import { resolve } from "path";
const modKeys = ["id", "title", "author", "description"]
export const STORAGE_KEY = 'inteach-app' // Maybe you want to persist data in LocalStorage

export const state = {
    modules: [],
    progress: 0,
    firstVisit: true,
}

export const mutations = {
    VISIT(state) {
        state.firstVisit = false;
    },

    FETCH_MODULE(state) {
        fetch('/modules.json')
            .then((r) => {
                return r.json()
            })
            .then((data) => {
                if ('modules' in data) { // Trivial check for now
                    state.modules = data.modules
                }
            })
            .catch(err => {
                console.log(err)
                state.modules = []
            })
    },

    LOAD_DATA(state, { data }) {
        console.log("Action dispatched and mutation commited..")
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
    visit({ commit }) {
        commit('VISIT')
    },

    fetchModule({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('FETCH_MODULE')
                resolve();
            }, 1400);
        })
    },

    loadData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('LOAD_DATA', payload)
                resolve()
            }, 1400);
        })
    },

    addMod({ commit }, payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('ADD_MOD', payload)
                console.log('Mutation commited..')
                resolve()
            }, 1400);
        })
    },

    updateMod({ commit }, module) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('UPDATE_MOD', module)
                resolve()
            }, 1400);
        })
    },

    removeMod({ commit }, module) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('DEL_MOD', module)
                resolve()
            }, 800);
        })
    },
}

export const getters = {
    visit: state => {
        return state.firstVisit
    },

    modules: state => {
        return state.modules
    },

    modulesCount: state => {
        return state.modules.length
    },

    progress: state => {
        return state.progress
    }
}