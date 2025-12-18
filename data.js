/* ================= TRANSLATIONS & DATA ================= */

const translations = {
    ua: {
        nav_entry: "ВХІД",
        nav_dna: "ДНК",
        nav_cat: "КАТАЛОГ",
        nav_faq: "FAQ",
        
        hero_desc: "Від безшумної електрики до дикого бензинового реву. Що обираєш?",
        hero_btn: "Обрати звіра",
        
        feat_1_title: "Технологія",
        feat_1_desc: "Сучасні рішення, продумана інженерія, чиста ефективність.",
        feat_2_title: "Баланс",
        feat_2_desc: "Потужність, вага і керування зведені в одну формулу.",
        feat_3_title: "Потенціал",
        feat_3_desc: "Запас можливостей, який відкривається з досвідом.",

        h_lineup: "LINEUP",
        h_partners: "PARTN4RS",
        h_faq: "ПИТАННЯ",
        h_faq_pre: "ЧАСТІ",

        faq_q1: "Скільки часу займає доставка?",
        faq_a1: "Доставка по Україні займає від 7 до 14 днів. Ми працюємо з Новою Поштою та Укр Поштою. Можливе замовлення кур'єром.",
        faq_q2: "Чи є гарантія та сервіс?",
        faq_a2: "Так, на нові електробайки діє гарантія 12 місяців або 2000 км пробігу. У нас є власний сервісний центр в Ужгороді для тюнінгу та ремонту.",
        faq_q3: "Чи можна купити в розстрочку?",
        faq_a3: "Ми співпрацюємо з Monobank та PrivatBank. Доступна оплата частинами до 6 платежів без відсотків. Деталі уточнюйте у менеджера.",
        faq_q4: "Потрібні права на Surron/Talaria/ERidePro?",
        faq_a4: "Для версій L1e (з поворотниками та дзеркалами) потрібні права категорії А1. Версії Off-Road розцінюються як спортивний інвентар.",

        footer_loc: "м. Ужгород, Закарпатська область 88000",
        
        mod_title: "Замовлення",
        pl_name: "ФІО",
        pl_city: "Місто / Область",
        pl_branch: "Відділення",
        pl_zip: "Поштовий індекс",
        del_text: "Доставка по Україні 7-14 днів",
        btn_send: "Надіслати",
        success_txt: "Успішно!<br>Ми вам передзвонимо.",
        
        stock_in: "В НАЯВНОСТІ",
        stock_out: "НЕМАЄ В НАЯВНОСТІ",
        btn_order: "Замовити"
    },

    en: {
        nav_entry: "ENTRY",
        nav_dna: "DNA",
        nav_cat: "GARAGE",
        nav_faq: "INFO",
        
        hero_desc: "From silent electric to wild gasoline roar. What is your choice?",
        hero_btn: "Choose a Beast",
        
        feat_1_title: "Technology",
        feat_1_desc: "Modern solutions, thoughtful engineering, pure efficiency.",
        feat_2_title: "Balance",
        feat_2_desc: "Power, weight, and handling combined in one formula.",
        feat_3_title: "Potential",
        feat_3_desc: "A reserve of capabilities that opens up with experience.",

        h_lineup: "LINEUP",
        h_partners: "PARTN4RS",
        h_faq: "QUESTIONS",
        h_faq_pre: "FREQ",

        faq_q1: "How long does delivery take?",
        faq_a1: "Delivery across Ukraine takes 7 to 14 days. We work with Nova Poshta and Ukr Poshta. Courier delivery is possible.",
        faq_q2: "Is there a warranty and service?",
        faq_a2: "Yes, new e-bikes come with a 12-month or 2000 km warranty. We have our own service center in Uzhhorod for tuning and repairs.",
        faq_q3: "Can I buy in installments?",
        faq_a3: "We cooperate with Monobank and PrivatBank. Payment by installments up to 6 payments with 0% interest is available. Check details with the manager.",
        faq_q4: "Do I need a license for Surron/Talaria?",
        faq_a4: "For L1e versions (with turn signals and mirrors), an A1 category license is required. Off-Road versions are considered sports equipment.",

        footer_loc: "Uzhhorod, Zakarpattia Oblast 88000",
        
        mod_title: "Order",
        pl_name: "Full Name",
        pl_city: "City / Region",
        pl_branch: "Post Office / Branch",
        pl_zip: "ZIP Code",
        del_text: "Delivery 7-14 days",
        btn_send: "Send Request",
        success_txt: "Success!<br>We will call you back.",

        stock_in: "IN STOCK",
        stock_out: "OUT OF STOCK",
        btn_order: "Order"
    }
};

const bikesData = [

  /* ================= ELECTRIC ================= */

  {
      id: 1,
      image: "assets/surron.jpg",
      price: "4,300 $",
      stock: true,
      specs: [
          "38Ah",
          "6000W",
          "≈ 75 km/h range"
      ],
      name: "Sur-Ron Light Bee X",
  },

  {
      id: 2,
      image: "assets/talaria.jpg",
      price: "5,000 $",
      stock: true,
      specs: [
          "45Ah",
          "8000W",
          "≈ 85 km/h range"
      ],
      name: "Talaria Sting R MX4",
  },

  {
      id: 3,
      image: "assets/e_ride.jpg",
      price: "5,500 $",
      stock: false,
      specs: [
          "40Ah",
          "12000W",
          "≈ 95 km/h range"
      ],
      name: "E-Ride Pro SS 2.0",
  },


  /* ================= GAS ================= */

  {
      id: 4,
      image: "assets/ktm.jpg",
      price: "11,900 $",
      stock: true,
      specs: [
          "693 cc",
          "74 hp",
          "≈ 195 km/h max"
      ],
      name: "Ktm 690 SMC R",
  },

  {
    id: 6,
      image: "assets/yamaha.jpg",
      price: "9,200 $",
      stock: false,
      specs: [
          "449 cc",
          "≈ 55 hp",
          "≈ 185 km/h max"
      ],
      name: "Yamaha WR450F",

  },

  {
      id: 5,
      image: "assets/geon.jpg",
      price: "8,500 $",
      stock: true,
      specs: [
          "450 cc",
          "≈ 52 hp",
          "≈ 170 km/h max"
      ],
      name: "Geon GNS 300",
  },
];