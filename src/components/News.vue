<template>
  <div class="news-container">
    <h2>Latest VNExpress News</h2>
    <div id="news-list">
      <p v-if="loading">Loading news...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <div v-if="!loading && !error">
        <div v-for="(item, index) in news" :key="index" class="news-item">
          <a :href="item.link" target="_blank">
            <img v-if="item.image" :src="item.image" alt="news image" />
            {{ item.title }}
          </a>
        </div>
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
        this.news = Array.from(items).slice(0, 5).map(item => {
          const title = item.querySelector("title").textContent;
          const link = item.querySelector("link").textContent;

          const mediaContent = item.querySelector("media\\:content");
          const mediaThumbnail = item.querySelector("media\\:thumbnail");
          const enclosure = item.querySelector("enclosure");

          let image = "";
          if (mediaContent) {
            image = mediaContent.getAttribute("url");
          } else if (mediaThumbnail) {
            image = mediaThumbnail.getAttribute("url");
          } else if (enclosure && enclosure.getAttribute("type").startsWith("image")) {
            image = enclosure.getAttribute("url");
          }

          return { title, link, image };
        });

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
