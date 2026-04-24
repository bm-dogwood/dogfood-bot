export const metadata = {
  title: 'Best Dry Dog Food 2025 — Top Brands by Price & Nutrition',
  description: "Find the best dry dog food in 2025. We compare Purina Pro Plan, Hill's Science Diet, Royal Canin, and more by price, nutrition, and value.",
  alternates: { canonical: 'https://dogfood.bot/best-dry-dog-food' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Best Dry Dog Food 2025', url: 'https://dogfood.bot/best-dry-dog-food' },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the best dry dog food in 2025?', acceptedAnswer: { '@type': 'Answer', text: 'Top-rated dry dog foods include Purina Pro Plan, Hill\'s Science Diet, Royal Canin, and Taste of the Wild. The best depends on your dog\'s age, size, and health needs.' } },
        { '@type': 'Question', name: 'Is dry dog food better than wet food?', acceptedAnswer: { '@type': 'Answer', text: 'Dry kibble is more calorie-dense and cost-effective. The crunchy texture can help reduce tartar. Wet food has higher moisture content. Many owners mix both.' } },
        { '@type': 'Question', name: 'How do I choose a dry dog food?', acceptedAnswer: { '@type': 'Answer', text: 'Look for a named protein as the first ingredient, an AAFCO statement of nutritional adequacy, and a formula appropriate for your dog\'s life stage.' } },
      ],
    },
  ],
};

const brands = [
  { rank:'🥇', name:'Purina Pro Plan Adult Chicken & Rice', badges:['Vet Recommended','Feeding Trial Tested','Best Value'], desc:"The most consistently recommended kibble by veterinary nutritionists. Real chicken first, AAFCO compliant for all life stages, strong recall track record. The 35-lb bag on Chewy auto-ship runs ~$2.50/lb — excellent value.", price:'~$2.50/lb' },
  { rank:'🥈', name:"Hill's Science Diet Adult",            badges:['Vet Recommended','Feeding Trial Tested'],              desc:"Backed by extensive clinical feeding trials. Ideal for dogs with known sensitivities. ~$2.80/lb on PetSmart with Treats+ discounts.",                                                                            price:'~$2.80/lb' },
  { rank:'🥉', name:'Taste of the Wild High Prairie',       badges:['Grain-Free','Budget-Friendly'],                        desc:'Best grain-free option under $2/lb (Chewy auto-ship). Bison and venison primary proteins, suits dogs with common poultry allergies. FDA DCM advisory applies — consult your vet.',                    price:'~$1.80/lb' },
  { rank:'🏅', name:'Kirkland Signature (Costco)',          badges:['Costco Exclusive','Lowest Cost/Lb'],                   desc:'Made by Diamond Pet Foods. Remarkable value at ~$0.90–$1.00/lb in 40-lb bags. In-store Costco members only.',                                                                                           price:'~$0.95/lb' },
];

const prices = [
  ['Purina Pro Plan',   '$87','$95','$92','N/A'],
  ["Hill's Science Diet",'$98','$105','$100','N/A'],
  ['Taste of the Wild', '$71','$79','$75','N/A'],
  ['Kirkland Signature','N/A','N/A','N/A','$38 (40 lb)'],
];

const faqs = [
  { q:'What is the best dry dog food in 2025?',   a:"Top-rated options include Purina Pro Plan, Hill's Science Diet, Royal Canin, and Taste of the Wild. The best depends on your dog's age, size, and health needs." },
  { q:'Is dry dog food better than wet food?',    a:'Dry kibble is more calorie-dense and cost-effective. The crunchy texture can help reduce tartar buildup. Wet food has higher moisture content. Many owners mix both.' },
  { q:'How do I choose a dry dog food?',          a:"Look for a named protein as the first ingredient, an AAFCO statement of nutritional adequacy, and a formula appropriate for your dog's life stage." },
];

export default function BestDryDogFood() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background:'linear-gradient(135deg,#1A3009 0%,#2D5016 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Best Dry Dog Food</p>
        <h1>Best Dry Dog Food 2025: Top Brands Ranked by Price & Nutrition</h1>
        <p>We analyzed hundreds of kibbles across all major retailers. Here's what actually delivers — and where to buy it cheapest.</p>
      </div>

      <div className="page">
        <div className="stats">
          {[['200+','Dry Formulas Tracked'],['4','Retailers Compared'],['AAFCO','Compliance Verified'],['0','Sponsored Rankings']].map(([n,l]) => (
            <div key={l} className="stat"><span className="stat-num">{n}</span><span className="stat-lbl">{l}</span></div>
          ))}
        </div>

        <div className="section">
          <h2>How We Rank Dry Dog Foods</h2>
          <p>Our rankings are based on four equally weighted criteria updated whenever formulas change: nutritional profile (protein %, named protein sources, additives), AAFCO compliance, value per ounce across all retailers, and recall history over the past 5 years. No advertising or sponsored placements — every ranking reflects independent analysis.</p>
        </div>

        <div className="section">
          <h2>Top Dry Dog Foods of 2025</h2>
          {brands.map(b => (
            <div key={b.name}>
              <h3>{b.rank} {b.name} — <span style={{color:'var(--bark)'}}>{b.price}</span></h3>
              <p>{b.desc}</p>
              <p>{b.badges.map(badge => <span key={badge} className={`badge ${badge==='Best Value'||badge==='Lowest Cost/Lb'?'amber':badge==='Vet Recommended'?'orange':''}`}>{badge}</span>)}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Price Comparison Across Retailers (35-lb bag)</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Chewy (auto-ship)</th><th>PetSmart</th><th>Walmart</th><th>Costco</th></tr></thead>
              <tbody>
                {prices.map(r => <tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
          <p style={{fontSize:'.82rem',color:'var(--muted)'}}>Prices approximate. Use DogFood.bot for today's live prices.</p>
        </div>

        <div className="section">
          <h2>What to Look For on the Label</h2>
          <h3>Ingredient Order Matters</h3>
          <p>Ingredients are listed by pre-cooking weight. A named protein (chicken, beef, salmon) should be first. Watch for "ingredient splitting" — multiple grain fractions in the top five to push protein up the list.</p>
          <h3>The AAFCO Statement</h3>
          <p>Every reputable dog food carries one of two AAFCO statements: "formulated to meet" (nutrient analysis) or "feeding trials" (actually tested on dogs). Feeding trial foods are held to a higher standard.</p>
          <h3>Avoid These Red Flags</h3>
          <ul>
            <li>Corn syrup or sugar in the first five ingredients</li>
            <li>BHA, BHT, or ethoxyquin as preservatives</li>
            <li>Unspecified "meat" or "poultry" (no species named)</li>
            <li>No AAFCO statement at all</li>
          </ul>
        </div>

        <div className="cta">
          <h2>See Today's Cheapest Price on Your Favorite Brand</h2>
          <p>Compare prices across all 4 retailers in seconds. No account required.</p>
          <a href="/" className="cta-btn">🐾 Compare Dry Dog Food Prices</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => <div key={f.q} className="faq"><div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div></div>)}
        </div>
      </div>
    </>
  );
}
