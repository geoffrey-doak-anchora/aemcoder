# La Trobe University Homepage Migration Plan

## Overview
Migrate the La Trobe University homepage (`https://www.latrobe.edu.au/`) to AEM Edge Delivery Services. This is a fresh EDS project with no existing blocks, styles, or content.

## Source Page Analysis

**URL:** `https://www.latrobe.edu.au/`

The homepage contains the following content sections and blocks:

| # | Section | Proposed Block | Description |
|---|---------|---------------|-------------|
| 1 | Header | *Navigation* | University logo, hamburger menu, search toggle |
| 2 | Hero Carousel | **hero-carousel** | Full-width image carousel with text overlay and CTA ("Our Latest Climb in Global Ranks") |
| 3 | Course Finder | **course-finder** | Search box + browse-by-discipline link grid |
| 4 | Impact Stats | **cards** | "By choosing La Trobe your impact is real" — 4 icon cards (Top 1%, Career Ready, Employer Satisfaction, World Standard) |
| 5 | Start Your Journey | **links-list** | 8 CTA links for study pathways (undergrad, postgrad, online, etc.) |
| 6 | Events & News | **columns** (2-col) | Left: "What's on at La Trobe" event listing; Right: "Breaking News" article listing |
| 7 | Contact La Trobe | **columns** (3-col) | Phone numbers for Current, International, and Future students |
| 8 | Indigenous Acknowledgement | *Default content* | Dark-background section with acknowledgement text |
| 9 | Footer | *Footer* | Logo, navigation categories, legal links, copyright |

## Project State
- **Blocks:** None (empty project)
- **Styles:** None
- **Scripts:** None (no EDS boilerplate)
- **Content:** Empty `/content` directory
- **Config:** ExCat preview config exists (`geoffrey-doak-anchora/aemcoder`)

## Migration Phases

### Phase 1: Site Analysis & Page Template Setup
- [ ] Run site analysis to create page template skeleton for the homepage URL
- [ ] Analyze the homepage to identify all content sections, block variants, and authoring decisions
- [ ] Generate analysis artifacts: screenshots, cleaned HTML, section map JSON

### Phase 2: Block Discovery & Mapping
- [ ] Survey the EDS block library for available standard blocks
- [ ] Map each detected section to an EDS block type (hero, cards, columns, etc.)
- [ ] Identify custom block variants needed (e.g., hero-carousel, course-finder, links-list)
- [ ] Check for similarity with existing library block variants
- [ ] Update `page-templates.json` with complete block mappings and DOM selectors

### Phase 3: Import Infrastructure
- [ ] Generate block parsers for each mapped block (hero-carousel, course-finder, cards, links-list, columns)
- [ ] Generate page transformers for section boundaries, metadata, and content restructuring
- [ ] Create the unified import script combining all parsers and transformers
- [ ] Bundle the import script for execution

### Phase 4: Content Import & Verification
- [ ] Execute the bundled import script against `https://www.latrobe.edu.au/`
- [ ] Verify generated HTML content in the content directory
- [ ] Preview the migrated page on the local dev server (localhost:3000)
- [ ] Visually compare the migrated output against the original page

### Phase 5: Block Implementation
- [ ] Implement JavaScript decoration for each custom block (hero-carousel, course-finder, cards, links-list)
- [ ] Write CSS for each block to match the original La Trobe design
- [ ] Set up EDS boilerplate files if missing (scripts.js, aem.js, styles)

### Phase 6: Design System & Styling
- [ ] Extract design tokens from the original page (La Trobe red `#e51931`, dark backgrounds, typography)
- [ ] Map tokens to CSS custom properties in global styles
- [ ] Apply section-level styles (dark section for Indigenous Acknowledgement, etc.)
- [ ] Validate block-level styling accuracy against original

### Phase 7: Navigation & Footer
- [ ] Set up header navigation structure from the original site
- [ ] Implement footer layout with navigation categories and legal links
- [ ] Create `nav.html` content file

### Phase 8: Final Review & QA
- [ ] Full-page visual comparison (original vs. migrated)
- [ ] Fix any rendering or styling discrepancies
- [ ] Validate responsive behavior (mobile, tablet, desktop)
- [ ] Confirm content accuracy and link integrity

## Checklist

- [ ] Site analysis complete — page template skeleton created
- [ ] Page analysis complete — sections, blocks, and variants identified
- [ ] Block mappings finalized in `page-templates.json`
- [ ] Block parsers generated for all identified blocks
- [ ] Page transformers generated for section handling
- [ ] Import script created and bundled
- [ ] Content imported and HTML files verified
- [ ] Local preview renders correctly at localhost:3000
- [ ] Block JavaScript decorations implemented
- [ ] Block CSS styling matches original design
- [ ] Design tokens extracted and mapped to CSS custom properties
- [ ] Navigation structure set up
- [ ] Footer implemented
- [ ] Full visual comparison passed
- [ ] Responsive layouts validated

## Key Design Tokens (Observed)
| Token | Value | Usage |
|-------|-------|-------|
| Primary Red | `#e51931` | CTAs, links, accents |
| Dark Background | `#1c1c1c` (approx.) | Indigenous section, footer |
| Body Font | Sans-serif (likely custom La Trobe font) | Body text |
| Heading Font | Bold condensed sans-serif | H1, H2 headings |

## Risks & Considerations
- **Hero Carousel**: Interactive carousel with pause/play — may need custom JS decoration
- **Course Finder**: Complex search + link grid — likely a custom block with no standard library match
- **Dynamic Content**: Events and news listings pull from a CMS — migrated content will be a snapshot
- **Cookie Banner**: Excluded from migration (EDS handles consent separately)

---
*Execution requires exiting Plan mode. The migration will use the `excat-site-migration` workflow.*
