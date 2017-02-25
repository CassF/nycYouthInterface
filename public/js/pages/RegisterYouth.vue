<template>
    <main-layout>
        <div class="row " id="titleRegister">
            <div class="container">
                <div class="title">
                    <h2>Register Youth</h2>
                </div>
                <div v-if="!formSubmitted" @submit.prevent="submitForm()">
                    <form class="col s12">
                        <div class="row">
                            <label for="firstName">First Name</label>
                            <div class="input-field col s6">
                                <input v-model="firstName" id="firstName" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <label for="lastName">Last Name</label>
                            <div class="input-field col s6">
                                <input v-model="lastName" id="lastName" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <label for="balance">Amount</label>
                            <div class="input-field col s12">
                                <input v-model="balance" id="balance" type="text">
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
                firstName: '',
                lastName: '',
                balance: '',
                formSubmitted: false
            }
        },
        methods: {
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
                api.callApi({ method: 'POST', path: '/api/nyc', params: { firstName: this.firstName, lastName: this.lastName, balance: this.balance } })
                    .then(result => {
                        //redirecting to the view registered youth page
                        window.location.href = "/registered-youth";
                    })
                    .catch(err => {
                        console.log(error);
                    });
            }
        }
    }

</script>