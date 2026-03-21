from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")

def get_qa_llm():
    """Get LLM for Q&A."""
    models_to_try = [
        "gemini-2.5-flash",
        "gemini-2.0-flash-exp",
        "gemini-pro",
        "gemini-1.5-pro",
        "gemini-1.5-flash",
    ]
    
    for model_name in models_to_try:
        try:
            return ChatGoogleGenerativeAI(
                model=model_name,
                temperature=0.4,
                api_key=api_key
            )
        except:
            continue
    
    return ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.4)

def ask_followup_question(idea_text: str, analysis_summary: str, question: str) -> str:
    """Answer a follow-up question about the analyzed idea."""
    llm = get_qa_llm()
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a helpful SaaS advisor. Answer questions about the analyzed SaaS idea 
        based on the provided analysis. Be specific, practical, and actionable."""),
        ("human", f"""Original Idea:
{idea_text}

Analysis Summary:
{analysis_summary}

User's Question:
{question}

Please provide a detailed, actionable answer to the user's question.""")
    ])
    
    chain = prompt | llm
    response = chain.invoke({})
    return response.content
