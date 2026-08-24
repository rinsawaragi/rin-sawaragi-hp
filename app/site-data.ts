const assetPath = (filename: string) =>
  `${import.meta.env.BASE_URL}assets/${filename}`;

export const siteData = {
  siteUrl: import.meta.env.VITE_SITE_URL || "https://rin-sawaragi.com",
  brand: {
    name: "Rin Sawaragi",
    title: "Composer / Arranger",
  },
  assets: {
    logo: assetPath("rs-logo.png"),
    character: assetPath("rin-sawaragi-character.png"),
    ogImage: assetPath("ogp.webp"),
  },
  links: {
    youtube:
      "https://www.youtube.com/@%E6%BE%A4%E3%83%A9%E3%82%AE%E3%83%AA%E3%83%B3",
    worksPlaylist:
      "https://www.youtube.com/playlist?list=PLRrpTfiKh0qY",
    x: "https://x.com/r_sawaragi",
    twitch: "https://www.twitch.tv/rin_sawaragi",
    contactForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSdRXaPoJ27ZulnItpRlx3i_1v6HrGlqGFkrZVKXQoOaKhlgoQ/viewform?usp=publish-editor",
  },
  works: [
    {
      id: "featured",
      label: "Featured",
      youtubeId: "JrSxgBxpuaI",
      title: "destructive instinct",
      role: "Lyrics • Composition • Arrangement • Mix • Mastering",
    },
    {
      id: "newest",
      label: "Newest",
      youtubeId: "JrSxgBxpuaI",
      title: "destructive instinct",
      role: "Lyrics • Composition • Arrangement • Mix • Mastering",
    },
  ],
  packages: [
    {
      name: "Full Package",
      price: "¥79,800",
      description:
        "作詞・作曲・編曲からMIX・マスタリングまで、楽曲制作の全工程を一貫して行います。",
      featured: true,
    },
    {
      name: "Lyrics（作詞）",
      price: "¥9,800",
      description:
        "楽曲のコンセプトや世界観、歌唱する方の個性に合わせて歌詞を制作します。",
    },
    {
      name: "Composition（作曲）",
      price: "¥14,800",
      description:
        "ご希望のイメージや用途に合わせて、メロディと楽曲の基本構成を制作します。",
    },
    {
      name: "Arrangement（編曲）",
      price: "¥49,800",
      description:
        "既存のメロディや楽曲構成をもとに、楽器構成・サウンドデザインを含む編曲を行います。",
    },
    {
      name: "Arrangement + MIX / Mastering",
      price: "¥69,800",
      description:
        "編曲に加えてMIX・マスタリングまで行い、そのまま公開・配信に使用できる完成音源へ仕上げます。",
    },
  ],
  options: [
    {
      name: "作詞ディレクション",
      price: "¥5,000",
      description:
        "ご依頼者様が制作した歌詞に対し、構成・言葉選び・歌いやすさなどの観点から調整やご提案を行います。",
    },
    {
      name: "ボーカルディレクション",
      price: "¥5,000",
      description:
        "レコーディング時またはご提出いただいた歌唱データに対し、楽曲の表現意図に合わせて、歌い方・ニュアンス・フレージングなどの歌唱ディレクションを行います。",
    },
    {
      name: "パラデータ納品",
      price: "¥5,000",
      description: "各トラックを個別に書き出したオーディオデータを納品します。",
    },
    {
      name: "ステムデータ納品",
      price: "¥5,000",
      description:
        "ボーカル・ドラム・ギター・シンセなど、パートごとにまとめたオーディオデータを納品します。",
    },
    {
      name: "著作権譲渡",
      price: "要相談",
      description:
        "作詞・作曲に関する著作権の譲渡または完全買い切りをご希望の場合に、利用範囲や条件に応じて個別にお見積もりします。",
    },
  ],
  deliveryTime: "約○〜○週間",
  flow: [
    {
      title: "お問い合わせ",
      description: "お問い合わせフォームまたはXよりご連絡ください。",
    },
    {
      title: "お見積り",
      description:
        "ご依頼内容を確認し、正式なお見積り・納期をご案内いたします。",
    },
    {
      title: "制作",
      description:
        "通常、ご依頼確定後1週間以内にワンコーラスのデモをご提出いたします。方向性をご確認いただいた後、フルサイズの制作へ進みます。",
    },
    {
      title: "修正",
      description:
        "お打ち合わせ時に確定した内容の範囲内であれば、ご納得いただけるまで修正対応いたします。制作開始後の仕様変更や大幅な方向性の変更については、追加料金をご案内する場合があります。",
    },
    {
      title: "納品",
      description: "完成した楽曲をご希望の形式で納品いたします。",
    },
  ],
  faqs: [
    {
      question: "初めての依頼でも大丈夫ですか？",
      answer: [
        "はい。初めてご依頼いただく方にも分かりやすくご案内いたします。ご不明な点がございましたら、お気軽にお問い合わせください。",
      ],
    },
    {
      question: "商用利用は可能ですか？",
      answer: [
        "はい。商用利用を前提とした制作にも対応しております。利用用途に応じてご案内いたします。",
      ],
    },
    {
      question: "対応ジャンルを教えてください。",
      answer: [
        "デジタルサウンドを軸に、メタル・ロック・アニソン・バラードなど幅広く対応しております。その他のジャンルについてもお気軽にご相談ください。",
      ],
    },
    {
      question: "インストゥルメンタル楽曲の制作も依頼できますか？",
      answer: [
        "はい。歌ものだけでなく、インストゥルメンタル楽曲の制作にも対応しております。用途に応じてお気軽にご相談ください。",
      ],
    },
    {
      question: "権利関係はどのようになりますか？",
      answer: [
        "納品した完成音源の原盤権は、原則としてご依頼者様に帰属します。配信・販売・MVや動画への使用・ライブでの演奏など、ご自身のアーティスト活動にご利用いただけます。",
        "一方、作詞・作曲に関する著作権および著作権使用料を受け取る権利は、各著作者に帰属します。制作料金には、作詞・作曲の著作権譲渡は含まれておりません。",
        "著作権の譲渡または完全買い切りをご希望の場合は、利用範囲や条件に応じて個別にお見積もりいたします。",
      ],
    },
  ],
} as const;
