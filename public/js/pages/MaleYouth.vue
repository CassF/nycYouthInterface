<template>
    <main-layout>
        <div class="left">
            <a href="/registered-youth"> <img class="logo" src="images/back.png"></a>
        </div>
        <div class="container">
            <div class="title">
                <h1>Males</h1>
            </div>
            <div class="row">
                <div class="col s6">
                    <h2 style="text-align: left;"> Count: {{ youthArray.length }}</h2>
                </div>
            </div>
            <table class="striped" name="course-table">
                <thead>
                    <tr>
                        <th data-field="firstName">First Name</th>
                        <th data-field="LastName">Last Name</th>
                        <th data-field="LastName">Total Balance</th>
                        <th data-field="LastName">View All Payments</th>
                        <th data-field="LastName">Make A Payment</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="details in youthArray">
                        <td>{{details[0]}}</td>
                        <td>{{details[1]}}</td>
                        <td>£{{details[2]}}</td>
                        <td>
                            <button type="button" class="btn waves-effect waves-light" v-on:click="youthsPaymentDetails(details[3])">Payments</button>
                        </td>
                        <td>
                            <button type="button" class="btn waves-effect waves-light" v-on:click="addPayment(details[3])">Add Payment</button>
                        </td>
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
                firstName: [],
                lastName: [],
                youthArray: [],
                balance: []
            }
        },
        methods: {
            //redirecting to the profile page of the student and passing their id in the url
            allYouth: function (id) {
                let youth_id = `?youth_id=${id}`;
                window.location.href = `/youthprofile${youth_id}`;
            },
            youthsPaymentDetails: function (id) {
                let youth_id = `?youth_id=${id}`;
                window.location.href = `/payments${youth_id}`;
            },
            addPayment: function (id) {
                let youth_id = `?youth_id=${id}`;
                window.location.href = `/addpayment${youth_id}`;
            }
        },
        beforeMount: function () {
            api.callApi({ method: 'GET', path: '/api/nyc/males' })
                .then((result) => {
                    let youth = JSON.parse(result.body).maleYouth;
                    //access the array
                    for (let i in youth) {
                        this.youthArray.push([youth[i].firstName, youth[i].lastName, youth[i].balance, youth[i]._id]);
                        // }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

</script>