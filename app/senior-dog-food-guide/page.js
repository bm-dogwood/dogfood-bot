export const metadata = {
  title: 'Best Senior Dog Food 2025 — Complete Guide for Older Dogs',
  description: "The best senior dog food in 2025. Compare top brands for older dogs including Hill's Science Diet, Purina Pro Plan Senior, and Royal Canin across all retailers.",
  alternates: { canonical: 'https://dogfood.bot/senior-dog-food-guide' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Best Senior Dog Food 2025 — Complete Guide for Older Dogs', url: 'https://dogfood.bot/senior-dog-food-guide' },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'When should I switch my dog to senior food?', acceptedAnswer: { '@type': 'Answer', text: 'Small/medium breeds are typically senior at 7 years. Large breeds at 6 years. Giant breeds at 5 years. Consult your vet about the right time based on your dog\'s individual health.' } },
        { '@type': 'Question', name: 'What is the best senior dog food?', acceptedAnswer: { '@type': 'Answer', text: "Top choices include Hill's Science Diet Senior, Purina Pro Plan Bright Minds Senior, Royal Canin Senior, and Iams Mature Adult. The best depends on your dog's specific health conditions." } },
        { '@type': 'Question', name: 'Do senior dogs need less protein?', acceptedAnswer: { '@type': 'Answer', text: "No — healthy senior dogs generally benefit from higher protein to maintain muscle mass. Only dogs with diagnosed kidney disease need protein restriction, and even then, not elimination." } },
      ],
    },
  ],
};

const brands = [
  { rank:'🥇', name:"Hill's Science Diet Senior 7+",       badges:['Vet #1 Pick','Clinically Tested'],     desc:'The gold standard for senior dog nutrition. Controlled calories to prevent weight gain, L-carnitine for lean muscle, clinically proven antioxidants. ~$80–$95 for 30 lbs at PetSmart or Chewy.' },
  { rank:'🥈', name:'Purina Pro Plan Bright Minds Senior 7+', badges:['Cognitive Support','Vet Recommended'], desc:'Formulated with enhanced botanical oils containing MCTs which research suggests can support cognitive function in aging dogs. Real chicken first. Chewy auto-ship ~$82 for 30 lbs.' },
  { rank:'🥉', name:'Royal Canin Aging 12+',               badges:['12+ Formulation','Super Senior'],       desc:'Designed specifically for dogs over 12 years. Highly digestible proteins, targeted fiber blend, and an exclusive antioxidant complex. Available through PetSmart veterinary section and Chewy.' },
  { rank:'🏅', name:'Iams Mature Adult 7+',                badges:['Best Budget','Walmart Available'],      desc:'Budget-friendly without sacrificing core nutrition. Real chicken first, omega-6 for coat health, L-carnitine for lean muscle. ~$32 for 30 lbs at Walmart — exceptional value for healthy seniors.' },
];

const prices = [
  ["Hill's Science Diet Senior 7+",    '$82','$94','$88'],
  ['Purina Pro Plan Senior 7+',         '$80','$92','$87'],
  ['Royal Canin Aging 12+',             '$95','$102','N/A'],
  ['Iams Mature Adult 7+',              '$34','$40','$32'],
  ['Blue Buffalo Senior',               '$68','$76','$72'],
];

const nutrients = [
  { icon:'💪', title:'High-Quality Protein',        desc:'25–30% protein (dry matter basis) helps seniors maintain muscle mass. Unless kidney disease is present, don\'t restrict protein in aging dogs.' },
  { icon:'🦴', title:'Glucosamine & Chondroitin',   desc:'Supports joint health and cartilage. Many senior formulas include these; you can also supplement separately if not present.' },
  { icon:'🧠', title:'Omega-3 Fatty Acids',          desc:'DHA and EPA from fish oil support brain health, reduce joint inflammation, and improve coat condition in aging dogs.' },
  { icon:'🛡️', title:'Antioxidants',                desc:'Vitamins E and C help combat age-related cellular damage and support immune function.' },
];

