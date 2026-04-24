export const metadata = {
  title: 'Best Grain-Free Dog Food Brands 2025 — Prices, Safety & Comparison',
  description: 'Compare the best grain-free dog food brands in 2025. We cover Taste of the Wild, Orijen, Merrick & more with prices across Chewy, PetSmart, and Walmart.',
  alternates: { canonical: 'https://dogfood.bot/grain-free-dog-food' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Best Grain-Free Dog Food Brands 2025', url: 'https://dogfood.bot/grain-free-dog-food' },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is grain-free dog food safe?', acceptedAnswer: { '@type': 'Answer', text: 'The FDA is investigating a potential link between grain-free diets high in legumes and dilated cardiomyopathy (DCM). Research is ongoing. Consult your veterinarian before switching to a grain-free diet.' } },
        { '@type': 'Question', name: 'What are the best grain-free dog food brands?', acceptedAnswer: { '@type': 'Answer', text: 'Top grain-free brands include Taste of the Wild, Merrick, Orijen, Acana, and Blue Buffalo Wilderness. DogFood.bot compares prices on all of them daily.' } },
        { '@type': 'Question', name: 'Why do some dogs need grain-free food?', acceptedAnswer: { '@type': 'Answer', text: 'True grain allergies in dogs are relatively rare. Dogs with confirmed grain sensitivities or certain health conditions may benefit from grain-free formulas under veterinary supervision.' } },
      ],
    },
  ],
};

const brands = [
  { rank:'🥇', name:'Taste of the Wild', badge:'Best Value', badgeType:'amber', desc:'Best value grain-free on the market. Novel proteins (bison, venison, salmon, boar) work well for dogs with common poultry allergies. ~$55–$65 for 28 lbs. Chewy auto-ship is typically cheapest.' },
  { rank:'🥈', name:'Merrick Grain-Free', badge:'High Protein', badgeType:'orange', desc:'Deboned meat as the first ingredient, wide range of formulas including limited-ingredient options. ~$70–$80 for 22 lbs. Good Chewy availability.' },
  { rank:'🥉', name:'Orijen Original', badge:'Ultra-Premium', badgeType:'orange', desc:"85%+ animal ingredients, very low carbohydrate content. At ~$4.50/lb it's expensive, but genuinely a different product category. Best for dogs with complex dietary needs." },
  { rank:'🏅', name:'Blue Buffalo Wilderness', badge:'Widely Available', badgeType:'', desc:'Available at PetSmart, Chewy, and Walmart. Solid nutrition profile, LifeSource Bits vitamin blend, mid-range pricing.' },
];

const prices = [
  ['Taste of the Wild Prairie','$52','$58','$55'],
  ['Merrick Grain-Free','$65','$72','N/A'],
  ['Blue Buffalo Wilderness','$68','$74','$71'],
  ['Orijen Original','$89','$95','N/A'],
];

const whenCards = [
  { icon:'🤧', title:'Confirmed Grain Allergy', desc:'True grain allergies exist but are uncommon. If your vet has confirmed a grain sensitivity through elimination diet, grain-free is appropriate.' },
  { icon:'🐟', title:'Novel Protein Access', desc:'Many grain-free formulas use proteins like venison or bison that are rare in grain-inclusive foods — useful for rotation or elimination diets.' },
  { icon:'🩺', title:'Vet Recommended', desc:'Some dogs with specific conditions (epilepsy, IBD, certain skin issues) may respond well to grain-free diets under veterinary supervision.' },
];

const faqs = [
  { q:'Is grain-free dog food safe?', a:'The FDA is investigating a potential link between grain-free diets and DCM in dogs. Research is ongoing and inconclusive. Consult your veterinarian before choosing a grain-free diet.' },
  { q:'What are the best grain-free dog food brands?', a:'Top brands include Taste of the Wild, Merrick, Orijen, Acana, and Blue Buffalo Wilderness. DogFood.bot compares prices on all of them daily.' },
  { q:'Why do some dogs need grain-free food?', a:'True grain allergies in dogs are relatively rare. Dogs with confirmed grain sensitivities or certain health conditions may benefit from grain-free formulas under veterinary supervision.' },
];

export default function GrainFreeDogFood() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background:'linear-gradient(135deg,#1A3009 0%,#2D5016 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Grain-Free Dog Food</p>
        <h1>Best Grain-Free Dog Food Brands 2025 — Ranked & Priced</h1>
        <p>Every major grain-free brand compared on nutrition, price, and FDA safety history.</p>
      </div>

      <div className="page">
        <div className="highlight" style={{ borderColor:'#E84040', background:'#FFF5F5' }}>
          <p>⚠️ <strong>FDA Notice:</strong> The FDA is investigating a potential link between grain-free diets high in legumes and dilated cardiomyopathy (DCM). Research is ongoing. Consult your veterinarian before switching.</p>
        </div>

        <div className="section">
          <h2>What Makes a Dog Food "Grain-Free"?</h2>
          <p>Grain-free dog foods exclude wheat, corn, rice, barley, and oats — replacing them with sweet potatoes, peas, lentils, chickpeas, or tapioca. This doesn't necessarily make them lower-carbohydrate; many grain-free kibbles have similar carb percentages to grain-inclusive foods, just from different sources.</p>
          <p>The grain-free market exploded in the 2010s, driven by parallel trends in human nutrition. The FDA's 2018 DCM investigation has since prompted many veterinary nutritionists to recommend caution, especially for breeds predisposed to heart disease.</p>
        </div>

        <div className="section">
          <h2>Top Grain-Free Brands Ranked</h2>
          {brands.map(b => (
            <div key={b.name}>
              <h3>{b.rank} {b.name}</h3>
              <p>{b.desc}</p>
              {b.badge && <p><span className={`badge ${b.badgeType}`}>{b.badge}</span></p>}
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Grain-Free Prices Compared (approx. 25-lb bag)</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Chewy (auto-ship)</th><th>PetSmart</th><th>Walmart</th></tr></thead>
              <tbody>{prices.map(r => <tr key={r[0]}>{r.map((c,i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2>The DCM Controversy: What You Need to Know</h2>
          <p>In 2018, the FDA announced an investigation into a potential link between grain-free diets and dilated cardiomyopathy (DCM). The investigation focused on foods high in peas, lentils, other legume seeds, and potatoes as main ingredients. Key points as of 2025:</p>
          <ul>
            <li>No definitive causal link has been established between grain-free diets and DCM</li>
            <li>Affected dogs may have had underlying genetic predispositions</li>
            <li>Taurine deficiency may be a contributing factor in some cases</li>
            <li>Breeds predisposed to DCM (Golden Retrievers, Dobermans, Great Danes) warrant extra caution</li>
            <li>Many veterinary cardiologists advise grain-inclusive diets until research is complete</li>
          </ul>
        </div>

        <div className="section">
          <h2>When Grain-Free Actually Makes Sense</h2>
          <div className="grid">
            {whenCards.map(c => (
              <div key={c.title} className="card">
                <div className="card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cta">
          <h2>Compare Grain-Free Prices Now</h2>
          <p>See today's prices on every major grain-free brand across all retailers.</p>
          <a href="/" className="cta-btn">🐾 Compare Grain-Free Dog Food</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => <div key={f.q} className="faq"><div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div></div>)}
        </div>
      </div>
    </>
  );
}
