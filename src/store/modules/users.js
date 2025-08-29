import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        usersList: [],
        totalPages: 0,
        currentPage: 1,
        loading: false,
    }),
    getters: {
        usersList: (state) => state.usersList,
        canLoadMore: (state) => state.currentPage < state.totalPages,
        isLoading: (state) => state.loading,
    },
    mutations: {
        setUsers(state, users) {
            state.usersList = users;
        },
        addUsers(state, users) {
            state.usersList.push(...users);
        },
        setLoading(state, value) {
            state.loading = value;
        },
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setTotalPages(state, total) {
            state.totalPages = total;
        },
    },
    actions: {
        async fetchUsers({ commit, state }, { nextPage = false } = {}) {
            commit('setLoading', true);
            try {
                const page = nextPage ? state.currentPage + 1 : 1;
                const count = 6;
                const res = await axios.get(
                    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`
                );

                if (nextPage) {
                    commit('addUsers', res.data.users);
                } else {
                    commit('setUsers', res.data.users);
                }
                commit('setCurrentPage', page);
                commit('setTotalPages', res.data.total_pages);
            } finally {
                commit('setLoading', false);
            }
        },
    },
};
