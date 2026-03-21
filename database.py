import sqlite3
import json
from datetime import datetime
from pathlib import Path
from typing import List, Optional
from schema import SaaSIdeaAnalysis

DB_PATH = Path("ideas.db")

def init_db():
    """Initialize the database with required tables."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ideas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idea_text TEXT NOT NULL,
            analysis_json TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            idea_name TEXT
        )
    """)
    
    conn.commit()
    conn.close()

def save_idea(idea_text: str, analysis: SaaSIdeaAnalysis, idea_name: Optional[str] = None) -> int:
    """Save an idea analysis to the database."""
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    analysis_json = analysis.model_dump_json()
    
    cursor.execute("""
        INSERT INTO ideas (idea_text, analysis_json, idea_name, updated_at)
        VALUES (?, ?, ?, ?)
    """, (idea_text, analysis_json, idea_name or idea_text[:50], datetime.now()))
    
    idea_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return idea_id

def get_idea(idea_id: int) -> Optional[dict]:
    """Get an idea by ID."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM ideas WHERE id = ?", (idea_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {
            "id": row[0],
            "idea_text": row[1],
            "analysis_json": row[2],
            "created_at": row[3],
            "updated_at": row[4],
            "idea_name": row[5]
        }
    return None

def get_all_ideas() -> List[dict]:
    """Get all saved ideas."""
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM ideas ORDER BY updated_at DESC")
    rows = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": row[0],
            "idea_text": row[1],
            "analysis_json": row[2],
            "created_at": row[3],
            "updated_at": row[4],
            "idea_name": row[5]
        }
        for row in rows
    ]

def delete_idea(idea_id: int) -> bool:
    """Delete an idea by ID."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM ideas WHERE id = ?", (idea_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    
    return deleted

def update_idea(idea_id: int, analysis: SaaSIdeaAnalysis) -> bool:
    """Update an existing idea."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    analysis_json = analysis.model_dump_json()
    cursor.execute("""
        UPDATE ideas 
        SET analysis_json = ?, updated_at = ?
        WHERE id = ?
    """, (analysis_json, datetime.now(), idea_id))
    
    updated = cursor.rowcount > 0
    conn.commit()
    conn.close()
    
    return updated
