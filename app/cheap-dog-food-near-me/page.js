export const metadata = {
  title: 'Cheap Dog Food Near Me — Compare Prices by Zip Code',
  description: 'Find cheap dog food near you. Compare prices at Chewy, PetSmart, Walmart & Costco by zip code. Updated daily. Filter by brand, size, and type.',
  alternates: { canonical: 'https://dogfood.bot/cheap-dog-food-near-me' },
  openGraph: { title: 'Cheap Dog Food Near Me', url: 'https://dogfood.bot/cheap-dog-food-near-me' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Cheap Dog Food Near Me — Compare Prices by Zip Code',
      url: 'https://dogfood.bot/cheap-dog-food-near-me',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Where can I find cheap dog food near me?', acceptedAnswer: { '@type': 'Answer', text: 'DogFood.bot compares prices at Chewy, PetSmart, Walmart, and Costco in real time. Enter your zip code to see which store has the lowest price on your preferred brand and size right now.' } },
        { '@type': 'Question', name: 'What is the cheapest dog food option in 2025?', acceptedAnswer: { '@type': 'Answer', text: 'Store-brand and private-label options at Walmart and Costco are typically cheapest per pound. For national brands, Chewy auto-ship usually beats in-store prices by 5–30%.' } },
        { '@type': 'Question', name: 'Does Costco have cheaper dog food than Chewy?', acceptedAnswer: { '@type': 'Answer', text: "Costco's bulk sizes often cost less per pound than Chewy, but Chewy's auto-ship discounts (up to 35% off) can flip the math. DogFood.bot calculates cost-per-ounce across all retailers." } },
        { '@type': 'Question', name: 'How often are prices updated on DogFood.bot?', acceptedAnswer: { '@type': 'Answer', text: 'Prices are scraped and updated daily from Chewy, PetSmart, Walmart, and Costco. Sale prices and promotions are captured in real time.' } },
      ],
    },
  ],
};

const retailers = [
  { name: 'Chewy',    best: 'Premium & specialty brands',    max: 'Up to 35% (auto-ship)',   pickup: '❌ Delivery only'   },
  { name: 'Walmart',  best: 'Budget & national brands',      max: 'Up to 20% rollback',      pickup: '✅ Same-day pickup' },
  { name: 'Costco',   best: 'Bulk buying, Kirkland brand',   max: 'Up to 45% vs. retail',    pickup: '✅ In-store only'   },
  { name: 'PetSmart', best: 'Exclusive brands, Treats+',     max: 'Up to 25% (loyalty)',     pickup: '✅ Same-day pickup' },
];

const brands = [
  { icon: '🏆', name: 'Purina ONE',         desc: 'Real meat first ingredient. AAFCO complete. ~$1.20/lb at Walmart.' },
  { icon: '⭐', name: 'Kirkland Signature', desc: "Costco's private label, made by Diamond Pet. ~$0.90/lb in 40-lb bags." },
  { icon: '💰', name: 'Diamond Naturals',   desc: 'Grain-inclusive, real protein, no corn syrup. ~$1.10/lb on Chewy.' },
  { icon: '🌿', name: 'Taste of the Wild',  desc: 'Grain-free, novel proteins. Auto-ship ~$1.40/lb.' },
];

const faqs = [
  { q: 'Where can I find cheap dog food near me?',         a: 'DogFood.bot compares prices at Chewy, PetSmart, Walmart, and Costco in real time. Enter your zip code to see which store has the lowest price right now.' },
  { q: 'What is the cheapest dog food option in 2025?',    a: 'Store-brand options at Walmart and Costco are typically cheapest per pound. For national brands, Chewy auto-ship usually beats in-store prices by 5–30%.' },
  { q: 'Does Costco have cheaper dog food than Chewy?',    a: "Costco's bulk sizes often cost less per pound, but Chewy's auto-ship discounts (up to 35% off) can flip the math. DogFood.bot calculates cost-per-ounce across all retailers." },
  { q: 'How often are prices updated on DogFood.bot?',     a: 'Prices are updated daily from Chewy, PetSmart, Walmart, and Costco. Sale prices are captured in real time.' },
];

