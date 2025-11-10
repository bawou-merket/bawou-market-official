import google.generativeai as genai

# ضع هنا المفتاح الذي حصلت عليه من https://aistudio.google.com/app/apikey
genai.configure(api_key="ضع_مفتاحك_هنا")

model = genai.GenerativeModel("gemini-1.5-pro")

prompt = """
اكتب وصفاً تسويقياً فخماً لمنتج باوو ميتال (شواية جزائرية فاخرة)
باللغات التالية:
- العربية
- الفرنسية
- الإنجليزية
"""

response = model.generate_content(prompt)
print(response.text)
