<template>
    <div>
      <h2>Investment History</h2>
      <table>
        <thead>
          <tr>
            <th>Investment Date</th>
            <th>Amount</th>
            <th>Bank</th>
            <th>VA Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="investment in investments" :key="investment.id">
            <td>{{ new Date(investment.created_at).toLocaleDateString() }}</td>
            <td>{{ investment.amount }}</td>
            <td>{{ investment.bank }}</td>
            <td>{{ investment.va_number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserInvestHistory',
    data() {
      return {
        investments: [],
      };
    },
    async created() {
      try {
        const response = await axios.get('/investments');
        this.investments = response.data;
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add styles if needed */
  </style>
  