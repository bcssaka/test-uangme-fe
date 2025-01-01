<template>
    <div>
      <h2>Invest</h2>
      <form @submit.prevent="invest">
        <div>
          <label>Amount:</label>
          <input type="number" v-model="amount" required />
        </div>
        <div>
          <label>Bank:</label>
          <select v-model="bank" required>
            <option value="BCA">BCA</option>
            <option value="BRI">BRI</option>
            <option value="BNI">BNI</option>
            <option value="Mandiri">Mandiri</option>
          </select>
        </div>
        <button type="submit">Invest</button>
        <div v-if="vaNumber">VA Number: {{ vaNumber }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserInvest',
    data() {
      return {
        amount: '',
        bank: 'BCA',
        vaNumber: '',
      };
    },
    methods: {
      async invest() {
        try {
          const response = await axios.post('/invest', {
            amount: this.amount,
            bank: this.bank,
          });
          this.vaNumber = response.data.va_number;
        } catch (error) {
          console.error('Error investing:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  