<template>
    <div>
        <nav>
            <div class="nav-wrapper">

                <v-link href="/">
                </v-link>
                <ul id="nav-mobile" class="right">
                    <li>
                        <v-link href="/">Home</v-link>
                    </li>
                    <li>
                        <v-link href="/register">Register A Youth</v-link>
                    </li>
                    <li>
                        <v-link href="/registered-youth">View Registered Youth</v-link>
                    </li>
                    <li @click="deleteToken()">
                        <v-link href="/">Logout</v-link>
                    </li>
                </ul>
            </div>
        </nav>

        <slot></slot>
    </div>
</template>

<script>
    import VLink from '../components/VLink.vue'

    export default {
        components: {
            VLink
        },
        methods: {
            deleteToken: function () {
                this.$cookie.delete('token');
                window.location.href = '/login'
            }
        }
    }

</script>