const faqs = [
  { q:'When should I switch my dog to senior food?',  a:'Small/medium breeds are typically senior at 7 years. Large breeds at 6 years. Giant breeds at 5 years. Consult your vet about the right time based on your dog\'s individual health.' },
  { q:'What is the best senior dog food?',            a:"Top choices include Hill's Science Diet Senior, Purina Pro Plan Bright Minds Senior, Royal Canin Senior, and Iams Mature Adult. The best depends on your dog's specific health conditions." },
  { q:'Do senior dogs need less protein?',            a:'No — healthy senior dogs generally benefit from higher protein to maintain muscle mass. Only dogs with diagnosed kidney disease need protein restriction.' },
];

export default function SeniorDogFoodGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background:'linear-gradient(135deg,#3D4A6B 0%,#1A1A2E 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Senior Dog Food Guide</p>
        <h1>Best Senior Dog Food 2025 — A Complete Guide for Older Dogs</h1>
        <p>Your senior dog's nutrition needs have changed. Here's exactly what to look for — and where to find it cheapest.</p>
      </div>

      <div className="page">
        <div className="stats">
          {[['7','Years = Senior (Small)'],['5','Years = Senior (Giant)'],['40+','Senior Formulas Tracked'],['Daily','Price Updates']].map(([n,l]) => (
            <div key={l} className="stat"><span className="stat-num">{n}</span><span className="stat-lbl">{l}</span></div>
          ))}
        </div>

        <div className="section">
          <h2>How Senior Dogs' Nutritional Needs Change</h2>
          <p>As dogs age, metabolism slows — caloric needs often decrease by 20–25%, though very active seniors may still need normal adult calories. Muscle mass tends to decrease with age (sarcopenia), making adequate protein more important than ever, not less.</p>
          <p>Senior dogs are also more prone to joint inflammation, cognitive decline, kidney disease, dental disease, and digestive changes — all of which can be partly addressed through targeted nutrition.</p>
          <div className="highlight">
            <p>🩺 <strong>Vet-First Approach:</strong> Senior nutrition is highly individual. A dog with kidney disease needs very different food than a healthy 8-year-old Beagle. Always consult your vet before making major dietary changes.</p>
          </div>
        </div>

        <div className="section">
          <h2>Top Senior Dog Food Brands in 2025</h2>
          {brands.map(b => (
            <div key={b.name}>
              <h3>{b.rank} {b.name}</h3>
              <p>{b.desc}</p>
              <p>{b.badges.map(badge => <span key={badge} className="badge orange">{badge}</span>)}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Senior Dog Food Prices by Retailer (30-lb bag)</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Chewy (auto-ship)</th><th>PetSmart</th><th>Walmart</th></tr></thead>
              <tbody>{prices.map(r => <tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2>Key Nutrients for Senior Dogs</h2>
          <div className="grid">
            {nutrients.map(n => <div key={n.title} className="card"><div className="card-icon">{n.icon}</div><h3>{n.title}</h3><p>{n.desc}</p></div>)}
          </div>
        </div>

        <div className="section">
          <h2>Senior Dogs With Special Health Needs</h2>
          <h3>Kidney Disease</h3>
          <p>Dogs with diagnosed chronic kidney disease need a prescription diet with controlled phosphorus. Hill's k/d and Purina NF are the most prescribed — both require veterinary authorization.</p>
          <h3>Weight Management</h3>
          <p>Overweight seniors benefit from reduced-calorie formulas with L-carnitine to help mobilize fat. Look for 10–15% fewer calories than standard adult formulas.</p>
          <h3>Dental Disease</h3>
          <p>Seniors with dental issues may benefit from wet food or a prescription dental diet. Hill's t/d is the gold standard for dental disease management.</p>
          <h3>Cognitive Dysfunction</h3>
          <p>Canine cognitive dysfunction may respond to diets rich in MCTs and antioxidants. Purina Pro Plan Bright Minds and Hill's b/d are formulated for this purpose.</p>
        </div>

        <div className="cta">
          <h2>Find the Best Price on Senior Dog Food</h2>
          <p>Compare today's prices on every senior formula across Chewy, PetSmart, Walmart & Costco.</p>
          <a href="/" className="cta-btn">🐾 Compare Senior Dog Food Prices</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => <div key={f.q} className="faq"><div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div></div>)}
        </div>
      </div>
    </>
  );
}
