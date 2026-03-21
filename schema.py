from pydantic import BaseModel
from typing import List, Optional, Dict

class FinancialProjections(BaseModel):
    mvp_cost: float
    full_product_cost: float
    year1_revenue: float
    year3_revenue: float
    year5_revenue: float
    break_even_months: int
    funding_required: float

class CompetitiveAnalysis(BaseModel):
    competitor_names: List[str]
    competitor_pricing: Dict[str, str]  # competitor_name: pricing
    feature_gaps: List[str]  # What competitors have that idea doesn't
    unique_advantages: List[str]  # What idea has that competitors don't
    market_position: str  # e.g., "Premium", "Budget", "Niche"

class TechStackRecommendation(BaseModel):
    frontend: List[str]
    backend: List[str]
    database: List[str]
    third_party_apis: List[str]
    estimated_dev_time_months: int
    recommended_team_size: int

class GoToMarketStrategy(BaseModel):
    marketing_channels: List[str]
    target_cac: float
    launch_timeline_weeks: int
    early_adopter_segments: List[str]
    key_milestones: List[str]

class ActionPlan(BaseModel):
    weeks_1_4: List[str]
    weeks_5_8: List[str]
    weeks_9_12: List[str]
    months_4_6: List[str]
    months_7_12: List[str]

class ScoreBreakdown(BaseModel):
    market_potential_score: float
    competition_score: float
    feasibility_score: float
    monetization_score: float
    innovation_score: float

class SaaSIdeaAnalysis(BaseModel):
    idea_summary: str
    target_users: List[str]
    market_potential: str
    competitors: List[str]
    monetization: List[str]
    risks: List[str]
    improvements: List[str]
    final_score: float
    verdict: str
    score_breakdown: ScoreBreakdown
    financial_projections: FinancialProjections
    competitive_analysis: CompetitiveAnalysis
    tech_stack: TechStackRecommendation
    go_to_market: GoToMarketStrategy
    action_plan: ActionPlan
    similar_successful_products: List[str]
    failed_attempts_lessons: List[str]