<template>
    <main-layout>
        <div class="container">
            <div>
                <img class="logo" src="images/nyc17.jpg">
                <ul id="homeList">
                    <li id="viewstudent" class="homeButton center">
                        <a href="/registered-youth">
                            <button class="btn-large waves-effect waves-light">Registered Youth</button>
                        </a>
                    </li>
                    <li class="homeButton center">
                        <a href="/register">
                            <button class="btn-large waves-effect waves-light">Register A Youth</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <footer>
            <div class="footer">
                <div class="col s6 copyright right">
                    © 2016 CASSANDRA FRIMPONG.
                </div>
            </div>
        </footer>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'

    export default {
        components: {
            MainLayout
        },
        methods: {
            beforeMount: function () {
                console.log('Mounting');
            }
        }
    }

</script>