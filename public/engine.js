// /engine.js
// ---------------------------------------------------
// --- Bawou System: The Global CLOUD Engine (v2) ---
// ---------------------------------------------------
// هذا المحرك الآن يقرأ مباشرة من Firebase Cloud Firestore

// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
  console.log("Bawou Engine (v2 - Cloud): Activated.");
  
  // (db) هذا المتغير قادم من الكود الذي أضفته في ملف HTML
  // نتأكد أن Firebase جاهز قبل تشغيل المحرك
  if (typeof db === 'undefined') {
    console.error("Bawou Engine: Firebase Firestore (db) is not defined!");
    return;
  }

  // --- تشغيل وحدات المحرك ---
  
  // 1. ابحث عن شبكة منتجات Mina
  const minaGrid = document.getElementById("mina-product-grid");
  if (minaGrid) {
    console.log("Bawou Engine: Loading Bawou Mina products from Cloud...");
    loadProductsFromCloud('mina', minaGrid); // حمّل منتجات 'mina'
  }
  
  // 2. ابحث عن شبكة منتجات Metal
  const metalGrid = document.getElementById("metal-product-grid");
  if (metalGrid) {
    console.log("Bawou Engine: Loading Bawou Metal products from Cloud...");
    loadProductsFromCloud('metal', metalGrid); // حمّل منتجات 'metal'
  }

  // 3. ابحث عن شبكة منتجات Loupeur
  const loupeurGrid = document.getElementById("loupeur-product-grid");
  if (loupeurGrid) {
    console.log("Bawou Engine: Loading Bawou Loupeur products from Cloud...");
    loadProductsFromCloud('loupeur', loupeurGrid); // حمّل منتجات 'loupeur'
  }
});

/**
 * وظيفة "عالمية" لتحميل أي نوع من المنتجات من Firestore
 * @param {string} category - اسم "المجموعة" (collection) في Firestore
 * @param {HTMLElement} gridElement - عنصر الشبكة الذي سنضيف فيه البطاقات
 */
async function loadProductsFromCloud(category, gridElement) {
  
  try {
    // 1. اطلب البيانات من Firebase Firestore
    // هذا هو الكود "العالمي": "اذهب إلى قاعدة البيانات (db)،
    // ادخل إلى المجموعة (collection) التي اسمها 'category'،
    // واحصل (get) على كل الوثائق (docs)"
    const snapshot = await db.collection(category).get();

    if (snapshot.empty) {
      console.log(`Bawou Engine: No products found in "${category}" collection.`);
      gridElement.innerHTML = "<p>لا توجد منتجات لعرضها حالياً في هذا الصنف.</p>";
      return;
    }

    // 2. امسح أي شيء قديم
    gridElement.innerHTML = ""; 

    // 3. قم بإنشاء بطاقة HTML "حقيقية" لكل منتج قادم من السحاب
    snapshot.forEach(doc => {
      // (product) هي البيانات "الحقيقية" من Firestore
      const product = doc.data();
      const productId = doc.id; // (id) هو المعرف الفريد للوثيقة

      // إنشاء عنصر div الأب
      const card = document.createElement("div");
      card.className = "product-card";
      
      // 4. املأ البطاقة بالبيانات "الحية"
      card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <a href="#" class="btn gold">شراء الآن</a>
      `;
      // (ملاحظة: قريباً سنجعل "شراء الآن" يفتح صفحة تفاصيل المنتج)
      
      // 5. أضف البطاقة "الحقيقية" إلى الشبكة في الصفحة
      gridElement.appendChild(card);
    });

  } catch (error) {
    console.error("Bawou Engine: Error loading products from Firestore:", error);
    gridElement.innerHTML = "<p>حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة لاحقاً.</p>";
  }
}