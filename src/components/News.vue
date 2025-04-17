<template>
  <div class="news-container">
    <h2>Latest VNExpress News</h2>
    <div id="news-list">
      <p v-if="loading">Loading news...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="!loading && !error">
        <p v-for="(item, index) in news" :key="index">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsFeed",
  data() {
    return {
      news: [],
      loading: true,
      error: ""
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      const url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://vnexpress.net/rss/tin-moi-nhat.rss");

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching news.");

        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");

        const items = xmlDoc.querySelectorAll("item");
        this.news = Array.from(items).slice(0, 5).map(item => ({
          title: item.querySelector("title").textContent,
          link: item.querySelector("link").textContent
        }));

        this.loading = false;
      } catch (err) {
        this.error = "Error fetching news.";
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.news-container {
  width: 600px;
  margin: 0 auto;
  text-align: left;
}
.news-container p {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.news-container a {
  text-decoration: none;
  color: #007BFF;
  font-weight: bold;
}
.error {
  color: red;
}
</style>
