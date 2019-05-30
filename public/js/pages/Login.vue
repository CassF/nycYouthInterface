<template>
  <div class="col-sm-4 col-sm-offset-4">
    <div class="container">
      <h2>Log In</h2><br><br>
      <h5 id="error"></h5>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Enter your username" v-model="credentials.username">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
      </div>
      <button class="btn btn-primary waves-effect waves-light right" @click="login(credentials.password, credentials.username)">Access</button>
    </div>
  </div>
</template>
<script>
  import auth from '../auth'
  const api = require("../services/Api");
  const jwt = require('jsonwebtoken');
  
  export default {
    data() {
      return {
        credentials: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      submit() {
        let credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
      },
      login(pw, user) {
        console.log(pw);
        console.log(user);

        api.callApi({ method: 'POST', path: "api/nyc/secure", 
                              params: {password: pw, username: user} 
        })
        .then((result) => { // if successful login --> result.body = true
            if(result.body === 'true'){
              let token = jwt.sign('token', 'somethingnotobvious')
              this.$cookie.set('token', token, 1);
              window.location.href= "/";  
            }else{
              $("#error").html("Please enter a correct username and password!").css("color", "red");
            }
        })
      },
    }
  }
  </script>