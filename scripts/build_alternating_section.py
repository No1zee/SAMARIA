# Script to generate the clean alternating What We Do section
from bs4 import BeautifulSoup
import re

ALTERNATING_CSS = """
<style>
/* ============================================================================
 * SAMARIA ALTERNATING EDITORIAL SHOWCASE
 * Clean Left/Right Alternating Project Presentation
 * ============================================================================ */
.samaria-alternating-stream {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.samaria-project-row {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;
  padding: 80px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
}

.samaria-project-row.is-reversed {
  grid-template-columns: 0.85fr 1.15fr;
}

.samaria-project-row.is-reversed .samaria-project-media {
  order: 2;
}

.samaria-project-row.is-reversed .samaria-project-info {
  order: 1;
}

.samaria-project-media {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: #EBEBEB;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  aspect-ratio: 16 / 10;
  width: 100%;
}

.samaria-project-media video,
.samaria-project-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.samaria-project-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8px;
}

.samaria-project-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.samaria-project-order {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
}

.samaria-project-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.65);
}

.samaria-project-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(32px, 3.2vw, 44px);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.15;
  color: #0F0F11;
  text-transform: capitalize;
  margin-bottom: 18px;
}

.samaria-project-desc {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(15, 15, 17, 0.72);
  margin-bottom: 28px;
  max-width: 440px;
}

.samaria-project-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0F0F11;
  text-decoration: none;
  font-weight: 600;
  padding-bottom: 4px;
  border-bottom: 1px solid #0F0F11;
  align-self: flex-start;
  transition: opacity 0.2s;
}

.samaria-project-link:hover {
  opacity: 0.55;
}

@media screen and (max-width: 991px) {
  .samaria-project-row,
  .samaria-project-row.is-reversed {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 60px 0;
  }
  .samaria-project-row.is-reversed .samaria-project-media {
    order: 1;
  }
  .samaria-project-row.is-reversed .samaria-project-info {
    order: 2;
  }
}
</style>
"""

# Let's inspect where to insert the CSS and verify
print("ALTERNATING_CSS ready, length:", len(ALTERNATING_CSS))
