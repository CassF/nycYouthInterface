<template>
    <main-layout>
        <div class="container">
            <h3>{{firstName}} {{lastName}}</h3>
            <table class="striped" name="course-table">

                <thead>
                    <tr>
                        <th data-field="date">Date</th>
                        <th data-field="amount">Amount</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="details in youthPaymentsArray">
                        <td>{{details[0]}}</td>
                        <td>£{{details[1]}}</td>
                    </tr>
                </tbody>
            </table>

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
                date: [],
                amount: [],
                firstName:'',
                lastName: '',
                youthPaymentsArray: []
            }
        },
        methods: {
            //redirecting to the profile page of the student and passing their id in the url
            youthsPaymentDetails: function (id) {
                let youth_id = `?youth_id=${id}`;
                window.location.href = `/youthprofile${youth_id}`;
            },
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
            }
        },
        beforeMount: function () {
            let youthUrl = this.getUrlParameters();
            api.callApi({ method: 'GET', path: `/api/nyc/${youthUrl.youth_id}/pay` })
                .then((result) => {
                    let youthPD = JSON.parse(result.body).youthsPaymentDetails;
                    //access the array
                    for (let i in youthPD) {
                        this.youthPaymentsArray.push([new Date(youthPD[i].date).toISOString().slice(0, 10), youthPD[i].amount, youthPD[i]._id]);
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            api.callApi({ method: 'GET', path: `/api/nyc/${youthUrl.youth_id}` })
                .then((result) => {
                    let myObj = JSON.parse(result.body).youthsDetails;
                    this.firstName = myObj.firstName;
                    this.lastName = myObj.lastName;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

</script>