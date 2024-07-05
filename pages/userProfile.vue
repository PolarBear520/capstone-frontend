<template>
  <AppHeader></AppHeader>

  <div class="profile-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10">
    <div class="profile-header" v-if="user">
      <div class="profile-pic-placeholder"></div>
      <h2 class="username">{{ user.username }}</h2>
    </div>
    <div class="profile-details" v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Joined:</strong> {{ user.joined }}</p>
      <p><strong>Bio:</strong> {{ user.bio }}</p>
      <p><strong>Seller Rating:</strong> {{ user.sellerRating }} / 5</p>
      <p><strong>Buyer Rating:</strong> {{ user.buyerRating }} / 5</p>
    </div>
    <router-link v-if="isCurrentUser" to="/edit-profile" class="edit-profile-button">Edit Profile</router-link>
    <p v-else>No user information available.</p>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppBottom from '@/components/AppBottom'

export default {
  components: {
    AppHeader,
    AppBottom
  },
  data() {
    return {
      // 示例数据
      user: {
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        joined: '2023-01-01',
        bio: 'This is a short bio about John Doe.',
        sellerRating: 4.5,
        buyerRating: 4.8
      },
      isCurrentUser: true // 设置为 true 表示查看当前用户的资料，设置为 false 表示查看其他用户的资料
    };
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px; /* 调整最大宽度 */
  margin: 0 auto;
  padding: 40px; /* 增加内容的填充 */
  height: auto; /* 自动调整高度 */
}
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.profile-pic-placeholder {
  width: 120px; /* 调整宽度 */
  height: 120px; /* 调整高度 */
  border-radius: 50%;
  background-color: black; /* 黑色圆圈 */
  margin-bottom: 20px; /* 与用户名的间距 */
}
.username {
  font-size: 28px;
  color: #333;
}
.profile-details {
  margin-top: 20px;
}
.profile-details p {
  font-size: 20px;
  color: #666;
  margin: 10px 0;
}
.edit-profile-button {
  display: block;
  text-align: center;
  margin-top: 30px;
  color: #007BFF;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #007BFF;
  border-radius: 5px;
}
.edit-profile-button:hover {
  background-color: #007BFF;
  color: white;
  text-decoration: none;
}
</style>
