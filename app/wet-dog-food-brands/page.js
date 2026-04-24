export const metadata = {
  title: 'Best Wet Dog Food Brands 2025 — Prices & Nutrition Compared',
  description: 'Compare the best wet dog food brands in 2025. We rank Purina, Hill\'s, Royal Canin, Wellness & more by nutrition and price across Chewy, PetSmart, and Walmart.',
  alternates: { canonical: 'https://dogfood.bot/wet-dog-food-brands' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Best Wet Dog Food Brands 2025 — Prices & Nutrition Compared', url: 'https://dogfood.bot/wet-dog-food-brands' },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is wet dog food healthier than dry?', acceptedAnswer: { '@type': 'Answer', text: 'Wet food has significantly higher moisture content (70–80% vs. 10% for dry), which benefits hydration. Neither is inherently healthier — it depends on the specific formula and your dog\'s needs.' } },
        { '@type': 'Question', name: 'What is the best wet dog food brand?', acceptedAnswer: { '@type': 'Answer', text: 'Top wet dog food brands in 2025 include Purina Pro Plan Savor, Hill\'s Science Diet Wet, Royal Canin loaf formulas, and Wellness CORE Hearty Cuts.' } },
        { '@type': 'Question', name: 'How much wet food should I feed my dog?', acceptedAnswer: { '@type': 'Answer', text: 'A general guideline is one 3-oz can per 3–3.5 lbs of body weight per day. A 30-lb dog needs about 2–3 cans daily. Adjust based on activity level and body condition.' } },
      ],
    },
  ],
};

const brands = [
  { rank:'🥇', name:'Purina Pro Plan Savor Adult', badges:['Vet Recommended','Best Value Premium'], desc:'High protein, chicken or beef as first ingredient, no artificial colors. Available in 13-oz cans. Chewy auto-ship 12-pack ~$28 — excellent value for a premium wet food.' },
  { rank:'🥈', name:"Hill's Science Diet Wet Adult",  badges:['Clinically Tested','Sensitive Stomach'],  desc:'Clinical nutrition in loaf or stew format. 5.5-oz cans complement Hill\'s dry food for a complete feeding system. Good for dogs with sensitive stomachs. ~$2.50–$3/can at PetSmart or Chewy.' },
  { rank:'🥉', name:'Wellness CORE Hearty Cuts',     badges:['Grain-Free','High Protein'],              desc:'Natural, grain-free wet food with whole muscle meat in gravy. Higher protein than most wet foods at ~10% crude protein. Great as a topper or complete meal. ~$2.80 per 12.5-oz can on Chewy.' },
  { rank:'🏅', name:'Purina Beneful Prepared Meals', badges:['Budget Pick','High Palatability'],        desc:'Recognizable chunky meats and vegetables. Dogs love it and it works well as a topper. ~$1.50/can at Walmart — hardest to beat on price.' },
];

const prices = [
  ['Purina Pro Plan Savor (12-pack)', '$28','$32','$30','~$2.50'],
  ["Hill's Science Diet (12-pack)",   '$32','$38','$35','~$2.80'],
  ['Wellness CORE (12-pack)',          '$35','$40','N/A','~$2.90'],
  ['Royal Canin Loaf (12-pack)',       '$38','$42','N/A','~$3.20'],
  ['Purina Beneful (12-pack)',         '$18','$22','$17','~$1.50'],
];

const whenCards = [
  { icon:'🦷', title:'Dental or Jaw Problems',  desc:'Dogs with missing teeth, jaw injuries, or post-dental surgery need soft food. Wet food is the obvious solution — no chewing required.' },
  { icon:'💧', title:'Hydration Issues',         desc:"Dogs with urinary tract issues or kidney disease benefit from extra moisture. Wet food's 70–80% moisture dramatically increases daily water intake." },
  { icon:'🐶', title:'Picky Eaters',             desc:"Wet food's higher aroma often wins over dogs that refuse dry kibble. A small wet food topper can solve most picky-eating problems." },
  { icon:'⚖️', title:'Weight Management',        desc:'High moisture means fewer calories per gram. Dogs feel full on fewer calories, making wet food useful for weight loss programs under vet guidance.' },
];