export default function CheapDogFoodNearMe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background: 'linear-gradient(135deg,#1A1A2E 0%,#5C3D1E 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Cheap Dog Food Near Me</p>
        <h1>Find Cheap Dog Food Near You — Instantly</h1>
        <p>Enter your zip code and compare prices across every major retailer. Stop overpaying for the same bag.</p>
      </div>

      <div className="page">
        <div className="stats">
          {[['4','Retailers Compared'],['12K+','Products Tracked'],['Daily','Price Updates'],['$0','Cost to Compare']].map(([n,l]) => (
            <div key={l} className="stat"><span className="stat-num">{n}</span><span className="stat-lbl">{l}</span></div>
          ))}
        </div>

        <div className="section">
          <h2>Why Dog Food Prices Vary So Much by Location</h2>
          <p>Dog food prices vary dramatically — sometimes by 40% or more — depending on the retailer, the week, and whether you're enrolled in a loyalty program. Regional distribution costs, local competition, and promotional cycles all drive these swings.</p>
          <p>DogFood.bot indexes prices across <strong>Chewy, PetSmart, Walmart, and Costco</strong> every single day, giving you a real-time view of who's cheapest for any brand, size, and formula — filtered to your zip code for in-store availability.</p>
          <div className="highlight">
            <p>💡 <strong>Pro tip:</strong> Chewy's auto-ship discounts (5–35% off) often beat every competitor on premium brands. But for budget brands like Purina ONE or Pedigree, Walmart typically wins on everyday price.</p>
          </div>
        </div>

        <div className="section">
          <h2>Retailer-by-Retailer Breakdown</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Retailer</th><th>Best For</th><th>Max Savings</th><th>In-Store Pickup</th></tr></thead>
              <tbody>
                {retailers.map(r => (
                  <tr key={r.name}><td><strong>{r.name}</strong></td><td>{r.best}</td><td>{r.max}</td><td>{r.pickup}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2>Budget Dog Foods That Don't Cut Corners</h2>
          <div className="grid">
            {brands.map(b => (
              <div key={b.name} className="card">
                <div className="card-icon">{b.icon}</div>
                <h3>{b.name}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>How to Save the Most Every Month</h2>
          <h3>1. Use Auto-Ship at Chewy</h3>
          <p>Chewy's auto-ship starts at 5% off and goes up to 35% off when you subscribe to multiple items. You can pause or cancel anytime. For a 30-lb bag of premium kibble, this alone can save $15–$25 per bag.</p>
          <h3>2. Buy in Bulk at Costco</h3>
          <p>Costco's Kirkland Signature dry dog food costs roughly half what comparable premium brands charge per pound. You need a membership and a dog big enough to finish a 40-lb bag within about 6 weeks.</p>
          <h3>3. Stack Coupons with Sale Prices</h3>
          <p>PetSmart's Treats+ loyalty program sends members monthly coupons. When a sale coincides with a coupon, savings can reach 30–40%.</p>
          <h3>4. Compare Cost-Per-Ounce, Not Sticker Price</h3>
          <p>Our comparison tool always shows <strong>price per ounce</strong> so you compare apples to apples across different package sizes.</p>
        </div>

        <div className="section">
          <h2>Price by Size: What Actually Saves Money</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Size</th><th>Retail Price</th><th>Price Per Lb</th><th>Best Retailer</th></tr></thead>
              <tbody>
                {[['6 lb','~$22','$3.67/lb','Walmart'],['18 lb','~$54','$3.00/lb','Chewy (auto-ship)'],['35 lb','~$89','$2.54/lb','Chewy (auto-ship)'],['47 lb','~$108','$2.30/lb','Costco']].map(r => (
                  <tr key={r[0]}>{r.map((c,i) => <td key={i}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{fontSize:'.82rem',color:'var(--muted)'}}>Prices approximate. Use DogFood.bot for live data.</p>
        </div>

        <div className="cta">
          <h2>Ready to Stop Overpaying?</h2>
          <p>Enter your zip code and see today's cheapest prices in under 10 seconds.</p>
          <a href="/" className="cta-btn">🐾 Compare Prices Now</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => (
            <div key={f.q} className="faq">
              <div className="faq-q">{f.q}</div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
