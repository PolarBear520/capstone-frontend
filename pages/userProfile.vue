<template>
  <AppHeader></AppHeader>

  <div class="profile-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10" v-if="user">
    <form @submit.prevent="updateUserProfile">
      <div class="profile-header">
        <div class="profile-pic-placeholder"></div>
        <input v-model="user.username" class="username-edit" placeholder="Username">
      </div>
      <div class="profile-details">
        <input v-model="user.email" class="email-edit" placeholder="Email">
        <div>
          <label>Roles (comma separated):</label>
          <input v-model="rolesString" placeholder="Roles">
        </div>
      </div>
      <button type="submit" class="update-profile-button">Update Profile</button>
    </form>
    <router-link v-if="isCurrentUser" to="/edit-profile" class="edit-profile-button">Edit Profile</router-link>
  </div>
  <p v-else>No user information available.</p>

  <AppBottom></AppBottom>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

const user = ref(null);
const userId = 123; // Assume we get this from the route or auth state
const isCurrentUser = true; // Determine if the logged-in user is viewing their own profile

const rolesString = computed({
  get: () => user.value?.roles.join(', '),
  set: (newVal) => {
    if (user.value) {
      user.value.roles = newVal.split(',').map(role => role.trim());
    }
  }
});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    user.value = response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
});

const updateUserProfile = async () => {
  try {
    const updatedData = {
      username: user.value.username,
      email: user.value.email,
      roles: user.value.roles
    };
    const response = await axios.put(`/api/users/${userId}`, updatedData);
    console.log('Profile updated:', response.data);
    // Optionally, you can refresh the user data here
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
}
.username-edit, .email-edit {
  font-size: 20px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
}
.update-profile-button {
  margin-top: 20px;
  color: #007BFF;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #007BFF;
  border-radius: 5px;
}
.update-profile-button:hover {
  background-color: #007BFF;
  color: white;
}
</style>
