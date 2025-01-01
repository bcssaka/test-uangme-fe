<template>
  <div>
    <h2>User Profile</h2>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Phone: {{ user.phone_number }}</p>
      <p>Role: {{ user.role }}</p>
      <p v-if="user.role === 'Borrower'">Loan Limit: {{ loanLimit }}</p>
      <!-- Display Loan Limit -->

      <button @click="logout">Logout</button>
      <!-- Logout Button -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      user: null,
      loanLimit: 0,
    };
  },
  async created() {
    try {
      const response = await axios.get("/profile");
      this.user = response.data;

      if (this.user.role === "Borrower") {
        this.calculateLoanLimit();
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  },
  methods: {
    calculateLoanLimit() {
      this.loanLimit = (this.user.monthly_income * 0.3).toFixed(2); // Calculate loan limit
    },
    async logout() {
      try {
        await axios.post("/logout");
        localStorage.removeItem("token"); // Remove token from local storage
        delete axios.defaults.headers.common["Authorization"]; // Remove token from axios headers
        this.$router.push("/login"); // Redirect to login page
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff4b5c;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #ff7b8a;
}
</style>
