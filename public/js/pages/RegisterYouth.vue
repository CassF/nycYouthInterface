<template>
    <main-layout>
        <div class="row " id="titleRegister">
            <div class="title">
                <h2>Register Youth</h2>
            </div>
            <div class="container">
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
                            <div class="input-field col s6">
                                <input v-model="balance" id="balance" type="text">
                            </div>
                        </div>
                        <label>Gender</label>
                        <div class="row">
                            <div class="input-field col s12">
                                <input type="checkbox" id="test5" name="female" v-model="female" value="true" />
                                <label for="test5">Female</label>
                            </div>
                            <div class="input-field col s12">
                                <input type="checkbox" id="test6" name="male" v-model="male" value="true" />
                                <label for="test6">Male</label>
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
                female: '',
                male: '',
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
                api.callApi({ method: 'POST', path: '/api/nyc', params: { firstName: this.firstName, lastName: this.lastName, balance: this.balance, female: this.female, male: this.male } })
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