import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
from schema import SaaSIdeaAnalysis

def create_radar_chart(analysis: SaaSIdeaAnalysis):
    """Create a radar chart for score breakdown."""
    # Handle missing score_breakdown gracefully
    if not hasattr(analysis, 'score_breakdown') or analysis.score_breakdown is None:
        # Create default scores based on final_score
        default_score = analysis.final_score if hasattr(analysis, 'final_score') else 5.0
        scores = type('obj', (object,), {
            'market_potential_score': default_score,
            'competition_score': default_score,
            'feasibility_score': default_score,
            'monetization_score': default_score,
            'innovation_score': default_score
        })()
    else:
        scores = analysis.score_breakdown
    
    categories = [
        'Market Potential',
        'Low Competition',
        'Feasibility',
        'Monetization',
        'Innovation'
    ]
    
    values = [
        scores.market_potential_score,
        scores.competition_score,
        scores.feasibility_score,
        scores.monetization_score,
        scores.innovation_score
    ]
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatterpolar(
        r=values,
        theta=categories,
        fill='toself',
        name='Scores',
        line_color='rgb(32, 201, 151)'
    ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 10]
            )),
        showlegend=False,
        title="Score Breakdown Radar Chart",
        height=400
    )
    
    return fig

def create_financial_chart(analysis: SaaSIdeaAnalysis):
    """Create a financial projections chart."""
    fp = analysis.financial_projections
    
    # Currency conversion: USD to INR
    USD_TO_INR = 83.0
    
    years = ['Year 1', 'Year 3', 'Year 5']
    revenues_usd = [fp.year1_revenue, fp.year3_revenue, fp.year5_revenue]
    revenues_inr = [r * USD_TO_INR for r in revenues_usd]
    
    fig = go.Figure()
    
    fig.add_trace(go.Bar(
        x=years,
        y=revenues_inr,
        marker_color='rgb(32, 201, 151)',
        text=[f'₹{r/100000:.1f}L' if r >= 100000 else f'₹{r/1000:.0f}K' for r in revenues_inr],
        textposition='outside'
    ))
    
    fig.update_layout(
        title="Revenue Projections",
        xaxis_title="Year",
        yaxis_title="Revenue (INR)",
        height=300
    )
    
    return fig

def create_competitor_pricing_chart(analysis: SaaSIdeaAnalysis):
    """Create a competitor pricing comparison chart."""
    comp_analysis = analysis.competitive_analysis
    
    if not comp_analysis.competitor_pricing:
        return None
    
    competitors = list(comp_analysis.competitor_pricing.keys())
    # Extract numeric values from pricing strings (simplified)
    prices = []
    for price_str in comp_analysis.competitor_pricing.values():
        # Try to extract number from price string
        try:
            price = float(''.join(filter(str.isdigit, price_str.replace(',', ''))))
            prices.append(price)
        except:
            prices.append(0)
    
    fig = go.Figure()
    
    fig.add_trace(go.Bar(
        x=competitors,
        y=prices,
        marker_color='rgb(255, 107, 107)',
        text=[f'${p:.0f}' if p > 0 else 'N/A' for p in prices],
        textposition='outside'
    ))
    
    fig.update_layout(
        title="Competitor Pricing Comparison",
        xaxis_title="Competitor",
        yaxis_title="Price (USD)",
        height=300
    )
    
    return fig

def get_score_color(score: float) -> str:
    """Get color based on score."""
    if score >= 8:
        return "green"
    elif score >= 6:
        return "orange"
    else:
        return "red"
