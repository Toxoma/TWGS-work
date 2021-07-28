import {
  createStore
} from 'vuex';

import axios from "axios";


export default createStore({
  state: {
    contacts: [],
    selectedContact: {},
  },
  mutations: {
    SET_CONTACTS: (state, payload) => {
      state.contacts = payload;
    },
    ADD_CONTACT: (state, data) => {
      state.contacts.push(data);
    },
    ADD_LINE: (state, data) => {
      state.selectedContact[data.name] = data.value;
    },
    DELETE_CONTACT: (state, data) => {
      const ind = state.contacts.findIndex(el => el === data);
      state.contacts.splice(ind, 1);
    },
    DELETE_LINE: (state, data) => {
      delete state.selectedContact[data[0]];
    },
    SELECT_CONTACT: (state, data) => {
      state.selectedContact = data;
    },
    RETURN_LINE: (state, data) => {
      state.selectedContact = data;
    },
    CHANGE_LINE: (state, data) => {
      const key = data[0];
      const info = data[1];

      if (key === info[0]) {
        state.selectedContact[key] = info[1];
      } else {
        delete state.selectedContact[key];
        state.selectedContact[info[0]] = info[1];
      }
    },
  },
  actions: {
    getContacts({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios
          .get("https://jsonplaceholder.typicode.com/users/")
          .then(response => {
            commit("SET_CONTACTS", response.data);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addNewContact({
      commit
    }, data) {
      commit("ADD_CONTACT", data);
    },
    addNewLine({
      commit
    }, data) {
      commit("ADD_LINE", data);
    },
    deleteContact({
      commit
    }, data) {
      commit("DELETE_CONTACT", data);
    },
    deleteLine({
      commit
    }, data) {
      commit("DELETE_LINE", data);
    },
    selectContact({
      commit
    }, data) {
      commit("SELECT_CONTACT", data);
    },
    changeUserLine({
      commit
    }, data) {
      commit("CHANGE_LINE", data);
    },
    returnBehind({
      commit
    }, data) {
      commit("RETURN_LINE", data);
    },
  },
  modules: {}
});