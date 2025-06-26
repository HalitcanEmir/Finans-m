// borza_nedir.js
// Tüm "Borsa Nedir?" sayfası içeriği ve stilleri bu dosyada dinamik olarak oluşturulur.

(function() {
  // --- Yardımcı fonksiyonlar ---
  function createEl(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.class) el.className = options.class;
    if (options.id) el.id = options.id;
    if (options.html) el.innerHTML = options.html;
    if (options.text) el.textContent = options.text;
    if (options.attrs) for (const [k, v] of Object.entries(options.attrs)) el.setAttribute(k, v);
    return el;
  }

  // --- Temel stiller ---
  const style = document.createElement('style');
  style.textContent = `
    body {
      background: #0F0F0F !important;
      color: #E0E0E0;
      font-family: 'Poppins', 'Inter', Arial, sans-serif;
      line-height: 1.7;
      margin: 0;
      padding: 0;
    }
    #borsa-content, .container, main {
      max-width: 850px;
      margin: 0 auto;
      padding: 2rem 1rem 2.5rem 1rem;
      text-align: center;
    }
    .borsa-toc {
      position: sticky;
      top: 0;
      background: #181A2A;
      border-radius: 8px;
      padding: 1em;
      margin-bottom: 2em;
      text-align: left;
      z-index: 10;
    }
    .borsa-toc ul { list-style: none; padding: 0; margin: 0; }
    .borsa-toc li { margin: 0.3em 0; }
    .borsa-toc a { color: #A0A0FF; text-decoration: none; font-weight: 500; }
    .borsa-toc a:hover { text-decoration: underline; }
    .borsa-title {
      font-size: 2.1rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.7rem;
      text-align: center;
      letter-spacing: -1px;
    }
    .borsa-desc {
      font-size: 1.13rem;
      color: #CCCCCC;
      margin-bottom: 2.2rem;
      text-align: center;
    }
    .borsa-img-block {
      text-align: center;
      margin: 32px 0 24px 0;
    }
    .borsa-img {
      max-width: 100%;
      width: 420px;
      border-radius: 8px;
      box-shadow: 0 2px 8px #0002;
    }
    .borsa-img-caption {
      margin-top: 12px;
      color: #A0A0FF;
      font-size: 1.08rem;
    }
    .borsa-example-block {
      background: rgba(255,255,255,0.07);
      border-radius: 8px;
      border-left: 5px solid #4DA3FF;
      padding: 1rem 1.2rem;
      color: #AAAAAA;
      margin: 24px 0 32px 0;
      font-size: 1.05rem;
      box-shadow: 0 2px 8px #0001;
    }
    .borsa-example-note {
      color: #4DA3FF;
      font-weight: 600;
    }
    .borsa-section {
      margin-bottom: 2.5rem;
    }
    .borsa-section-title {
      font-size: 1.35rem;
      font-weight: 600;
      color: #4DA3FF;
      margin-bottom: 0.7rem;
      letter-spacing: -0.5px;
    }
    .borsa-info-cards {
      display: flex;
      gap: 1.2rem;
      margin: 1.2rem 0 1.2rem 0;
      flex-wrap: wrap;
    }
    .borsa-info-card {
      background: #1C1C1C;
      border-left: 4px solid #4DA3FF;
      border-radius: 8px;
      padding: 1rem 1.1rem;
      flex: 1 1 220px;
      min-width: 180px;
    }
    .borsa-info-title {
      font-weight: 600;
      color: #4DA3FF;
      margin-bottom: 0.3rem;
    }
    .borsa-info-desc {
      font-size: 0.97rem;
      color: #CCCCCC;
    }
    .borsa-invest-list {
      margin: 1.2rem 0 1.2rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }
    .borsa-invest-item {
      background: rgba(255,255,255,0.03);
      border-radius: 8px;
      padding: 0.8rem 1rem;
      color: #E0E0E0;
      font-size: 1.03rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .borsa-invest-emoji {
      font-size: 1.2rem;
      margin-right: 0.3rem;
    }
    .borsa-note {
      color: #A0C1FF;
      font-size: 0.98rem;
      margin-bottom: 1.2rem;
    }
    .borsa-flex-cols {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .borsa-col {
      flex: 1 1 220px;
      background: rgba(255,255,255,0.03);
      border-radius: 8px;
      padding: 1.1rem 1rem;
      margin-bottom: 1rem;
    }
    .borsa-col-title {
      font-size: 1.13rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .borsa-profit { color: #4CAF50; }
    .borsa-loss { color: #FF5252; }
    .borsa-sss-list {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      margin-top: 1.2rem;
    }
    .borsa-sss-item {
      background: #181A2A;
      border-radius: 8px;
      padding: 0.8rem 1rem;
      box-shadow: 0 2px 8px #0001;
    }
    .borsa-sss-q {
      color: #4DA3FF;
      font-weight: 600;
      font-size: 1.05rem;
      display: block;
      margin-bottom: 0.2rem;
    }
    .borsa-sss-a {
      color: #AAAAAA;
      font-size: 1.01rem;
      margin-left: 1.2rem;
      display: block;
    }
    .borsa-sozluk-list {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      margin-top: 1.2rem;
    }
    .borsa-sozluk-item {
      color: #E0E0E0;
      font-size: 1.03rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .borsa-sozluk-emoji {
      font-size: 1.2rem;
      margin-right: 0.3rem;
    }
    .borsa-motivation-box {
      background: linear-gradient(90deg, #7F5AF0 60%, #4DA3FF 100%);
      border-radius: 12px;
      padding: 1.5rem 1.2rem;
      text-align: center;
      margin: 2.5rem 0 1.5rem 0;
      color: #fff;
      box-shadow: 0 2px 12px 0 rgba(127,90,240,0.10);
    }
    .borsa-motivation-title {
      font-size: 1.18rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.7rem;
    }
    .borsa-motivation-story {
      font-size: 1.05rem;
      color: #fff;
      margin-bottom: 1.1rem;
    }
    .borsa-motivation-quote {
      color: #232946;
      font-size: 1.08rem;
      font-style: italic;
    }
    .borsa-action {
      text-align: center;
      margin: 2.5rem 0 1.5rem 0;
    }
    .borsa-action-btn {
      background: linear-gradient(90deg, #7F5AF0 60%, #4DA3FF 100%);
      color: #fff;
      font-weight: 700;
      font-size: 1.08rem;
      border: none;
      border-radius: 10px;
      padding: 0.9rem 2.2rem;
      text-decoration: none;
      box-shadow: 0 2px 12px 0 rgba(127,90,240,0.10);
      transition: background 0.18s, color 0.18s, transform 0.18s;
      display: inline-block;
      cursor: pointer;
    }
    .borsa-action-btn:hover, .borsa-action-btn:focus {
      background: linear-gradient(90deg, #4DA3FF 60%, #7F5AF0 100%);
      color: #232946;
      transform: scale(1.06);
    }
    @media (max-width: 700px) {
      #borsa-content { padding: 0.7rem; }
      .borsa-title { font-size: 1.2rem; }
      .borsa-section-title { font-size: 1.05rem; }
      .borsa-info-cards { flex-direction: column; gap: 0.7rem; }
      .borsa-flex-cols { flex-direction: column; gap: 0.7rem; }
    }
  `;
  document.head.appendChild(style);

  // --- İçerik verisi ---
  const data = {
    title: '🏷️ Borsa Nedir? – Karmaşık Değil, Anlaşılır Bir Şekilde',
    desc: `Borsa denilince akla grafikler, ekranlar, karışık terimler geliyor olabilir.<br>
Ama aslında borsa, şirketlerin büyümek için yatırım aldığı; yatırımcıların ise bu şirketlere ortak olduğu bir sistemdir.<br>
Bu sayfada borsanın mantığını sade örneklerle anlatıyoruz.`,
    img: {
      src: '/static/images/borsa-isleyisi.png',
      alt: 'Borsa Nasıl İşler?',
      caption: 'Şirketler büyümek için yatırım alır. Yatırımcılar bu şirketlerin bir parçası olur. Borsa bu alışverişin gerçekleştiği yerdir.'
    },
    example: {
      html: `<b>💡 100 TL ile Ne Olurdu?</b><br>
Eğer 5 yıl önce X şirketine 100 TL yatırsaydınız, bugün paranız yaklaşık 320 TL olurdu.<br>
Ama Z şirketine yatırsaydınız, 70 TL'ye düşebilirdi.<br>
<span class="borsa-example-note">Borsa risklidir ama bilgiyle potansiyel getirisi yüksektir.</span>`
    },
    sections: [
      {
        title: 'Borsa Ne İşe Yarar?',
        html: `<p>Borsa, şirketler ile yatırımcıları buluşturan organize bir piyasa olarak tanımlanır. Şirketler, borsa sayesinde büyümeleri için ihtiyaç duydukları sermayeyi halka açılarak toplayabilir; yatırımcılar ise tasarruflarını hisse senedi, tahvil gibi varlıklara yatırarak getiri elde etme fırsatı bulur. Yani borsanın temel işlevi, şirketlerin fon ihtiyacını karşılamak ve yatırımcılara birikimlerini değerlendirebilecekleri güvenli bir ortam sunmaktır. Borsalar bu sayede ekonomiye canlılık katar: sıkça söylenildiği gibi borsalar ekonomik büyümenin adeta can damarıdır. Çünkü şirketlere kaynak sağlarken, yatırımcılara da paralarını çeşitli yatırımlarla büyütme ve portföylerini çeşitlendirme imkânı tanır. Borsalar devlet denetiminde, belli kurallar çerçevesinde işler. Bu sayede alım satım işlemlerinin şeffaf ve adil koşullarda gerçekleşmesi sağlanır. Örneğin Türkiye'de Borsa İstanbul, Sermaye Piyasası Kurulu (SPK) gözetiminde faaliyet gösterir ve bütün işlemler kayıt altındadır. Güncel fiyatlar arz-talep dengesine göre oluşur ve herkes aynı bilgiyi görerek işlem yapar. Sonuç olarak borsa, hem şirketler hem yatırımcılar için kazan-kazan ortamı yaratan, ekonomide tasarrufların yatırıma dönüşmesine aracılık eden kritik bir kurumdur.</p>`,
        infoCards: [
          { emoji: '🏢', title: 'Şirketler için', desc: 'Sermaye toplamak ve büyümek.' },
          { emoji: '👤', title: 'Yatırımcılar için', desc: 'Şirketlere ortak olup kazanç sağlamak.' },
          { emoji: '🌍', title: 'Ülke ekonomisi için', desc: 'Paranın yatırıma, yatırımdan üretime dönüşmesini sağlamak.' }
        ],
        example: {
          html: `<b>Örnek:</b><br>Bir şirket yeni fabrika kurmak istiyor ama parası yok. Hisse senedi satarak yatırımcılardan fon topluyor. Yatırımcı da o şirketin %0.001 ortağı oluyor. Eğer şirket büyürse, o da kazanıyor.`
        }
      },
      {
        title: 'Borsada Neye Yatırım Yapılır?',
        html: `<p>Borsada birçok farklı yatırım aracına yatırım yapabilirsin. Örneğin borsada hisse senetleri, tahviller, emtialar gibi çeşitli finansal ürün alınıp satılır. Aşağıda borsada işlem gören başlıca yatırım araçları listelenmiştir:</p>`,
        investList: [
          { emoji: '📈', html: '<b>Hisse Senetleri:</b> Şirket ortaklık paylarıdır. Bir şirketin hisse senedini satın aldığında o şirkete ortak olmuş olursun. Hisse değer kazandıkça senin yatırımın da değerlenir, ayrıca şirket kâr ederse temettü (kâr payı) geliri elde edebilirsin.' },
          { emoji: '💵', html: '<b>Tahviller / Bonolar:</b> Devletin ya da şirketlerin çıkardığı borçlanma senetleridir. Bir tahvil aldığında, ihraç eden kuruluşa belirli bir süre için borç vermiş olursun. Vade sonunda anaparanı faiz getirisiyle birlikte geri alırsın.' },
          { emoji: '⛏️', html: '<b>Emtialar:</b> Altın, gümüş, petrol, buğday gibi ticari mallar da borsa piyasalarında alınıp satılabilir.' },
          { emoji: '🧺', html: '<b>Borsa Yatırım Fonları (ETF) ve Yatırım Fonları:</b> Bu araçlar, içinde birden çok hisse senedi veya emtia barındıran portföy sepetleridir.' },
          { emoji: '⚡', html: '<b>Türev Ürünler:</b> Vadeli işlem sözleşmeleri ve opsiyonlar gibi ileri düzey yatırım araçlarıdır.' }
        ],
        note: 'Not: Borsada yatırım araçları çeşitlidir ve risk/getiri tercihinize göre seçim yapabilirsiniz.'
      },
      {
        title: 'Borsa Nasıl Çalışır?',
        html: `<p>Borsanın çalışma prensibi arz ve talep dengesine dayanır. Borsada bir menkul kıymetin fiyatını alıcı ve satıcıların o varlığa olan talebi belirler. Fiyatlar sürekli olarak alıcı-satıcı dengesine göre değişir. Bu dengeyi etkileyen pek çok faktör vardır: Şirketin kâr etmesi, ülke ekonomisindeki gelişmeler, faiz oranları, hatta global siyasi olaylar bile yatırımcıların alım-satım kararlarını etkiler. Borsada fiyat oluşumu, anlık olarak bu gelişmelere ve beklentilere göre dalgalanan arz-talep dinamikleri sonucunda gerçekleşir.</p><p>Borsa işlemleri günümüzde tamamen elektronik ortamda gerçekleşir. Yatırımcılar, bir aracı kurum vasıtasıyla borsada işlem yapar. Alım-satım emirleri otomatik olarak eşleşir ve işlemler saniyeler içinde tamamlanır. Borsa, yüksek hızda ve güvenilirlikte alıcılarla satıcıları buluşturur.</p><p>Borsanın çalışma saatleri önceden belirlenmiştir. Türkiye'de Borsa İstanbul genellikle hafta içi 09:40-18:10 arası açıktır. Hafta sonları ve resmi tatillerde kapalıdır. Borsa yönetimi ve otoriteler sürekli gözetim yapar. Sonuç olarak, borsa herkesin eşit kurallarla katıldığı, fiyatların anlık arz-talebe göre belirlendiği ve teknolojik altyapı sayesinde milyarlarca liralık işlemin güvenle yapıldığı bir sistemdir.</p>`
      },
      {
        title: 'Borsada Para Kazanmak ve Kaybetmek',
        flexCols: [
          { title: 'Kazanç', class: 'borsa-profit', html: 'Borsada para kazanmanın temel yolları, düşük fiyattan alıp yüksek fiyattan satmak ve şirketlerin kâr payı (temettü) dağıtımlarından yararlanmaktır. Uzun vadede iyi performans gösteren şirketlere ortak olan bir yatırımcı hem hisse fiyatı artışından hem de düzenli temettü ödemelerinden önemli kazanç sağlayabilir.' },
          { title: 'Kayıp', class: 'borsa-loss', html: 'Borsada kazanmak kadar kaybetmek de mümkündür. Hisse fiyatları her zaman yükselecek diye bir garanti yoktur. Bilinçsizce hareket edilirse para kaybetmek de kaçınılmaz olabilir. Bu nedenle hem fırsatları hem riskleri bilmek çok önemlidir.' }
        ]
      },
      {
        title: 'Borsa Yatırımcısı Olmak Ne Demek?',
        html: `<p>Borsa yatırımcısı olmak, elindeki birikimleri şirketlere veya diğer finansal enstrümanlara yatırıp getiri elde etmeye çalışan bir paydaş olmaktır. Bir borsa yatırımcısı, örneğin bir şirketin hisse senedini aldığında o şirketin ortağı haline gelir ve şirketin büyümesinden ve kârından pay alma hakkı elde eder. Borsa yatırımcısı olmak, potansiyel yüksek kazançlarla birlikte risk almayı da kabul etmek demektir. Hisse değer kazanırsa para kazanırsın, ancak değer kaybederse zarar da edebilirsin. Bu nedenle borsa yatırımcılığı, bilinçli şekilde risk ve getiri dengesini gözetmeyi gerektirir.</p><p>Ayrıca borsa yatırımcısı olmak, uzun soluklu bir yolculuğa çıkmak gibidir. Bu yolculukta başarılı olabilmek için sürekli öğrenmeye ve kendini geliştirmeye açık olmak gerekir. Unutma, borsa yatırımı bir maraton gibidir – kısa yoldan köşeyi dönmekten ziyade sabırla ve disiplinle ilerlemeyi gerektirir.</p>`
      },
      {
        title: 'Sık Sorulan Sorular (Mini SSS)',
        sss: [
          { q: '❓ Borsa kumar mı?', a: '❗ Hayır. Bilgiyle, analizle yapılan yatırım ile şans oyunları farklıdır.' },
          { q: '❓ Ne kadar parayla başlayabilirim?', a: '✅ 100 TL ile bile borsada yatırım yapılabilir.' },
          { q: '❓ Borsa sadece zenginler için mi?', a: '❌ Hayır. Küçük yatırımcılar için fonlar, temettü hisseleri gibi birçok araç vardır.' }
        ]
      },
      {
        title: 'Yeni Başlayanlar İçin Mini Borsa Sözlüğü',
        sozluk: [
          { emoji: '📈', html: '<b>Hisse Senedi:</b> Şirket ortaklık payı' },
          { emoji: '💵', html: '<b>Temettü:</b> Şirket kârından yatırımcıya dağıtılan pay' },
          { emoji: '👜', html: '<b>Portföy:</b> Sahip olduğun tüm yatırım araçları' },
          { emoji: '📊', html: '<b>Endeks:</b> Belirli şirketlerin genel performansını ölçen gösterge' },
          { emoji: '🌪️', html: '<b>Volatilite:</b> Fiyatlardaki dalgalanma oranı' }
        ]
      },
      {
        title: 'Ben de Yapabilirim',
        motivation: {
          title: 'Ben de Yapabilirim',
          story: 'Mehmet 19 yaşındaydı. İlk maaşıyla yatırım fonu aldı. İlk zamanlar anlamıyordu ama okumaya başladı.<br>3 yıl içinde 4 farklı şirketi tanıdı, bazılarını kaybetti, bazılarını kazandı.<br>Şimdi portföyünü takip ediyor ve öğrendikçe güveni artıyor.',
          quote: '🧠 <i>Borsa uzman işi değildir; sabır, bilgi ve biraz cesaret işidir.</i>'
        }
      }
    ]
  };

  // --- Sayfa oluşturucu ---
  const root = document.getElementById('borsa-content');
  if (!root) return;

  // Başlık ve açıklama
  root.appendChild(createEl('h1', { class: 'borsa-title', text: data.title }));
  root.appendChild(createEl('div', { class: 'borsa-desc', html: data.desc }));

  // Görsel blok
  const imgBlock = createEl('div', { class: 'borsa-img-block' });
  const img = createEl('img', { class: 'borsa-img', attrs: { src: data.img.src, alt: data.img.alt } });
  const imgCap = createEl('div', { class: 'borsa-img-caption', text: data.img.caption });
  imgBlock.appendChild(img);
  imgBlock.appendChild(imgCap);
  root.appendChild(imgBlock);

  // Örnek kutusu
  root.appendChild(createEl('div', { class: 'borsa-example-block', html: data.example.html }));

  // Bölümler
  data.sections.forEach(section => {
    // Motivasyon kutusu hariç
    if (section.motivation) {
      const sec = createEl('section', { class: 'borsa-section borsa-motivation' });
      const box = createEl('div', { class: 'borsa-motivation-box' });
      box.appendChild(createEl('div', { class: 'borsa-motivation-title', text: section.motivation.title }));
      box.appendChild(createEl('div', { class: 'borsa-motivation-story', html: section.motivation.story }));
      box.appendChild(createEl('div', { class: 'borsa-motivation-quote', html: section.motivation.quote }));
      sec.appendChild(box);
      root.appendChild(sec);
      return;
    }
    const sec = createEl('section', { class: 'borsa-section' });
    sec.appendChild(createEl('h2', { class: 'borsa-section-title', text: section.title }));
    if (section.html) {
      const temp = document.createElement('div');
      temp.innerHTML = section.html;
      Array.from(temp.childNodes).forEach(n => sec.appendChild(n));
    }
    if (section.infoCards) {
      const cards = createEl('div', { class: 'borsa-info-cards' });
      section.infoCards.forEach(card => {
        const c = createEl('div', { class: 'borsa-info-card' });
        c.appendChild(createEl('div', { class: 'borsa-info-title', text: card.emoji + ' ' + card.title }));
        c.appendChild(createEl('div', { class: 'borsa-info-desc', text: card.desc }));
        cards.appendChild(c);
      });
      sec.appendChild(cards);
    }
    if (section.example) {
      sec.appendChild(createEl('div', { class: 'borsa-example-block', html: section.example.html }));
    }
    if (section.investList) {
      const ul = createEl('div', { class: 'borsa-invest-list' });
      section.investList.forEach(item => {
        const li = createEl('div', { class: 'borsa-invest-item' });
        li.appendChild(createEl('span', { class: 'borsa-invest-emoji', text: item.emoji }));
        const temp = document.createElement('span');
        temp.innerHTML = item.html;
        li.appendChild(temp);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
    }
    if (section.note) {
      sec.appendChild(createEl('div', { class: 'borsa-note', text: section.note }));
    }
    if (section.flexCols) {
      const flex = createEl('div', { class: 'borsa-flex-cols' });
      section.flexCols.forEach(col => {
        const c = createEl('div', { class: 'borsa-col' });
        c.appendChild(createEl('div', { class: 'borsa-col-title ' + col.class, text: col.title }));
        c.appendChild(createEl('p', { html: col.html }));
        flex.appendChild(c);
      });
      sec.appendChild(flex);
    }
    if (section.sss) {
      const sssList = createEl('div', { class: 'borsa-sss-list' });
      section.sss.forEach(qa => {
        const item = createEl('div', { class: 'borsa-sss-item' });
        item.appendChild(createEl('span', { class: 'borsa-sss-q', text: qa.q }));
        item.appendChild(createEl('span', { class: 'borsa-sss-a', text: qa.a }));
        sssList.appendChild(item);
      });
      sec.appendChild(sssList);
    }
    if (section.sozluk) {
      const sozList = createEl('div', { class: 'borsa-sozluk-list' });
      section.sozluk.forEach(item => {
        const li = createEl('div', { class: 'borsa-sozluk-item' });
        li.appendChild(createEl('span', { class: 'borsa-sozluk-emoji', text: item.emoji }));
        const temp = document.createElement('span');
        temp.innerHTML = item.html;
        li.appendChild(temp);
        sozList.appendChild(li);
      });
      sec.appendChild(sozList);
    }
    root.appendChild(sec);
  });

  // --- Aksiyon butonu ---
  const action = createEl('div', { class: 'borsa-action' });
  const btn = createEl('a', { class: 'borsa-action-btn', text: 'Borsaya Başlamak İçin Uygulamalı Alanlara Git →', attrs: { href: '/sende-basla/' } });
  action.appendChild(btn);
  root.appendChild(action);

  // 2️⃣ Başlıkları estetikleştir
  document.querySelectorAll('#borsa-content h2, #borsa-content h3').forEach(h => {
    h.style.fontWeight = '700';
    h.style.color = '#A0A0FF';
    h.style.fontSize = h.tagName === 'H2' ? '1.5rem' : '1.2rem';
    h.style.marginTop = '2.2rem';
    h.style.marginBottom = '0.7rem';
    h.style.letterSpacing = '-0.5px';
    h.style.borderBottom = '1.5px solid #333366';
    h.style.display = 'inline-block';
    h.style.paddingBottom = '0.2em';
  });

  // 3️⃣ "Örnek" paragraflarını kutuya dönüştür
  document.querySelectorAll('#borsa-content p').forEach(p => {
    if (p.textContent.trim().startsWith('Örnek:')) {
      p.style.background = 'rgba(30,40,60,0.7)';
      p.style.borderLeft = '5px solid #4DA3FF';
      p.style.borderRadius = '8px';
      p.style.padding = '1em 1.2em';
      p.style.fontStyle = 'italic';
      p.style.color = '#CCCCCC';
      p.style.margin = '1.5em 0';
      p.style.boxShadow = '0 2px 8px #0002';
    }
  });

  // 4️⃣ Bilgi başlıkları (madde listeleri) kart gibi biçimlendir
  document.querySelectorAll('#borsa-content ul').forEach(ul => {
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    ul.querySelectorAll('li').forEach(li => {
      // Şirketler/Yatırımcılar/Ülke için özel emoji ve stil
      if (li.textContent.includes('Şirketler için')) li.innerHTML = '🏢 <b>Şirketler için:</b>' + li.innerHTML.split(':')[1];
      if (li.textContent.includes('Yatırımcılar için')) li.innerHTML = '👤 <b>Yatırımcılar için:</b>' + li.innerHTML.split(':')[1];
      if (li.textContent.includes('Ülke ekonomisi için')) li.innerHTML = '🌍 <b>Ülke ekonomisi için:</b>' + li.innerHTML.split(':')[1];
      li.style.background = '#181A2A';
      li.style.borderRadius = '8px';
      li.style.padding = '0.7em 1em';
      li.style.margin = '0.5em 0';
      li.style.fontSize = '1.05em';
      li.style.color = '#E0E0E0';
    });
  });

  // 5️⃣ SSS kutuları oluştur
  document.querySelectorAll('#borsa-content h2, #borsa-content h3').forEach(h => {
    if (h.textContent.toLowerCase().includes('sss')) {
      let ul = h.nextElementSibling;
      if (ul && ul.tagName === 'UL') {
        ul.querySelectorAll('li').forEach(li => {
          li.style.background = '#232946';
          li.style.borderRadius = '8px';
          li.style.padding = '0.8em 1em';
          li.style.margin = '0.7em 0';
          li.style.color = '#A0C1FF';
          li.style.fontWeight = '600';
          // Soru ve cevabı ayır
          let [q, ...a] = li.innerHTML.split('<br>');
          li.innerHTML = `<span style="color:#4DA3FF;font-weight:700;">${q}</span><br><span style="color:#CCCCCC;font-weight:400;">${a.join('<br>')}</span>`;
        });
      }
    }
  });

  // 6️⃣ Mini Sözlük bölümü
  document.querySelectorAll('#borsa-content h2, #borsa-content h3').forEach(h => {
    if (h.textContent.toLowerCase().includes('sözlük')) {
      let ul = h.nextElementSibling;
      if (ul && ul.tagName === 'UL') {
        ul.style.background = '#181A2A';
        ul.style.borderRadius = '8px';
        ul.style.padding = '1em';
        ul.querySelectorAll('li').forEach(li => {
          li.style.fontWeight = '500';
          li.style.margin = '0.3em 0';
          li.style.fontSize = '1.01em';
          li.innerHTML = '📘 ' + li.innerHTML;
        });
      }
    }
  });

  // 7️⃣ "Ben de yapabilirim" bölümü
  document.querySelectorAll('#borsa-content div, #borsa-content p').forEach(el => {
    if (el.textContent.includes('Ben de Yapabilirim')) {
      el.style.background = 'linear-gradient(90deg, #7F5AF0 60%, #4DA3FF 100%)';
      el.style.borderRadius = '12px';
      el.style.padding = '1.5em 1.2em';
      el.style.textAlign = 'center';
      el.style.color = '#fff';
      el.style.margin = '2.5em 0 1.5em 0';
      el.style.boxShadow = '0 2px 12px 0 rgba(127,90,240,0.10)';
      // Motivasyon cümlesi italik ve büyük
      el.querySelectorAll('span, b, i').forEach(span => {
        if (span.textContent.includes('Borsa uzman işi değildir')) {
          span.style.fontStyle = 'italic';
          span.style.fontSize = '1.15em';
          span.style.display = 'block';
          span.style.marginTop = '1em';
        }
      });
    }
  });

  // 8️⃣ İçindekiler menüsü (opsiyonel, başa eklenir)
  const toc = document.createElement('nav');
  toc.className = 'borsa-toc';
  toc.innerHTML = '<b>İçindekiler</b><ul></ul>';
  const tocUl = toc.querySelector('ul');
  document.querySelectorAll('#borsa-content h2').forEach((h, i) => {
    h.id = 'bolum-' + i;
    const li = document.createElement('li');
    li.innerHTML = `<a href="#bolum-${i}">${h.textContent}</a>`;
    tocUl.appendChild(li);
    li.querySelector('a').onclick = e => {
      e.preventDefault();
      document.getElementById('bolum-' + i).scrollIntoView({behavior:'smooth'});
    };
  });
  const content = document.getElementById('borsa-content');
  if (content) content.prepend(toc);
})(); 