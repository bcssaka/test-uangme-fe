<template>
  <div>
    <h2>User Registration</h2>
    <form @submit.prevent="register">
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
      <div>
        <label>Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" v-model="phone_number" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" v-model="password_confirmation" required />
      </div>
      <div>
        <label>Place of Birth:</label>
        <input type="text" v-model="place_of_birth" required />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" v-model="date_of_birth" required />
      </div>
      <div>
        <label>ID Number:</label>
        <input type="text" v-model="id_number" required />
      </div>
      <div>
        <label>ID Photo:</label>
        <input type="file" @change="handleFileUpload" required />
      </div>
      <div>
        <label>Monthly Income:</label>
        <input type="number" v-model="monthly_income" required />
      </div>
      <div>
        <label>Role:</label>
        <select v-model="role" required>
          <option value="lender">Lender</option>
          <option value="borrower">Borrower</option>
        </select>
      </div>
      <div v-if="role === 'lender'">
        <label>Tax ID Number:</label>
        <input type="text" v-model="tax_id_number" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRegistration",
  data() {
    return {
      name: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
      place_of_birth: "",
      date_of_birth: "",
      id_number: "",
      id_photo: null,
      monthly_income: "",
      role: "",
      tax_id_number: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.id_photo = event.target.files[0];
    },
    async register() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.password_confirmation);
      formData.append("role", this.role);
      formData.append("place_of_birth", this.place_of_birth);
      formData.append("date_of_birth", this.date_of_birth);
      formData.append("phone_number", this.phone_number);
      formData.append("id_number", this.id_number);
      formData.append("id_photo", this.id_photo);
      formData.append("monthly_income", this.monthly_income);
      if (this.role === "lender") {
        formData.append("tax_id_number", this.tax_id_number);
      }

      try {
        const response = await axios.post("/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Registration successful:", response.data);
        this.errorMessage = ""; // Clear error message if successful
        this.successMessage = "Registration successful! Redirecting to login...";
        setTimeout(() => {
          this.$router.push("/login"); // Redirect to login after 2 seconds
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || "Registration failed";
        } else {
          this.errorMessage = "An error occurred. Please try again.";
        }
        this.successMessage = ""; // Clear success message if there's an error
      }
    },
  },
};
</script>
<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>
