# Claude Dashboards Beta — Credit Delinquency Analytics

An interactive credit-risk analytics dashboard created as an experiment with **Claude's new Dashboards Beta**. The project explores how AI-assisted analytics can accelerate the path from a raw dataset to an interactive, business-facing dashboard while keeping the analyst responsible for KPI selection, data quality, validation, and interpretation.

## Project Goal

The goal was to explore customer payment behavior and identify patterns associated with delinquency. The dashboard is organized for quick executive review as well as deeper segmentation and risk-driver analysis.

## Dashboard Features

### Overview
- Delinquency rate
- Average missed payments over six months
- Average credit score
- Average credit utilization
- Monthly payment-status trends
- Delinquency rate by number of missed payments

### Customer Segments
- Employment status
- Card type
- Location

### Risk Drivers
- Credit score bands
- Credit utilization
- Debt-to-income ratio
- Age group

### Interactivity
- Filters for location, card type, and employment
- Overview, Segments, and Risk Drivers tabs
- Responsive layout
- Light and dark theme support

## Data Quality Work

Before analysis, inconsistent employment labels were standardized (for example, `EMP`, `employed`, and `Employed` were consolidated). Missing values in income, loan balance, and credit score are excluded only from the relevant averages so the rest of the account-level data remains available for analysis.

## AI-Assisted Workflow

This project was used to evaluate **Claude Dashboards Beta** as part of an analytics workflow. Claude accelerated dashboard development and iteration, while the analytical responsibilities remained focused on:

1. Defining the business questions
2. Selecting useful KPIs and segmentation dimensions
3. Reviewing data-quality issues
4. Validating dashboard logic and outputs
5. Interpreting patterns from a business and risk perspective

The experiment illustrates how generative AI can reduce development friction without replacing analytical judgment.

## Tech Stack

- Claude Dashboards Beta
- HTML5
- CSS3
- JavaScript
- Chart.js 4.4.1

## Run Locally

No build process is required.

1. Download or clone the repository.
2. Open `index.html` in a modern browser.

The dashboard is self-contained aside from the Chart.js library loaded from a CDN.

## Repository Structure

```text
claude-delinquency-dashboard/
├── index.html          # Interactive dashboard
├── README.md           # Project documentation
└── assets/             # Images / project assets
```

## Why I Built This

I work across data analytics, business intelligence, and AI-enabled workflows. I wanted to test how a newly released AI dashboarding experience could be used for a realistic analytics use case instead of treating AI only as a coding assistant.

The main takeaway was that dashboard generation can become much faster, but the quality of the result still depends on the analyst's ability to frame the problem, validate the data, choose meaningful metrics, and communicate what the results mean.

## Portfolio Note

This is a portfolio / learning project intended to demonstrate an AI-assisted analytics workflow and interactive dashboard development. It should not be interpreted as a production credit-risk model or as financial decisioning advice.
