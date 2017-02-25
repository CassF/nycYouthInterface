// import Vue from 'vue';
// import VueRouter from 'vue-resource';
// import routes from './routes';
// import moment from 'moment';
// import Datepicker from 'vuejs-datepicker';
// import VeeValidate from 'vee-validate';


// const VueCookie = require('vue-cookie');

// exports.install = function (Vue, options) {
//     Vue.prototype.moment = function (...args) {
//         return moment(...args);
//     };
// };

// Vue.filter('formatDate', function(value) {
//   if (value) {
//     return moment(String(value)).format('MM/DD/YYYY')
//   }
// });

// Vue.component('my-component', {
//     components: {
//         Datepicker
//     }
// });

// Vue.use(exports);
// Vue.use(VueRouter);
// Vue.use(VeeValidate);
// Vue.use(VueCookie);


// window.Vue = Vue;

// const app = new Vue({
//     el: '#app',
//     data: {
//         currentRoute: window.location.pathname
//     },
//     computed: {
//         ViewComponent () {
//             const matchingView = routes[this.currentRoute];
//             return matchingView
//                 ? require('./pages/' + matchingView + '.vue')
//                 : require('./pages/404.vue')
//         }
//     },
//     render (h) {
//         return h(this.ViewComponent);
//     }
// });

// window.addEventListener('popstate', () => {
//     app.currentRoute = window.location.pathname;
// });


import Vue from 'vue';
import VueRouter from 'vue-resource';
import routes from './routes';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import VeeValidate from 'vee-validate';
const VueCookie = require('vue-cookie');

exports.install = function (Vue, options) {
    Vue.prototype.moment = function (...args) {
        return moment(...args);
    };
};

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});

Vue.component('my-component', {
    components: {
        Datepicker
    }
});

Vue.use(exports);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueCookie);
const jwt = require('jsonwebtoken');

window.Vue = Vue;

const app = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname,
        x: false
    },

    computed: {
        ViewComponent () {
            const matchingView = routes[this.currentRoute];
            if(matchingView == 'Login'){
                return matchingView
                    ? require('./pages/' + matchingView + '.vue')
                    : require('./pages/404.vue')
            }
            else{
                let token = this.$cookie.get('token');
                try{    // redirect to login when we dont have a token
                    var decoded =  jwt.verify(token, 'somethingnotobvious');
                    return matchingView
                    ? require('./pages/' + matchingView + '.vue')
                    : require('./pages/404.vue')
                }catch(err){
                    return matchingView
                    ? require('./pages/Login.vue')
                    : require('./pages/404.vue')
                }
            }
        }
    },
    render (h) {
        return h(this.ViewComponent);
    }
});

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname;
});