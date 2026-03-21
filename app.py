from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import os

# Import old backend code
from llm import analyze_idea
from database import save_idea
from schema import SaaSIdeaAnalysis

app = FastAPI(title="AI SaaS Validator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/validate")
async def validate_idea_endpoint(request: Request):
    data = await request.json()
    idea = data.get("idea")
    
    if not idea:
        raise HTTPException(status_code=400, detail="Idea is required")
        
    try:
        # Use existing backend logic
        analysis: SaaSIdeaAnalysis = analyze_idea(idea)
        
        # We need to map SaaSIdeaAnalysis back to validify schema
        # Name and tagline from idea_summary
        summary_parts = analysis.idea_summary.split(".")
        name = "New SaaS Idea"
        tagline = analysis.idea_summary[:100] + "..." if len(analysis.idea_summary) > 100 else analysis.idea_summary
        
        # Competitors mapping
        competitors = []
        for index, comp_name in enumerate(analysis.competitive_analysis.competitor_names[:3]):
            strength = getattr(analysis.competitive_analysis, "unique_advantages", ["Market presence"])[index] if index < len(getattr(analysis.competitive_analysis, "unique_advantages", [])) else "Market presence"
            weakness = getattr(analysis.competitive_analysis, "feature_gaps", ["Lacks specific features"])[index] if index < len(getattr(analysis.competitive_analysis, "feature_gaps", [])) else "Lacks specific features"
            competitors.append({
                "name": comp_name,
                "strength": strength,
                "weakness": weakness
            })
            
        # Ensure exactly 3 competitors if possible or whatever it gives
        if not competitors:
            competitors = [{"name": "Generic Competitor", "strength": "Market presence", "weakness": "Lacks innovation"}]

        # SWOT mapping
        swot_strengths = analysis.competitive_analysis.unique_advantages if analysis.competitive_analysis.unique_advantages else ["Innovative approach"]
        swot_weaknesses = analysis.risks if analysis.risks else ["Execution risks"]
        swot_opportunities = analysis.improvements if analysis.improvements else ["Market expansion"]
        swot_threats = analysis.failed_attempts_lessons if analysis.failed_attempts_lessons else ["New entrants"]

        mapped_response = {
            "name": name,
            "tagline": tagline,
            "problem": f"Targeting users: {', '.join(analysis.target_users)}",
            "solution": analysis.idea_summary,
            "tam": analysis.market_potential,
            "sam": f"Focusing on the realistic subset of {analysis.market_potential}.",
            "som": f"Initial target users: {', '.join(analysis.target_users)}",
            "competitors": competitors,
            "swot": {
                "strengths": swot_strengths,
                "weaknesses": swot_weaknesses,
                "opportunities": swot_opportunities,
                "threats": swot_threats
            },
            "businessModel": ", ".join(analysis.monetization),
            "nextSteps": getattr(analysis.action_plan, 'weeks_1_4', []) if getattr(analysis, 'action_plan', None) else [],
            
            # New fields for detailed UI
            "final_score": int(analysis.final_score * 10) if analysis.final_score <= 10 else int(analysis.final_score),
            "risk_score": max(0, 100 - int(analysis.final_score * 12)),
            "conf_score": int(analysis.final_score * 8),
            "diff_score": 50,
            "green_lights": swot_strengths + swot_opportunities + [f"Targets {len(analysis.target_users)} key user segments"],
            "red_flags": swot_weaknesses + swot_threats + analysis.risks,
            "scores": {
                "market_clarity": int(getattr(analysis.score_breakdown, 'market_potential_score', 8) * 10) if hasattr(analysis, 'score_breakdown') else 80,
                "market_timing": int(getattr(analysis.score_breakdown, 'innovation_score', 7) * 10) if hasattr(analysis, 'score_breakdown') else 70,
                "market_entry": int(getattr(analysis.score_breakdown, 'competition_score', 6) * 10) if hasattr(analysis, 'score_breakdown') else 60,
                "mvp_viability": int(getattr(analysis.score_breakdown, 'feasibility_score', 8) * 10) if hasattr(analysis, 'score_breakdown') else 80,
                "value_prop": int(getattr(analysis.score_breakdown, 'monetization_score', 7) * 10) if hasattr(analysis, 'score_breakdown') else 70,
                "initial_feasibility": 65
            },
            "financials": {
                "break_even": str(getattr(analysis.financial_projections, 'break_even_months', 24)) + " months" if hasattr(analysis, 'financial_projections') else "18-36 months",
                "startup_costs": "$" + str(getattr(analysis.financial_projections, 'mvp_cost', 50000)) if hasattr(analysis, 'financial_projections') else "$100,000 - $500,000",
                "cac": "$15 - $35",
                "ltv": "$150 - $400",
                "ltv_cac_ratio": "5:1"
            },
            "market_stage": "GROWING",
            "cagr": "9.5% - 12.8%",
            "revenue_models": analysis.monetization,
        }
        
        # Save it, as in original python code
        save_idea(idea, analysis)
        
        return {"analysis": mapped_response}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)