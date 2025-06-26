// yatirimcilar.js
(function() {
  // 1️⃣ Yatırımcı verisi
  const investors = [
    {
      name: "Ray Dalio",
      shortBio: "Bridgewater Associates kurucusu. Sistem düşünürü.",
      fullBio: {
        lifeStory: "1949'da New York'ta doğan Ray Dalio, 12 yaşında golf sahasında caddy'lik yaparken müşterilerden yatırım tavsiyeleri duyarak borsaya ilgi duymaya başladı. 1975'te kurduğu Bridgewater Associates, dünyanın en büyük hedge fonu oldu.",
        philosophy: "Dalio'ya göre yatırım, sistematik riskleri anlamak ve çeşitlendirme yoluyla bunları yönetmekle ilgilidir. Risk yönetimi ve portföy çeşitlendirmesi onun yatırım felsefesinin temel taşlarıdır.",
        focusPoints: [
          "Küresel ekonomik döngüleri analiz ederdi.",
          "Portföyünü 'All Weather' modeliyle her koşula uyumlu hale getirirdi.",
          "Düşünce körlüklerini sorgulardı."
        ],
        netWorth: "2024 itibarıyla yaklaşık 20 milyar dolar.",
        quote: "Gerçeği aramak, fikir ayrılıklarını açıkça tartışmak ve hatalardan ders çıkarmak, hem hayatta hem yatırımda başarı getirir."
      }
    },
    {
      name: "Warren Buffett",
      shortBio: "Berkshire Hathaway CEO'su. Değer yatırımının efsanesi.",
      fullBio: {
        lifeStory: "1930'da Omaha'da doğdu. 11 yaşında ilk hissesini aldı. Değer yatırımının yaşayan efsanesi.",
        philosophy: "Uzun vadeli değer, sabır ve şirketin iş modelini anlamak esastır.",
        focusPoints: [
          "Yatırım yaptığı şirketin iş modelini tamamen anlamak ister.",
          "Sürdürülebilir rekabet avantajı arar.",
          "Hisseler ancak değerinin altında fiyatlanıyorsa alınmalı."
        ],
        netWorth: "2024 itibarıyla ~130 milyar dolar.",
        quote: "Fiyat ödediğiniz şeydir, değer elde ettiğiniz şey."
      }
    },
    {
      name: "Cathie Wood",
      shortBio: "ARK Invest kurucusu. Yenilikçi yatırımcı.",
      fullBio: {
        lifeStory: "1955'te Los Angeles'ta doğdu. 2014'te ARK Invest'i kurdu. Teknoloji ve inovasyon şirketlerine erken yatırım yaptı.",
        philosophy: "Yenilikçi şirketlere erken yatırım yap, sabırlı ol, dalgalanmalar seni korkutmasın.",
        focusPoints: [
          "Dünyayı değiştirme potansiyeli olan şirketlere yatırım yapar.",
          "Gelecek projeksiyonlarına bakar.",
          "Aşırı düşüşleri fırsat olarak görür."
        ],
        netWorth: "2024 itibarıyla yaklaşık 200–250 milyon dolar.",
        quote: "En iyi yatırımlar, çoğu insanın henüz anlamadığı fikirlerde gizlidir."
      }
    }
  ];

  // 2️⃣ Temel stiller
  const style = document.createElement('style');
  style.textContent = `
    body {
      background: #0F1115 !important;
      color: #EAEAEA;
      font-family: 'Poppins', Arial, sans-serif;
      line-height: 1.6;
    }
    #investor-section {
      max-width: 1000px;
      margin: 2.5rem auto 2.5rem auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 0 1rem;
    }
    .investor-card {
      background: #1A1A1A;
      border-radius: 10px;
      box-shadow: 0 2px 16px 0 rgba(70,151,255,0.07);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transition: box-shadow 0.2s, transform 0.2s;
      cursor: pointer;
      position: relative;
      min-width: 0;
    }
    .investor-card:hover {
      box-shadow: 0 4px 24px 0 #4697FF33, 0 1.5px 8px 0 #2228;
      transform: translateY(-2px) scale(1.02);
    }
    .investor-name {
      font-size: 1.35rem;
      font-weight: 700;
      color: #6699FF;
      margin-bottom: 0.3rem;
      letter-spacing: -0.5px;
    }
    .investor-short {
      color: #BBB;
      font-size: 1.01rem;
      margin-bottom: 1.1rem;
      min-height: 2.2em;
    }
    .investor-toggle {
      background: #222;
      color: #A0A0FF;
      border: none;
      border-radius: 6px;
      padding: 0.5em 1.2em;
      font-size: 1.01rem;
      font-family: inherit;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 0.2em;
      transition: background 0.18s, color 0.18s;
      outline: none;
    }
    .investor-toggle:hover, .investor-toggle:focus {
      background: #2a3a5a;
      color: #fff;
    }
    .investor-details {
      width: 100%;
      background: #222;
      border-radius: 8px;
      margin-top: 1.1em;
      padding: 1.1em 1em 1.1em 1em;
      color: #EAEAEA;
      font-size: 1.01rem;
      box-sizing: border-box;
      box-shadow: 0 2px 8px #0002;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.35s cubic-bezier(.4,2,.6,1), opacity 0.25s;
    }
    .investor-details.open {
      max-height: 600px;
      opacity: 1;
      margin-bottom: 0.2em;
    }
    .investor-details-title {
      color: #A0A0FF;
      font-weight: 600;
      font-size: 1.08rem;
      margin-bottom: 0.4em;
      margin-top: 0.7em;
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .investor-details ul {
      margin: 0.5em 0 1em 1.2em;
      padding: 0;
    }
    .investor-details li {
      color: #EAEAEA;
      margin: 0.4em 0;
      font-size: 1.01rem;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 0.5em;
    }
    .investor-details li .icon {
      font-size: 1.1em;
      color: #4CAF50;
    }
    .investor-quote {
      background: #23242a;
      border-left: 4px solid #4DA3FF;
      border-radius: 7px;
      padding: 0.9em 1em;
      margin-top: 1.1em;
      font-style: italic;
      color: #f1f1f1;
      font-size: 1.07rem;
      display: flex;
      align-items: flex-start;
      gap: 0.5em;
    }
    @media (max-width: 900px) {
      #investor-section {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      #investor-section {
        grid-template-columns: 1fr;
        gap: 1.2rem;
      }
      .investor-card {
        padding: 13px;
      }
    }
  `;
  document.head.appendChild(style);

  // 3️⃣ DOM'a kartları ekle
  const root = document.getElementById('investor-section');
  if (!root) return;
  root.innerHTML = '';

  investors.forEach((inv, idx) => {
    const card = document.createElement('div');
    card.className = 'investor-card';

    // İsim
    const name = document.createElement('div');
    name.className = 'investor-name';
    name.textContent = inv.name;
    card.appendChild(name);

    // Kısa açıklama
    const short = document.createElement('div');
    short.className = 'investor-short';
    short.textContent = inv.shortBio;
    card.appendChild(short);

    // Detay butonu
    const toggle = document.createElement('button');
    toggle.className = 'investor-toggle';
    toggle.textContent = 'Detayları Gör';
    card.appendChild(toggle);

    // Detay paneli
    const details = document.createElement('div');
    details.className = 'investor-details';
    details.innerHTML = `
      <div class="investor-details-title">📘 Hayat Hikayesi</div>
      <div>${inv.fullBio.lifeStory}</div>
      <div class="investor-details-title">💡 Yatırım Felsefesi</div>
      <div>${inv.fullBio.philosophy}</div>
      <div class="investor-details-title">✅ Nelere Dikkat Ederdi?</div>
      <ul>${inv.fullBio.focusPoints.map(p=>`<li><span class="icon">🟩</span>${p}</li>`).join('')}</ul>
      <div class="investor-details-title">💰 Tahmini Serveti</div>
      <div>${inv.fullBio.netWorth}</div>
      <div class="investor-quote">💬 <span>${inv.fullBio.quote}</span></div>
    `;
    card.appendChild(details);

    // Accordion davranışı
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = details.classList.contains('open');
      document.querySelectorAll('.investor-details.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) details.classList.add('open');
    });
    // Kart dışına tıklanınca kapansın
    document.addEventListener('click', function(e) {
      if (!card.contains(e.target)) details.classList.remove('open');
    });

    root.appendChild(card);
  });
})(); 