// yatirimcilar.js
(function() {
  // 1️⃣ Yatırımcı verisi
  const investors = [
    {
      name: "Ray Dalio",
      shortBio: "Bridgewater Associates kurucusu. Sistem düşünürü.",
      fullBio: {
        lifeStory: "1949'da New York'ta doğan Ray Dalio, 12 yaşında golf sahasında caddy'lik yaparken müşterilerden yatırım tavsiyeleri duyarak borsaya ilgi duymaya başladı. İlk hissesini 300 dolara aldı ve üç katına çıkınca yatırımcılığa tutkuyla bağlandı. 1975'te küçük bir apartman dairesinde kurduğu Bridgewater Associates, ilerleyen yıllarda dünyanın en büyük hedge fonu haline geldi. Özellikle 2008 finans krizini önceden tahmin etmesiyle adını geniş kitlelere duyurdu. Dalio, sadece yatırımcı değil; aynı zamanda sistem düşünürü, liderlik stratejisti ve 'radikal şeffaflık' kavramının öncüsüdür.",
        philosophy: "Dalio'ya göre yatırım, sistematik riskleri anlamak ve çeşitlendirme yoluyla bunları yönetmekle ilgilidir. 'En büyük risk, riskin var olmadığını sanmaktır.' Portföyünü 'All Weather' modeliyle her koşula uyumlu hale getirir.",
        focusPoints: [
          "Küresel ekonomik döngüleri analiz eder.",
          "Portföyünü 'All Weather' modeliyle her koşula uyumlu hale getirir.",
          "Altın, tahvil, hisse senedi, emtia gibi varlıkları dengeler.",
          "Belirsizliğe karşı senaryolarla düşünür.",
          "'Düşünce körlükleri'ne karşı insan zihnini sürekli sorgular."
        ],
        netWorth: "2024 itibarıyla yaklaşık 20 milyar dolar.",
        quote: "Gerçeği aramak, fikir ayrılıklarını açıkça tartışmak ve hatalardan ders çıkarmak, hem hayatta hem yatırımda başarı getirir."
      }
    },
    {
      name: "Warren Buffett",
      shortBio: "Berkshire Hathaway CEO'su. Değer yatırımının efsanesi.",
      fullBio: {
        lifeStory: "1930 yılında Nebraska, Omaha'da doğan Warren Buffett, 11 yaşında ilk hisse senedini satın aldı. Henüz çocuk yaşta para kazanmanın yollarını aramaya başlamış, gazete dağıtmaktan sakız satmaya kadar pek çok küçük işte çalışmıştır. 20'li yaşlarının başında Benjamin Graham'dan değer yatırımı prensiplerini öğrenmiş, ancak kariyerinin ilk yıllarında yaptığı yatırımlar her zaman başarılı olmamıştır. Zamanla öğrendiği derslerle stratejisini netleştirmiş ve Berkshire Hathaway üzerinden yatırım yaparak dünyanın en etkili yatırımcılarından biri haline gelmiştir. Buffett, teknoloji şirketlerine uzun süre mesafeli durmuş, zaman zaman 'fırsatları kaçırdı' eleştirileri almıştır. Ancak bu, onun tutarlı yatırım felsefesine olan bağlılığını gösterir. Yatırım geçmişinde bazı hataları açıkça kabul etmiş, özellikle 1999–2000 dot-com balonunda teknoloji hisselerinden uzak durarak büyük çöküşten korunmuştur.",
        philosophy: "'Bir hisseyi alıyorsam, en az 10 yıl satmamayı göze alarak alırım.' Buffett, kısa vadeli dalgalanmaların değil, uzun vadeli değerin peşindedir. Ona göre borsa, sabırlı yatırımcılar için çalışır.",
        focusPoints: [
          "Yatırım yaptığı şirketin iş modelini tamamen anlamak ister.",
          "Şirketin sürdürülebilir bir rekabet avantajı (moat) olmalı.",
          "Hisseler ancak değerinin altında fiyatlanıyorsa alınmalı.",
          "Yönetim kadrosunun güvenilirliği onun için kritik bir kriterdir.",
          "Borsa düşerken korkmak yerine fırsat arar: 'Başkaları korkarken açgözlü olun.'"
        ],
        netWorth: "2024 itibarıyla ~130 milyar dolar. Servetinin büyük kısmını hayır kurumlarına bağışlama taahhüdü vermiştir.",
        quote: "Fiyat ödediğiniz şeydir, değer elde ettiğiniz şey."
      }
    },
    {
      name: "Cathie Wood",
      shortBio: "ARK Invest kurucusu. Yenilikçi yatırımcı.",
      fullBio: {
        lifeStory: "1955'te Los Angeles'ta doğan Cathie Wood, ekonomiye olan ilgisini genç yaşlarda fark etti. Kariyerine analist olarak başladı ve yıllar içinde teknoloji ve inovasyon şirketlerine olan ilgisiyle tanındı. 2014'te ARK Invest adında kendi yatırım şirketini kurdu. ARK Invest, Tesla, Roku, Zoom, Coinbase gibi şirketlere erken dönemde yaptığı agresif yatırımlarla dikkat çekti. 2020 pandemi döneminde fonları rekor düzeyde yükseldi. Ancak 2022 sonrası teknoloji hisselerinin düşüşe geçmesiyle sert kayıplar da yaşadı. Buna rağmen Wood, uzun vadeli vizyonundan hiç sapmadı. Ona göre gelecek, devrimsel teknolojilerde yatıyor: yapay zekâ, genom bilimi, uzay araştırmaları ve blokzincir.",
        philosophy: "'Yenilikçi şirketlere erken yatırım yap, sabırlı ol, dalgalanmalar seni korkutmasın.' Cathie Wood kısa vadeli volatiliteyle ilgilenmez, 5–10 yıl içinde devrim yaratacak fikirlerin peşinden gider.",
        focusPoints: [
          "Yatırım yaptığı şirketin 'dünyayı değiştirme potansiyeli' olmalı.",
          "Geleneksel bilanço ve kâr verilerinden çok gelecek projeksiyonlarına bakar.",
          "Aşırı düşüşleri fırsat olarak görür.",
          "Yatırımcılarına her hafta şirket stratejisini açıklar (radikal şeffaflık).",
          "Piyasa ona karşı olduğunda bile geri adım atmaz."
        ],
        netWorth: "2024 itibarıyla yaklaşık 200–250 milyon dolar. (Fonlarının yönetim büyüklüğü ise milyarlarca dolar seviyesinde.)",
        quote: "En iyi yatırımlar, çoğu insanın henüz anlamadığı fikirlerde gizlidir."
      }
    },
    {
      name: "Charlie Munger",
      shortBio: "Warren Buffett'ın sağ kolu. Mental modellerin ustası.",
      fullBio: {
        lifeStory: "1924 yılında Omaha'da doğan Charlie Munger, Harvard mezunu bir avukattı. Buffett ile 1959'da tanıştıktan sonra yatırım dünyasında birlikte hareket ettiler. Munger, Berkshire Hathaway'in başkan yardımcısı olarak şirketin yatırım stratejisinde büyük rol oynadı. Hayatı boyunca çok yönlü düşünmeyi, farklı disiplinlerden öğrenmeyi savundu. Munger, Buffett'ın 'değer yatırımı' yaklaşımını daha geniş bir bakış açısıyla zenginleştirdi. 'Mental modeller' kavramını yatırım dünyasına kazandırdı. 2023 yılında 99 yaşında vefat etti.",
        philosophy: "'Fırsatlar nadirdir, sabırlı ol ve büyük oynayacağın zamanı bekle.'",
        focusPoints: [
          "Çok yönlü düşünce ve farklı disiplinlerden öğrenme.",
          "'Ucuz' olanı değil, 'kaliteli' olanı seçmek.",
          "Yatırımda psikolojik tuzaklardan kaçınmak.",
          "Basit ve anlaşılır iş modelleri.",
          "Uzun vadeli ortaklıklar ve güvenilir yönetim."
        ],
        netWorth: "Vefatında yaklaşık 2,5 milyar dolar.",
        quote: "Hayatta ve yatırımda, basit olanı karmaşık olana tercih edin."
      }
    },
    {
      name: "Benjamin Graham",
      shortBio: "Değer yatırımının babası. Buffett'ın hocası.",
      fullBio: {
        lifeStory: "1894'te Londra'da doğan Graham, ailesiyle ABD'ye göç etti. Columbia Üniversitesi'nde ekonomi okudu. 1929 Büyük Buhranı'ndan ağır kayıplarla çıkan Graham, 'değer yatırımı' prensiplerini geliştirdi. 'Akıllı Yatırımcı' ve 'Menkul Kıymet Analizi' kitaplarıyla yatırım dünyasında devrim yarattı. Warren Buffett'ın da hocası olan Graham, riskten korunmayı ve 'güvenlik marjı' kavramını yatırımın temeline koydu.",
        philosophy: "'Bir hisseyi, piyasa fiyatından bağımsız olarak, gerçek değerine göre değerlendirin.'",
        focusPoints: [
          "Hisse senedinin gerçek (içsel) değeri ile piyasa fiyatı arasındaki fark.",
          "'Güvenlik marjı' ile riskten korunma.",
          "Temel analiz ve bilanço okuryazarlığı.",
          "Spekülasyondan uzak durmak.",
          "Uzun vadeli düşünmek."
        ],
        netWorth: "1976'daki vefatında serveti milyon dolarlarla ölçülüyordu, asıl mirası ise fikirleridir.",
        quote: "Kısa vadede piyasa bir oylama makinesi, uzun vadede ise bir tartı makinesidir."
      }
    },
    {
      name: "Elon Musk",
      shortBio: "Tesla, SpaceX ve daha fazlası. Teknoloji vizyoneri.",
      fullBio: {
        lifeStory: "1971'de Güney Afrika'da doğan Musk, genç yaşta programlama ve girişimciliğe ilgi duydu. PayPal'ın kurucularından biri oldu, ardından Tesla, SpaceX, Neuralink ve Starlink gibi devrimsel şirketleri hayata geçirdi. Musk, risk almaktan ve büyük düşünmekten asla çekinmedi. Elektrikli araçlar, uzay yolculuğu ve yapay zekâ gibi alanlarda çığır açtı. Zaman zaman tartışmalı açıklamaları ve sıra dışı yönetim tarzıyla gündeme geldi.",
        philosophy: "'Dünyayı değiştirecek büyük fikirlerin peşinden git.'",
        focusPoints: [
          "Teknolojik inovasyon ve ölçeklenebilirlik.",
          "Yüksek risk, yüksek ödül prensibi.",
          "Uzun vadeli vizyon ve cesaret.",
          "Takım kurma ve liderlik.",
          "Hızlı uygulama ve sürekli öğrenme."
        ],
        netWorth: "2024 itibarıyla 180–220 milyar dolar arası (piyasa dalgalanmalarına göre değişiyor).",
        quote: "Başarısızlık, burada bir seçenek. Eğer başarısız olmuyorsanız, yeterince yenilikçi değilsiniz."
      }
    },
    {
      name: "Whitney Wolfe Herd",
      shortBio: "Bumble kurucusu. Kadın girişimciliğinin öncüsü.",
      fullBio: {
        lifeStory: "1989 doğumlu Whitney Wolfe Herd, Tinder'ın kurucu ekibinde yer aldıktan sonra ayrıldı ve 2014'te kadınların ilk adımı attığı Bumble uygulamasını kurdu. Kısa sürede milyonlarca kullanıcıya ulaşan Bumble, 2021'de halka açıldı ve Wolfe Herd, dünyanın en genç kadın milyarderlerinden biri oldu. Wolfe Herd, kadınların iş dünyasında ve teknolojide daha fazla yer alması için ilham kaynağı oldu. Girişimcilik yolculuğu boyunca cinsiyet eşitliği ve toplumsal değişim için çalıştı.",
        philosophy: "'Toplumsal sorunlara çözüm üreten iş modelleri, uzun vadede kazandırır.'",
        focusPoints: [
          "Kullanıcı odaklı inovasyon.",
          "Toplumsal fayda ve sürdürülebilirlik.",
          "Teknolojide çeşitlilik ve kapsayıcılık.",
          "Marka sadakati ve topluluk oluşturma.",
          "Hızlı büyüme ve esneklik."
        ],
        netWorth: "2024 itibarıyla yaklaşık 500 milyon dolar.",
        quote: "Kendinize inanın ve başkalarının sizi tanımlamasına izin vermeyin."
      }
    }
  ];

  // 2️⃣ Temel stiller
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    body {
      background: #0F1115;
      color: #EAEAEA;
      font-family: 'Poppins', sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }

    #investor-section {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .investor-card {
      background: #1A1A1A;
      border-radius: 10px;
      padding: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .investor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 25px rgba(70, 151, 255, 0.2);
    }

    .investor-name {
      color: #6699FF;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .investor-short {
      color: #EAEAEA;
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .investor-toggle {
      background: #2A2A2A;
      color: #6699FF;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .investor-toggle:hover {
      background: #3A3A3A;
      color: #7AADFF;
    }

    .investor-details {
      background: #222;
      border-radius: 8px;
      padding: 1.5rem;
      margin-top: 1rem;
      font-size: 0.9rem;
      display: none;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }

    .investor-details.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    .detail-section {
      margin-bottom: 1.5rem;
    }

    .detail-section h3 {
      color: #6699FF;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .detail-section p {
      margin: 0.5rem 0;
      line-height: 1.6;
    }

    .focus-points {
      list-style: none;
      padding: 0;
      margin: 0.5rem 0;
    }

    .focus-points li {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
    }

    .focus-points li:before {
      content: "•";
      color: #6699FF;
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    .quote {
      font-style: italic;
      color: #BBB;
      border-left: 3px solid #6699FF;
      padding-left: 1rem;
      margin: 1rem 0;
    }
  `;

  document.head.appendChild(style);

  // 3️⃣ Yatırımcı kartlarını oluştur
  function createInvestorCard(investor) {
    const card = document.createElement('div');
    card.className = 'investor-card';

    const name = document.createElement('h2');
    name.className = 'investor-name';
    name.textContent = investor.name;

    const shortBio = document.createElement('p');
    shortBio.className = 'investor-short';
    shortBio.textContent = investor.shortBio;

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'investor-toggle';
    toggleBtn.innerHTML = '<span>Detayları Gör</span>';

    const details = document.createElement('div');
    details.className = 'investor-details';
    details.innerHTML = `
      <div class="detail-section">
        <h3>Hayat Hikayesi</h3>
        <p>${investor.fullBio.lifeStory}</p>
      </div>
      
      <div class="detail-section">
        <h3>Yatırım Felsefesi</h3>
        <p>${investor.fullBio.philosophy}</p>
      </div>
      
      <div class="detail-section">
        <h3>Odak Noktaları</h3>
        <ul class="focus-points">
          ${investor.fullBio.focusPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>
      
      <div class="detail-section">
        <h3>Tahmini Serveti</h3>
        <p>${investor.fullBio.netWorth}</p>
      </div>
      
      <div class="quote">
        "${investor.fullBio.quote}"
      </div>
    `;

    let isOpen = false;
    toggleBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      details.classList.toggle('active');
      toggleBtn.innerHTML = isOpen ? '<span>Detayları Gizle</span>' : '<span>Detayları Gör</span>';
      
      if (isOpen) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    card.appendChild(name);
    card.appendChild(shortBio);
    card.appendChild(toggleBtn);
    card.appendChild(details);

    return card;
  }

  // 4️⃣ Sayfayı oluştur
  const container = document.getElementById('investor-section');
  investors.forEach(investor => {
    container.appendChild(createInvestorCard(investor));
  });
})(); 