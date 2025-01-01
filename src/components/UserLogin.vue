<template>
  <div>
    <h2>User Login</h2>
    <form @submit.prevent="login">
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
      <div>
        <label>Phone Number:</label>
        <input type="tel" v-model="phone_number" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      phone_number: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", {
          phone_number: this.phone_number,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token); // Store token in local storage
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set token for axios requests
        console.log("Login successful:", response.data);
        this.errorMessage = ""; // Clear error message if successful
        this.successMessage = 'Login successful! Redirecting...';

        setTimeout(() => {
          this.$router.push("/profile"); 
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || "Login failed";
        } else {
          this.errorMessage = "An error occurred. Please try again.";
        }
        this.successMessage = ''; // Clear success message if there's an error
      }
    },
  },
};
</script>

<style scoped> .error { color: red; margin-top: 10px; } .success { color: green; margin-top: 10px; } </style>