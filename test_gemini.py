import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

response = client.models.generate_content(
    model="gemini-1.5-flash",
    contents="Validate this SaaS idea: AI fitness coach app"
)

print(response.text)

