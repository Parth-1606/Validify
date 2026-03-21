try:
    from fpdf import FPDF
except ImportError:
    from fpdf2 import FPDF
from datetime import datetime
from schema import SaaSIdeaAnalysis

class PDFReport(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, 'SaaS Idea Analysis Report', 0, 1, 'C')
        self.ln(5)
    
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def export_to_pdf(analysis: SaaSIdeaAnalysis, idea_text: str, filename: str = None):
    """Export analysis to PDF."""
    if filename is None:
        filename = f"saas_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    
    pdf = PDFReport()
    pdf.add_page()
    
    # Title
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, 'Idea Summary', 0, 1)
    pdf.set_font('Arial', '', 10)
    pdf.multi_cell(0, 5, idea_text)
    pdf.ln(5)
    
    # Analysis
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, f'Final Score: {analysis.final_score}/10', 0, 1)
    pdf.cell(0, 10, f'Verdict: {analysis.verdict.upper()}', 0, 1)
    pdf.ln(5)
    
    # Sections
    sections = [
        ('Target Users', ', '.join(analysis.target_users)),
        ('Market Potential', analysis.market_potential),
        ('Monetization', ', '.join(analysis.monetization)),
        ('Risks', ', '.join(analysis.risks)),
        ('Improvements', ', '.join(analysis.improvements)),
    ]
    
    for title, content in sections:
        pdf.set_font('Arial', 'B', 11)
        pdf.cell(0, 8, title, 0, 1)
        pdf.set_font('Arial', '', 10)
        pdf.multi_cell(0, 5, content)
        pdf.ln(3)
    
    # Financial Projections
    pdf.add_page()
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'Financial Projections', 0, 1)
    pdf.set_font('Arial', '', 10)
    fp = analysis.financial_projections
    pdf.cell(0, 5, f'MVP Cost: ${fp.mvp_cost:,.0f}', 0, 1)
    pdf.cell(0, 5, f'Full Product Cost: ${fp.full_product_cost:,.0f}', 0, 1)
    pdf.cell(0, 5, f'Year 1 Revenue: ${fp.year1_revenue:,.0f}', 0, 1)
    pdf.cell(0, 5, f'Year 3 Revenue: ${fp.year3_revenue:,.0f}', 0, 1)
    pdf.cell(0, 5, f'Year 5 Revenue: ${fp.year5_revenue:,.0f}', 0, 1)
    pdf.cell(0, 5, f'Break Even: {fp.break_even_months} months', 0, 1)
    pdf.cell(0, 5, f'Funding Required: ${fp.funding_required:,.0f}', 0, 1)
    
    pdf.output(filename)
    return filename
