export default function sitemap() {
  const base = "https://dogfood.bot";
  const today = new Date().toISOString();

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "daily" },
    {
      url: "/cheap-dog-food-near-me",
      priority: 0.9,
      changeFrequency: "weekly",
    },
    { url: "/best-dry-dog-food", priority: 0.85, changeFrequency: "weekly" },
    { url: "/grain-free-dog-food", priority: 0.85, changeFrequency: "weekly" },
    { url: "/dog-food-recall-list", priority: 0.9, changeFrequency: "daily" },
    { url: "/puppy-food-comparison", priority: 0.8, changeFrequency: "weekly" },
    { url: "/senior-dog-food-guide", priority: 0.8, changeFrequency: "weekly" },
    { url: "/chewy-vs-petsmart", priority: 0.85, changeFrequency: "weekly" },
    { url: "/wet-dog-food-brands", priority: 0.8, changeFrequency: "weekly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: today,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
