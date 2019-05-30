// import {router} from '../index'
// Require dependencies 
const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL 
const SIGNUP_URL = API_URL + 'users/'
const api = require("./services/Api");
export default {
  user: {
    authenticated: false
  },

  login(creds) {
    if(creds.password === "a" && creds.username === "user"){
      location.href=API_URL;
    }
    this.$cookie.set('token', 'mytoken', 1);
  },
  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}