export const metadata = {
  title: 'Chewy vs PetSmart Dog Food Prices 2025 — Which Is Cheaper?',
  description: "Is Chewy or PetSmart cheaper for dog food? We compare prices on 50+ brands with auto-ship and loyalty discounts factored in. See today's winner by brand.",
  alternates: { canonical: 'https://dogfood.bot/chewy-vs-petsmart' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Chewy vs PetSmart Dog Food Prices 2025', url: 'https://dogfood.bot/chewy-vs-petsmart' },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is Chewy cheaper than PetSmart for dog food?', acceptedAnswer: { '@type': 'Answer', text: "Chewy is typically cheaper than PetSmart on most brands, especially with auto-ship discounts of 5–35%. However, PetSmart's Treats+ loyalty program and in-store promotions can close the gap." } },
        { '@type': 'Question', name: 'Does PetSmart price-match Chewy?', acceptedAnswer: { '@type': 'Answer', text: 'PetSmart does not officially price-match online-only retailers like Chewy. They do match prices from local competitors — policies vary, so verify with your local store.' } },
        { '@type': 'Question', name: 'What are the benefits of PetSmart over Chewy?', acceptedAnswer: { '@type': 'Answer', text: "PetSmart offers same-day in-store pickup, exclusive veterinary diet brands, and Treats+ loyalty rewards. Chewy offers wider catalog selection, auto-ship savings, and a 24/7 customer service team." } },
      ],
    },
  ],
};

const comparison = [
  ["Purina Pro Plan",      '$82','$95','Chewy 🏆'],
  ["Hill's Science Diet",  '$90','$102','Chewy 🏆'],
  ['Blue Buffalo Life',    '$72','$78','Chewy 🏆'],
  ['Royal Canin Adult',    '$85','$88','Chewy 🏆'],
  ['Iams Adult Chicken',   '$38','$42','Chewy 🏆'],
  ['Purina Beneful',       '$35','$33','PetSmart 🏆'],
  ['Taste of the Wild',    '$58','$64','Chewy 🏆'],
  ['Merrick Grain-Free',   '$68','$75','Chewy 🏆'],
  ['Nutro Natural Choice', '$55','$52','PetSmart 🏆'],
  ['Wellness Core',        '$80','$88','Chewy 🏆'],
];

const faqs = [
  { q:'Is Chewy cheaper than PetSmart for dog food?',         a:"Chewy is typically cheaper than PetSmart on most brands, especially with auto-ship discounts of 5–35%. PetSmart's Treats+ loyalty program and promotions can close or flip the gap." },
  { q:'Does PetSmart price-match Chewy?',                     a:'PetSmart does not officially price-match online-only retailers like Chewy. They match local competitor prices — verify with your local store.' },
  { q:'What are the benefits of buying at PetSmart vs Chewy?',a:"PetSmart offers same-day in-store pickup, exclusive veterinary diet brands, and Treats+ loyalty rewards. Chewy offers wider selection, auto-ship savings, and 24/7 customer service." },
];

export default function ChewyVsPetsmart() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background:'linear-gradient(135deg,#0A3D8A 0%,#1A1A2E 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Chewy vs PetSmart</p>
        <h1>Chewy vs PetSmart Dog Food Prices — Who Wins in 2025?</h1>
        <p>We run the numbers daily on 50+ brands. Here's where to buy each one for less.</p>
      </div>

      <div className="page">
        <div className="section">
          <h2>The Short Answer</h2>
          <div className="grid">
            <div className="card">
              <div className="card-icon">🛒</div>
              <h3>Chewy Wins On…</h3>
              <p>Premium brands with auto-ship, large bag sizes, and brands exclusive to online. Auto-ship beats PetSmart sticker price ~70% of the time.</p>
            </div>
            <div className="card">
              <div className="card-icon">🏪</div>
              <h3>PetSmart Wins On…</h3>
              <p>In-store-exclusive promotions, Treats+ loyalty stacking, brands like Royal Canin Vet Diets, and same-day pickup when you need food today.</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Head-to-Head: 2025 Price Comparison (30-lb bag)</h2>
          <p>Chewy prices include the auto-ship discount. PetSmart prices reflect standard retail without Treats+ points.</p>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Chewy Auto-Ship</th><th>PetSmart Retail</th><th>Winner</th></tr></thead>
              <tbody>
                {comparison.map(r => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                    <td style={{ fontWeight:600 }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize:'.82rem', color:'var(--muted)' }}>Prices approximate. Use DogFood.bot for today's live comparison.</p>
        </div>

        <div className="section">
          <h2>Chewy: The Full Picture</h2>
          <h3>Auto-Ship: The Game Changer</h3>
          <p>Chewy's auto-ship is the single biggest price lever in pet food retail. First order: up to 35% off on select items. Ongoing orders: 5–15% off. Choose your frequency (every 2–16 weeks) and pause or cancel anytime. For a $100 bag of premium kibble, that's $15–$35 saved per order.</p>
          <h3>What Chewy Does Better</h3>
          <ul>
            <li>Widest online catalog — thousands of SKUs not in physical stores</li>
            <li>Free 1–2 day shipping on orders over $49</li>
            <li>24/7 customer service with actual representatives</li>
            <li>Free vet chat for basic questions</li>
            <li>Prescription food and medications (pharmacy)</li>
            <li>Generous return policy — even on opened bags</li>
          </ul>
          <h3>Chewy Limitations</h3>
          <ul>
            <li>No physical store pickup — delivery only</li>
            <li>Auto-ship discounts vary by brand and change frequently</li>
            <li>Not always cheapest on budget or store brands</li>
          </ul>
        </div>

        <div className="section">
          <h2>PetSmart: The Full Picture</h2>
          <h3>Treats+ Loyalty Program</h3>
          <p>PetSmart's Treats+ earns 8 points per dollar spent, redeemable for discounts. Members also receive monthly coupons, birthday discounts for pets, and early sale access. Stacked with an active promotion, effective discounts can reach 25–30%.</p>
          <h3>What PetSmart Does Better</h3>
          <ul>
            <li>Same-day in-store pickup and curbside</li>
            <li>Exclusive brands and veterinary diets (Royal Canin Vet formulas)</li>
            <li>In-store nutrition consultations</li>
            <li>Grooming and veterinary clinic access in-store</li>
          </ul>
          <h3>PetSmart Limitations</h3>
          <ul>
            <li>Higher base prices than Chewy on most national brands</li>
            <li>Loyalty program benefits take time to accumulate</li>
            <li>No auto-ship program competitive with Chewy's</li>
          </ul>
        </div>

        <div className="section">
          <h2>The Hybrid Strategy: Use Both</h2>
          <div className="highlight">
            <p>🧠 <strong>The Winning Approach:</strong> Set up auto-ship on Chewy for your primary dry food. Use PetSmart for in-store emergencies, exclusive brands, and when Treats+ stacks with a sale to beat Chewy's price. Check DogFood.bot monthly to make sure you're still on the best deal.</p>
          </div>
        </div>

        <div className="cta">
          <h2>See Today's Price Side-by-Side</h2>
          <p>Enter your brand and size — we'll show you who's cheapest right now.</p>
          <a href="/" className="cta-btn">🐾 Compare Chewy vs PetSmart</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => <div key={f.q} className="faq"><div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div></div>)}
        </div>
      </div>
    </>
  );
}
