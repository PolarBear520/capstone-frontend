<template>
  <div class="container">
    <h2>使用 GPT-4 进行图像识别</h2>
    <input v-model="imageUrl" placeholder="输入图片URL" />
    <button @click="recognizeImage">识别图像</button>
    <div v-if="response">
      <h3>识别结果：</h3>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageUrl: '',
      response: null
    };
  },
  methods: {
    async recognizeImage() {
      const apiKey = 'sk-proj-cM7QTrmVjNmPXwkjYWeZT3BlbkFJFi2u2TlmBNjzlOuvIiiZ'; // 替换为您的实际 OpenAI API 密钥
      const apiUrl = 'https://api.openai.com/v1/chat/completions';

      const data = {
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: "This is an image of a product that a user wants to list on a second-hand trading website. Generate an accurate and appealing product description based on this image, aimed at providing potential buyers with clear and precise information, without exaggeration." },
              { type: 'image_url', image_url: { url: this.imageUrl } }
            ]
          }
        ],
        max_tokens: 300
      };

      try {
        const response = await axios.post(apiUrl, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });
        this.response = response.data.choices[0].message.content;
      } catch (error) {
        console.error('Error recognizing image:', error);
        alert('识别图片失败。');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
input {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
}
button {
  padding: 10px 20px;
  margin: 10px 0;
}
</style>
