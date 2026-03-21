import os
import json
from pathlib import Path
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from schema import SaaSIdeaAnalysis
from prompts import SYSTEM_PROMPT, USER_PROMPT_TEMPLATE

# Load .env from script directory
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Get API key with debugging
api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")

print("=" * 50)
print("Debugging API Key Loading")
print(f".env path: {env_path}")
print(f".env exists: {env_path.exists()}")
print(f"API Key found: {'Yes' if api_key else 'No'}")
if api_key:
    print(f"API Key length: {len(api_key)}")
    print(f"First 10 chars: {api_key[:10]}...")
print("=" * 50)

if not api_key:
    raise ValueError(
        "GOOGLE_API_KEY not found!\n"
        f"Looking for .env at: {env_path}\n"
        "Make sure your .env file contains: GOOGLE_API_KEY=your_key_here"
    )

# Set API key in environment explicitly (LangChain sometimes needs this)
os.environ["GOOGLE_API_KEY"] = api_key
os.environ["GEMINI_API_KEY"] = api_key

def analyze_idea(idea: str) -> SaaSIdeaAnalysis:
    """Analyze a SaaS idea and return structured analysis."""
    # Initialize LLM inside function to ensure API key is available
    # Use gemini-2.5-flash which was working
    models_to_try = [
        "gemini-2.5-flash",  # User requested - was working
        "gemini-2.0-flash-exp",
        "gemini-1.5-flash",  # Fallback
        "gemini-pro",
    ]
    
    llm = None
    last_error = None
    
    for model_name in models_to_try:
        try:
            llm = ChatGoogleGenerativeAI(
                model=model_name,
                temperature=0.4,
                api_key=api_key
            )
            print(f"Successfully initialized with model: {model_name}")
            break
        except Exception as e:
            last_error = e
            print(f"Failed with {model_name}: {str(e)[:100]}")
            continue
    
    if llm is None:
        # Last resort: try with environment variable only
        try:
            llm = ChatGoogleGenerativeAI(
                model="gemini-pro",
                temperature=0.4
            )
        except Exception as e:
            raise RuntimeError(
                f"Failed to initialize any Gemini model. Last error: {last_error}\n"
                "Please check your API key and available models."
            ) from e
    
    parser = JsonOutputParser(pydantic_object=SaaSIdeaAnalysis)
    
    # Use the comprehensive prompt from prompts.py
    schema_description = """
Return ONLY valid JSON matching the comprehensive schema. 
The JSON must include all nested objects: score_breakdown, financial_projections, 
competitive_analysis, tech_stack, go_to_market, and action_plan.

Return ONLY valid JSON, no other text or markdown.
"""
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT + schema_description),
        ("human", USER_PROMPT_TEMPLATE.format(idea=idea))
    ])
    
    chain = prompt | llm | parser
    
    result_dict = chain.invoke({})
    return SaaSIdeaAnalysis(**result_dict)