export const metadata = {
  title: 'Best Puppy Food 2025 — Price Comparison by Brand & Size',
  description: "Find the best puppy food at the lowest price. Compare Purina Pro Plan Puppy, Hill's Science Diet, and Royal Canin across Chewy, PetSmart & Walmart.",
  alternates: { canonical: 'https://dogfood.bot/puppy-food-comparison' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Best Puppy Food 2025 — Price Comparison by Brand & Size', url: 'https://dogfood.bot/puppy-food-comparison' },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the best puppy food in 2025?', acceptedAnswer: { '@type': 'Answer', text: 'Top-rated puppy foods in 2025 include Purina Pro Plan Puppy, Hill\'s Science Diet Puppy, Royal Canin Breed-Specific, and Wellness Complete Health Puppy. All meet AAFCO growth standards.' } },
        { '@type': 'Question', name: 'When should I switch from puppy food to adult food?', acceptedAnswer: { '@type': 'Answer', text: 'Small breeds switch at 9–12 months. Medium breeds at 12 months. Large breeds at 12–18 months. Giant breeds at 18–24 months.' } },
        { '@type': 'Question', name: 'Is puppy food more expensive than adult food?', acceptedAnswer: { '@type': 'Answer', text: 'Puppy food is typically 10–20% more expensive per pound due to higher protein content and nutrient density.' } },
      ],
    },
  ],
};

const brands = [
  { rank:'🥇', name:'Purina Pro Plan Puppy Chicken & Rice', badges:['Vet #1 Pick','Feeding Trial Tested','Best Value Premium'], desc:'The most veterinarian-recommended puppy food. DHA from omega-rich fish oil, real chicken first, backed by extensive feeding trials. Available in small/medium and large breed formulas. Chewy auto-ship ~$75 for 34 lbs.' },
  { rank:'🥈', name:"Hill's Science Diet Puppy",             badges:['Vet Recommended','Clinically Tested'],                    desc:'Clinical nutrition research backing it up. Easy-to-digest formula, controlled calcium for large breeds, strong track record. ~$90 for 30 lbs, widely available at PetSmart.' },
  { rank:'🥉', name:'Wellness Complete Health Puppy',        badges:['No Artificial Additives','Clean Ingredients'],            desc:'Premium natural ingredients, deboned chicken first, no artificial colors or preservatives. Great for owners who want cleaner ingredient lists. ~$70–$80 for 26 lbs on Chewy.' },
  { rank:'🏅', name:'Royal Canin Breed-Specific',            badges:['Breed-Specific','Vet Distributed'],                      desc:'Unique formulas for individual breeds (Labrador, Golden Retriever, French Bulldog). Accounts for jaw shape, energy levels, and breed predispositions. Expensive but unmatched specificity.' },
];

const prices = [
  ['Purina Pro Plan Puppy',   '$75','$88','$84'],
  ["Hill's Science Diet Puppy",'$88','$96','$92'],
  ['Wellness Puppy',           '$72','$80','N/A'],
  ['Blue Buffalo Puppy',       '$68','$76','$73'],
  ['Iams Puppy',               '$42','$48','$44'],
];

const sizeCards = [
  { icon:'🐩', title:'Small Breed Puppies',   desc:'Smaller kibble size for tiny mouths. Higher calorie density. Reach adult size faster (9–12 months), so the puppy phase is shorter.' },
  { icon:'🦴', title:'Large Breed Puppies',   desc:'Controlled calcium and phosphorus to prevent orthopedic problems. Lower calorie density for controlled growth. Stay on puppy food 12–24 months.' },
  { icon:'🌟', title:'All Life Stages',       desc:'Meets AAFCO standards for both growth and adult maintenance. Practical for multi-dog households. Verify it says "including growth of large-size dogs" for large breeds.' },
];

const switchAges = [
  ['Toy & Small (under 20 lbs)','9–12 months'],
  ['Medium (20–50 lbs)','12 months'],
  ['Large (50–90 lbs)','12–18 months'],
  ['Giant (over 90 lbs)','18–24 months'],
];

const faqs = [
  { q:'What is the best puppy food in 2025?',               a:"Top-rated puppy foods include Purina Pro Plan Puppy, Hill's Science Diet Puppy, Royal Canin Breed-Specific, and Wellness Complete Health Puppy. All meet AAFCO growth standards." },
  { q:'When should I switch from puppy to adult food?',     a:'Small breeds: 9–12 months. Medium breeds: 12 months. Large breeds: 12–18 months. Giant breeds: 18–24 months.' },
  { q:'Is puppy food more expensive than adult food?',      a:'Puppy food is typically 10–20% more expensive per pound due to higher protein content and nutrient density. DogFood.bot helps you find the best price on your preferred brand.' },
];

export default function PuppyFoodComparison() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background:'linear-gradient(135deg,#6B35C2 0%,#2D1870 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Puppy Food Comparison</p>
        <h1>Best Puppy Food 2025 — Top Brands Compared by Price & Nutrition</h1>
        <p>Your pup deserves the best start. Here's how to get it without overpaying.</p>
      </div>

      <div className="page">
        <div className="section">
          <h2>Why Puppy Food Formulas Matter</h2>
          <p>Puppies have fundamentally different nutritional needs than adult dogs. Their rapid growth requires more protein (minimum 22% crude protein vs. 18% for adults), higher calcium and phosphorus for bone development, more DHA for brain and eye development, and more calories per pound of body weight. AAFCO requires puppy foods to be labeled for "growth" or "all life stages."</p>
          <div className="highlight">
            <p>🐾 <strong>Large Breed Puppies:</strong> Large and giant breeds need puppy food with <em>controlled</em> calcium levels — not maximum calcium. Too much calcium causes skeletal problems. Look for foods specifically labeled "large breed puppy."</p>
          </div>
        </div>

        <div className="section">
          <h2>Top Puppy Food Brands in 2025</h2>
          {brands.map(b => (
            <div key={b.name}>
              <h3>{b.rank} {b.name}</h3>
              <p>{b.desc}</p>
              <p>{b.badges.map(badge => <span key={badge} className="badge orange">{badge}</span>)}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Puppy Food Price Comparison by Retailer (30-lb bag)</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Chewy (auto-ship)</th><th>PetSmart</th><th>Walmart</th></tr></thead>
              <tbody>{prices.map(r => <tr key={r[0]}>{r.map((c,i)=><td key={i}><strong>{i===1?c:c}</strong></td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2>Small vs. Large Breed Puppy Formulas</h2>
          <div className="grid">
            {sizeCards.map(c => <div key={c.title} className="card"><div className="card-icon">{c.icon}</div><h3>{c.title}</h3><p>{c.desc}</p></div>)}
          </div>
        </div>

        <div className="section">
          <h2>When to Switch from Puppy to Adult Food</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Breed Size</th><th>Switch Age</th></tr></thead>
              <tbody>{switchAges.map(r => <tr key={r[0]}><td>{r[0]}</td><td><strong>{r[1]}</strong></td></tr>)}</tbody>
            </table>
          </div>
          <p>Transition gradually over 7–10 days by mixing increasing proportions of adult food with decreasing puppy food to avoid digestive upset.</p>
        </div>

        <div className="cta">
          <h2>Find the Cheapest Puppy Food in Your Area</h2>
          <p>Enter your zip code to compare today's prices on every top puppy food brand.</p>
          <a href="/" className="cta-btn">🐾 Compare Puppy Food Prices</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => <div key={f.q} className="faq"><div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div></div>)}
        </div>
      </div>
    </>
  );
}
