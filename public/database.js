// /database.js
// ---------------------------------------------
// --- Bawou System: The Golden Database ---
// ---------------------------------------------
// هذه هي قاعدة بيانات منتجاتك "الحقيقية"
// عندما تريد إضافة منتج، ستضيفه هنا فقط.

const BAWOU_DB = {
  
  // 1. منتجات Bawou Mina الحقيقية
  mina: [
    {
      id: "mina-001",
      name: "فستان السهرة 'الذهبي'",
      price: "18,500 د.ج",
      imageUrl: "https://i.imgur.com/8QpPj6x.png",
      description: "فستان سهرة فاخر بتصميم فريد يجمع بين الأناقة واللمسة الذهبية."
    },
    {
      id: "mina-002",
      name: "حجاب حريري 'الأميرة'",
      price: "4,200 د.ج",
      imageUrl: "https://i.imgur.com/kYqJt5s.png",
      description: "حجاب من الحرير الطبيعي الفاخر، ناعم الملمس وبألوان ثابتة."
    },
    {
      id: "mina-003",
      name: "عباية 'الجوهرة' السوداء",
      price: "22,000 د.ج",
      imageUrl: "https://i.imgur.com/v0zX7oD.png",
      description: "عباية بتطريز يدوي دقيق، قطعة فنية تليق بالمناسبات الخاصة."
    }
    // <-- أضف منتجات Mina الجديدة هنا
  ],

  // 2. منتجات Bawou Metal الحقيقية
  metal: [
    {
      id: "metal-001",
      name: "شواية 'الزعيم' المحمولة",
      price: "12,800 د.ج",
      imageUrl: "https://i.imgur.com/5D0tQYc.png",
      description: "شواية فحم محمولة من الفولاذ المقاوم للصدأ، مثالية للرحلات."
    },
    {
      id: "metal-002",
      name: "شواية 'الديار' الثابتة",
      price: "34,000 د.ج",
      imageUrl: "https://i.imgur.com/example2.png", // (استخدمت الرابط المؤقت الذي وضعته)
      description: "شواية منزلية ثابتة مصممة للبقاء وتوفير أفضل تجربة شواء."
    }
    // <-- أضف منتجات Metal الجديدة هنا
  ],
  
  // 3. منتجات Bawou Loupeur الحقيقية
  loupeur: [
    {
      id: "loupeur-001",
      name: "عسل السدر 'الذهبي' 500غ",
      price: "3,800 د.ج",
      imageUrl: "https://i.imgur.com/mOq5e0C.png",
      description: "عسل سدر جبلي حر 100% من جبال الجزائر، ذو جودة عالمية."
    }
    // <-- أضف منتجات Loupeur الجديدة هنا
  ]
  
};