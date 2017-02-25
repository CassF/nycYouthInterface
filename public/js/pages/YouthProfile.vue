<template>
    <main-layout>
        <div class="container">
            <ul>
                <li> First Name: {{firstName}}</li>
                <li> Last Name: {{lastName}}</li>
                <li> Balance: {{balance}}</li>
                <button type="button" class="btn waves-effect waves-light" v-on:click="allYouthsPayments(id)">View</button>
            </ul>
        </div>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    const api = require("../services/Api");
    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                firstName: '',
                lastName: '',
                balance: ''
            }
        },
        methods: {
            getUrlParameters: function (url) {
                // get query string from url (optional) or window
                var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

                // we'll store the parameters here
                var obj = {};

                // if query string exists
                if (queryString) {

                    // stuff after # is not part of query string, so get rid of it
                    queryString = queryString.split('#')[0];

                    // split our query string into its component parts
                    var arr = queryString.split('&');

                    for (var i = 0; i < arr.length; i++) {
                        // separate the keys and the values
                        var a = arr[i].split('=');

                        // in case params look like: list[]=thing1&list[]=thing2
                        var paramNum = undefined;
                        var paramName = a[0].replace(/\[\d*\]/, function (v) {
                            paramNum = v.slice(1, -1);
                            return '';
                        });

                        // set parameter value (use 'true' if empty)
                        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                        // (optional) keep case consistent
                        // paramName = paramName.toLowerCase();
                        // paramValue = paramValue.toLowerCase();

                        // if parameter name already exists
                        if (obj[paramName]) {
                            // convert value to array (if still string)
                            if (typeof obj[paramName] === 'string') {
                                obj[paramName] = [obj[paramName]];
                            }
                            // if no array index number specified...
                            if (typeof paramNum === 'undefined') {
                                // put the value on the end of the array
                                obj[paramName].push(paramValue);
                            }
                            // if array index number specified...
                            else {
                                // put the value at that index number
                                obj[paramName][paramNum] = paramValue;
                            }
                        }
                        // if param name doesn't exist yet, set it
                        else {
                            obj[paramName] = paramValue;
                        }
                    }
                }
                return obj;
            },
            //redirecting to the profile page of the student and passing their id in the url
            allYouth: function (id) {
                let youth_id = `?youth_id=${id}`;
                window.location.href = `/payments${youth_id}`;
            }
        },
        beforeMount: function () {
            let youthUrl = this.getUrlParameters();
            api.callApi({ method: 'GET', path: `/api/nyc/${youthUrl.youth_id}` })
                .then((result) => {
                    let myObj = JSON.parse(result.body).youthsDetails;
                    this.firstName = myObj.firstName;
                    this.lastName = myObj.lastName;
                    this.balance = myObj.balance;
                    this.id = myObj.id;

                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

</script>