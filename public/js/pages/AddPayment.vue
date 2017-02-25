<template>
    <main-layout>
        <div class="row " id="titleRegister">
            <div class="container">
                <div class="title">
                    <h1>Make Payment</h1>
                </div>
                <div v-if="!formSubmitted" @submit.prevent="submitForm()">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <input v-model="date" id="date" type="date" class="datepicker">
                            </div>
                        </div>
                        <div class="row">
                            <label for="amount">Amount</label>
                            <div class="input-field col s12">
                                <input v-model="amount" id="amount" type="text">
                            </div>
                        </div>
                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                        <p id="scroll"></p>
                    </form>
                </div>
                <div v-else>
                    <h1 class="submitted">Form submitted successfully!</h1>
                </div>
            </div>
        </div>
    </main-layout>
</template>


<script>
    import MainLayout from '../layouts/Main.vue'
    const api = require("../services/Api");
    //VueRecaptcha
    export default {
        components: {
            MainLayout
        },
        data: function () {
            return {
                date: '',
                amount: '',
                youth_Id: '',
                formSubmitted: false
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
            /**
            * Validating the form before submitting
            **/
            validateBeforeSubmit(e) {
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    this.submitForm()
                }
            },
            /**
             * Submitting the form to the db
             * */
            submitForm() {
                this.formSubmitted = true;
                let youthUrl = this.getUrlParameters();
                this.youth_Id = youthUrl.youth_id;
                api.callApi({ method: 'POST', path: '/api/nyc/pay', params: { date: this.date, amount: this.amount, youth_Id: this.youth_Id } })
                    .then(result => {
                        //redirecting to the view registered youth page
                        window.location.href = "/registered-youth";
                    })
                    .catch(err => {
                        //FIXXX
                        // window.location.href = "/registered-youth";
                        console.log(error);
                    });
            }
        }
    }

</script>