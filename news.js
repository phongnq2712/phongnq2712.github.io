async function fetchNews() {
    const url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://vnexpress.net/rss/tin-moi-nhat.rss");

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching news.");

        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");

        const items = xmlDoc.querySelectorAll("item");
        let newsHtml = "";

        items.forEach((item, index) => {
            if (index < 5) {
                const title = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;
                newsHtml += `<p><a href="${link}" target="_blank">${title}</a></p>`;
            }
        });

        document.getElementById("news-list").innerHTML = newsHtml;
    } catch (error) {
        document.getElementById("news-list").innerHTML = "Error fetching news.";
    }
}
