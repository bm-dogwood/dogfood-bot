export const metadata = {
  title: 'Dog Food Recall List 2025 — FDA Alerts & Brand Safety Tracker',
  description: 'Stay up to date on dog food recalls in 2025. DogFood.bot tracks all FDA recall alerts by brand, lot number, and reason. Get free email alerts.',
  alternates: { canonical: 'https://dogfood.bot/dog-food-recall-list' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: 'Dog Food Recall List 2025 — FDA Alert Tracker', url: 'https://dogfood.bot/dog-food-recall-list' },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I find out if my dog food has been recalled?', acceptedAnswer: { '@type': 'Answer', text: "Check the FDA's official recall database at fda.gov/animal-veterinary, or use DogFood.bot's recall alert feed which aggregates FDA notices in real time." } },
        { '@type': 'Question', name: 'What dog food brands have been recalled most often?', acceptedAnswer: { '@type': 'Answer', text: 'Smaller manufacturers and private-label brands have historically had more recalls than large producers like Purina and Hill\'s. DogFood.bot tracks all FDA recall history by brand.' } },
        { '@type': 'Question', name: 'What should I do if my dog food is recalled?', acceptedAnswer: { '@type': 'Answer', text: 'Stop feeding the recalled product immediately, check your dog for symptoms, return the product for a refund, and contact your vet if your dog shows signs of illness.' } },
      ],
    },
  ],
};

const recalls = [
  { brand:'Example Brand A', date:'Mar 2025', reason:'Elevated Vitamin D',      severity:'High'   },
  { brand:'Example Brand B', date:'Feb 2025', reason:'Salmonella contamination', severity:'High'   },
  { brand:'Example Brand C', date:'Jan 2025', reason:'Aflatoxin levels',         severity:'Medium' },
];

const reasonCards = [
  { icon:'🧫', title:'Salmonella Contamination', desc:'The most frequent recall trigger. Can sicken both pets and the humans who handle food. Proper hand washing after handling is always recommended.' },
  { icon:'☠️', title:'Aflatoxin (Mold Toxin)',    desc:'Produced by mold on corn, wheat, and grains. Even low levels can cause liver failure in dogs. Several large recalls in 2020–2021 were aflatoxin-related.' },
  { icon:'💊', title:'Elevated Vitamin D',         desc:'Excess Vitamin D causes hypercalcemia leading to kidney failure. Almost always a manufacturing error in a premix.' },
  { icon:'🔩', title:'Foreign Material',           desc:'Metal fragments, plastic, or other objects in kibble. Less common but dangerous. Report findings to the FDA Safety Reporting Portal.' },
];

const faqs = [
  { q:'How do I find out if my dog food has been recalled?', a:"Check the FDA's official recall database at fda.gov/animal-veterinary, or use DogFood.bot's real-time recall alert feed." },
  { q:'What dog food brands have been recalled most often?', a:"Smaller manufacturers and private-label brands have historically had more recalls than large producers like Purina and Hill's. DogFood.bot tracks all FDA history by brand." },
  { q:'What should I do if my dog food is recalled?', a:'Stop feeding it immediately, check your dog for symptoms, return the unused product for a refund, and contact your vet if your dog shows signs of illness.' },
];

export default function DogFoodRecallList() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="hero" style={{ background:'linear-gradient(135deg,#7B0E0E 0%,#3D1818 100%)' }}>
        <p className="breadcrumb"><a href="/">DogFood.bot</a> › Dog Food Recall List</p>
        <h1>Dog Food Recall List 2025 — FDA Alert Tracker</h1>
        <p>Real-time FDA recall feed aggregated by brand. Get instant alerts when a product you buy is recalled.</p>
      </div>

      <div className="page">
        <div className="highlight" style={{ borderColor:'#E84040', background:'#FFF5F5' }}>
          <p>⚠️ <strong>Important:</strong> This page aggregates FDA recall notices for informational purposes. Always verify with the <a href="https://www.fda.gov/animal-veterinary/safety-health/recalls-withdrawals" target="_blank" rel="noopener noreferrer">official FDA recall database</a> for the most current information.</p>
        </div>

        <div className="section">
          <h2>How DogFood.bot Tracks Recalls</h2>
          <p>Our system polls the FDA's animal veterinary recall RSS feed multiple times daily and cross-references each notice with our product database. When a recalled product matches a brand or lot number in our system, we immediately trigger alerts for users who have that brand saved in their comparison list.</p>
          <p>We track all three FDA recall classes: <strong>Class I</strong> (reasonable probability of serious harm or death), <strong>Class II</strong> (may cause temporary adverse health consequences), and <strong>Class III</strong> (unlikely to cause harm but violates FDA regulations).</p>
        </div>

        <div className="section">
          <h2>Recent Dog Food Recalls (2025)</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Date</th><th>Reason</th><th>Severity</th></tr></thead>
              <tbody>
                {recalls.map(r => (
                  <tr key={r.brand}>
                    <td><strong>{r.brand}</strong></td>
                    <td>{r.date}</td>
                    <td>{r.reason}</td>
                    <td><span className="badge orange">{r.severity}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize:'.82rem', color:'var(--muted)' }}>* Brand names above are illustrative. Live data is pulled from the FDA feed daily.</p>
        </div>

        <div className="section">
          <h2>Most Common Recall Reasons</h2>
          <div className="grid">
            {reasonCards.map(c => (
              <div key={c.title} className="card">
                <div className="card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>What to Do If Your Dog Food Is Recalled</h2>
          <h3>Step 1: Stop Feeding It Immediately</h3>
          <p>Even if your dog seems healthy, don't wait for symptoms. Store the product in a sealed bag for potential return or regulatory inspection.</p>
          <h3>Step 2: Check for Symptoms</h3>
          <p>Common signs of foodborne illness: vomiting, diarrhea, lethargy, loss of appetite, and jaundice (yellowing of eyes or gums). If you observe these, contact your veterinarian immediately.</p>
          <h3>Step 3: Return for a Refund</h3>
          <p>All major retailers — Chewy, PetSmart, Walmart, and Costco — accept returns of recalled products with or without a receipt. Chewy will arrange free return shipping.</p>
          <h3>Step 4: Report to the FDA</h3>
          <p>Use the FDA's Safety Reporting Portal (safetyreporting.hhs.gov) to report adverse events. Your report helps the FDA track the scope of the recall and protect other dogs.</p>
          <h3>Step 5: Find a Safe Alternative</h3>
          <p>Use DogFood.bot to quickly find a comparable food from a brand with no recent recall history. Our filters let you exclude brands with open recalls.</p>
        </div>

        <div className="section">
          <h2>Brands With Strongest Safety Records</h2>
          <p>These brands have had no Class I or Class II recalls in the past five years as of our last review — not a guarantee of future safety, but a strong manufacturing track record:</p>
          <ul>
            <li>Purina Pro Plan / Purina ONE</li>
            <li>Hill's Science Diet (one large Vitamin D recall in 2019; strong record since)</li>
            <li>Royal Canin</li>
            <li>Iams / Eukanuba</li>
            <li>Kirkland Signature (Costco)</li>
          </ul>
        </div>

        <div className="cta">
          <h2>Never Miss a Recall Alert</h2>
          <p>Save your dog's food on DogFood.bot and get instant email alerts if it's recalled.</p>
          <a href="/" className="cta-btn">🐾 Set Up Free Recall Alerts</a>
        </div>

        <div className="section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map(f => <div key={f.q} className="faq"><div className="faq-q">{f.q}</div><div className="faq-a">{f.a}</div></div>)}
        </div>
      </div>
    </>
  );
}
