<template>
  <div>
    <h2>Welcome to Our Application</h2>
    <p>This is the home page.</p>
    <p>
      Please <router-link to="/register">register</router-link> or
      <router-link to="/login">login</router-link> to continue.
    </p>
  </div>
</template>

<script>
export default {
  name: "UserHome",
};
</script>

<style scoped>
h2 {
  color: #42b983;
}
</style>
