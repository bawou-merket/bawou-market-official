// /engine-cloud.js
// هذا هو المحرك "العالمي" المكتمل لمنظومة Bawou
// يدعم: المنتجات (Products)، المقال الفردي (Article)، وكل المقالات (Blog Grid)

// -----------------------------------------------------------------
// الخطوة 1: "المفاتيح" الخاصة بك (التي نسختها)
// -----------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAYJ93mMFkEYWZbM3yBVZhRwDkV2onNOK4",
  authDomain: "bawou-market-f5810.firebaseapp.com",
  databaseURL: "https://bawou-market-f5810-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bawou-market-f5810",
  storageBucket: "bawou-market-f5810.firebasestorage.app",
  messagingSenderId: "194178099231",
  appId: "1:194178099231:web:078bb3150e035071b34d2a",
  measurementId: "G-SM96F4SZ7V"
};
// -----------------------------------------------------------------

// الخطوة 2: تهيئة Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); 

// الخطوة 3: انتظر تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  console.log("Bawou Cloud Engine: Activated. ⚜️ Connecting to Firestore...");
  
  // --- محرك المنتجات (موجود) ---
  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
    const category = productGrid.dataset.category; 
    if (category) {
      console.log(`Bawou Cloud Engine: Loading category [${category}] from Cloud...`);
      loadProductsFromCloud(category, productGrid);
    } else {
      console.error("Bawou Cloud Engine: Error! data-category attribute is missing on product-grid.");
    }
  }
  
  // --- محرك المقال الفردي (موجود) ---
  const articleContainer = document.getElementById("article-content");
  if (articleContainer) {
    console.log(`Bawou Cloud Engine: Loading Single Blog Article...`);
    // ملاحظة: هذا الكود المبدئي يجلب مقال واحد فقط
    // سنطوره لاحقاً ليجلب المقال الصحيح بناءً على الرابط
    loadArticleFromCloud(articleContainer); 
  }

  // --- ✅ الترقية 11.3: محرك شبكة المجلة (الجديد) ---
  const articleGrid = document.getElementById("article-grid");
  if (articleGrid) {
    console.log(`Bawou Cloud Engine: Loading All Blog Articles...`);
    loadAllArticlesFromCloud(articleGrid); // <-- هذه هي الوظيفة الجديدة
  }
});


/**
 * وظيفة تحميل المنتجات (موجودة)
 */
async function loadProductsFromCloud(category, gridElement) {
  try {
    const snapshot = await db.collection("products")
                             .where("category", "==", category)
                             .get();
    if (snapshot.empty) {
      gridElement.innerHTML = "<p>لا توجد منتجات لعرضها حالياً.</p>";
      return;
    }
    gridElement.innerHTML = ""; 
    snapshot.forEach(doc => {
      const product = doc.data(); 
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/400x400/10141c/f5d26b?text=Bawou';" />
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <a href="#" class="btn gold">شراء الآن</a>
      `;
      gridElement.appendChild(card);
    });
  } catch (error) {
    console.error("Bawou Cloud Engine: Error loading products: ", error);
  }
}


/**
 * وظيفة تحميل المقال الفردي (موجودة)
 */
async function loadArticleFromCloud(container) {
  try {
    const snapshot = await db.collection("articles")
                             .where("status", "==", "published")
                             .limit(1) 
                             .get();
    if (snapshot.empty) {
      container.innerHTML = "<p>لم يتم العثور على المقال.</p>";
      return;
    }
    container.innerHTML = ""; 
    const doc = snapshot.docs[0];
    const article = doc.data(); 
    const header = document.createElement("header");
    header.className = "article-header";
    header.innerHTML = `
      <h1 class="article-title">${article.title}</h1>
      <p class="article-meta">
        <span>بقلم: <a href="https://orcid.org/0009-0007-7430-7565" target="_blank">${article.author}</a></span>
      </p>
    `;
    const image = document.createElement("img");
    image.src = article.imageUrl;
    image.alt = article.title;
    image.className = "article-image";
    const body = document.createElement("div");
    body.className = "article-body";
    body.innerHTML = article.content; 
    container.appendChild(header);
    container.appendChild(image);
    container.appendChild(body);
  } catch (error) {
    console.error("Bawou Cloud Engine: Error loading article: ", error);
  }
}


/**
 * ✅ الترقية 11.3: وظيفة "عالمية" جديدة لتحميل "كل" المقالات
 * @param {HTMLElement} gridElement - العنصر الذي سنضيف فيه بطاقات المقالات
 */
async function loadAllArticlesFromCloud(gridElement) {
  try {
    // 1. اطلب "كل" المقالات المنشورة
    const snapshot = await db.collection("articles")
                             .where("status", "==", "published")
                             // .orderBy("date", "desc") // <-- سنضيف هذا لاحقاً لترتيبها
                             .get();

    if (snapshot.empty) {
      console.log("Bawou Cloud Engine: No published articles found.");
      gridElement.innerHTML = "<p>لا توجد مقالات لعرضها حالياً.</p>";
      return;
    }

    // 2. نظف الشبكة
    gridElement.innerHTML = ""; 

    // 3. مر على "كل" مقال
    snapshot.forEach(doc => {
      const article = doc.data();
      const docId = doc.id; // هذا هو "المعرف العالمي" للمقال
      
      const card = document.createElement("div");
      card.className = "article-card";
      
      // 4. أنشئ "بطاقة المقال" (بتصميم style.css الجديد)
      card.innerHTML = `
        <img src="${article.imageUrl}" alt="${article.title}" class="article-card-image" 
             onerror="this.src='https://placehold.co/400x400/10141c/f5d26b?text=Bawou';" />
        
        <div class="article-card-content">
          <h3 class="article-card-title">${article.title}</h3>
          
          <p class="article-card-summary">
            ${article.content.substring(0, 100)}... 
          </p>
          
          <a href="article-example.html" class="btn gold">اقرأ المزيد</a>
        </div>
      `;
      
      gridElement.appendChild(card);
    });

  } catch (error) {
    console.error("Bawou Cloud Engine: Error loading all articles: ", error);
    gridElement.innerHTML = "<p>حدث خطأ أثناء تحميل المقالات.</p>";
  }
}