const faqs = [
  { q:'Is wet dog food healthier than dry?',          a:"Wet food has higher moisture content (70–80% vs. 10% for dry), benefiting hydration and palatability. Neither is inherently healthier — it depends on the formula and your dog's needs." },
  { q:'What is the best wet dog food brand?',         a:"Top brands include Purina Pro Plan Savor, Hill's Science Diet Wet, Royal Canin loaf formulas, and Wellness CORE Hearty Cuts. DogFood.bot compares prices daily." },
  { q:'How much wet food should I feed my dog?',      a:'One 3-oz can per 3–3.5 lbs of body weight per day. A 30-lb dog needs about 2–3 cans daily. Adjust based on activity level and body condition.' },
];

export default function WetDogFoodBrands() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background:'linear-gradient(135deg,#0A6B5E 0%,#053D36 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Wet Dog Food Brands</p>
        <h1>Best Wet Dog Food Brands 2025 — Nutrition & Price Compared</h1>
        <p>Higher moisture, higher palatability — but the cost-per-ounce math is brutal. Here's how to get the most value from wet food.</p>
      </div>

      <div className="page">
        <div className="section">
          <h2>Wet vs Dry: The Real Cost Comparison</h2>
          <p>Wet dog food is almost always more expensive per calorie than dry kibble. A 30-lb dog fed exclusively on quality wet food might cost $5–$10/day. The same dog on quality dry kibble might cost $1.50–$3/day — a $1,000–$3,000/year difference.</p>
          <p>The most common strategy is <strong>mixing</strong> — feeding primarily dry kibble with a wet topper for palatability, hydration, and variety. This captures most benefits of wet food at a fraction of the cost.</p>
          <div className="highlight">
            <p>💡 <strong>The Smart Mix:</strong> Use wet food as a topper — 1–2 tablespoons per cup of dry kibble adds palatability and moisture without the full wet food price tag. Many finicky eaters who refuse dry kibble will eat it topped with wet food.</p>
          </div>
        </div>

        <div className="section">
          <h2>Top Wet Dog Food Brands in 2025</h2>
          {brands.map(b => (
            <div key={b.name}>
              <h3>{b.rank} {b.name}</h3>
              <p>{b.desc}</p>
              <p>{b.badges.map(badge => <span key={badge} className="badge orange">{badge}</span>)}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Wet Dog Food Price Comparison (12-pack)</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Chewy (auto-ship)</th><th>PetSmart</th><th>Walmart</th><th>Per Can</th></tr></thead>
              <tbody>{prices.map(r => <tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2>When Wet Food Is the Right Choice</h2>
          <div className="grid">
            {whenCards.map(c => <div key={c.title} className="card"><div className="card-icon">{c.icon}</div><h3>{c.title}</h3><p>{c.desc}</p></div>)}
          </div>
        </div>

        <div className="section">
          <h2>How to Read a Wet Dog Food Label</h2>
          <h3>The Moisture Problem</h3>
          <p>Comparing wet and dry food protein percentages directly is misleading. Wet food showing 8% protein vs. dry at 28% is a false comparison — wet food is 78% water. On a dry matter basis, that wet food's protein is actually closer to 36%. Always convert to dry matter basis for an accurate comparison.</p>
          <h3>Identify the Protein Source</h3>
          <p>The first ingredient should be a named protein (beef, chicken, turkey, salmon). "Meat by-products" as a first ingredient is a red flag. "Chicken by-products" is more acceptable — by-products in pet food are regulated and can include nutritious organ meats.</p>
          <h3>Ingredients to Avoid</h3>
          <ul>
            <li>Carrageenan (potential gut irritant — research is ongoing)</li>
            <li>Excessive salt (sodium over 0.3% dry matter basis for healthy dogs)</li>
            <li>Artificial colors — dogs don't see them and they add no value</li>
            <li>Propylene glycol in wet or semi-moist foods</li>
          </ul>
        </div>

        <div className="cta">
          <h2>Compare Wet Dog Food Prices Today</h2>
          <p>See the best deals on wet food toppers and complete wet diets across all major retailers.</p>
          <a href="/" className="cta-btn">🐾 Compare Wet Dog Food Prices</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => <div key={f.q} className="faq"><div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div></div>)}
        </div>
      </div>
    </>
  );
}
