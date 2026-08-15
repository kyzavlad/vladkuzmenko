# DROP — PRODUCT VALIDATION

Internal research notes. **Not published, not a business plan, not a launch document.**

Status: **concept**. Nothing is produced, sold, priced or promised. The public `/drop` page says exactly that and must keep saying it until the questions below have real answers.

Concept under research: **a performance meal system** — ready-to-eat meals organised as a weekly or daily system for people who train and want structured food without cooking or deciding every day.

## How to use this file

Every question below has to be answered with a fact, not an assumption. A question answered with "probably" is still open. The public page may only claim something once the corresponding row here holds a verified answer and the answer is safe to state publicly.

Rule: **no macros, health outcomes, delivery coverage, price, capacity, certification, shelf life or launch date appears anywhere on the site until it is verified here.**

---

## 1. Demand and customer

| # | Question | Status | Answer |
| --- | --- | --- | --- |
| 1.1 | Who exactly is the target customer (training frequency, work pattern, income, current food solution)? | Open | — |
| 1.2 | What do they do about food today, and what specifically fails? | Open | — |
| 1.3 | Would they replace that with a system, or only supplement it? | Open | — |
| 1.4 | What is the demand-validation threshold — how many qualified, specific expressions of interest from the target geography before anything is built? | Open | — |
| 1.5 | How many of those would commit to a paid pilot week when asked directly? | Open | — |
| 1.6 | What would make them stop after week one? | Open | — |

## 2. Geography and logistics

| # | Question | Status | Answer |
| --- | --- | --- | --- |
| 2.1 | Which single city or district is the pilot area? | Open | — |
| 2.2 | Delivery, pickup point, or both? | Open | — |
| 2.3 | What delivery windows are realistic, and who performs delivery? | Open | — |
| 2.4 | Cold-chain requirement from kitchen to customer — what temperature, for how long, verified how? | Open | — |
| 2.5 | What happens to a failed or missed delivery? | Open | — |

## 3. Production

| # | Question | Status | Answer |
| --- | --- | --- | --- |
| 3.1 | Which kitchen or production partner? Own, rented, or contract? | Open | — |
| 3.2 | Can they hold a consistent standard across a full week of output? | Open | — |
| 3.3 | Minimum viable pilot volume — the smallest run that is worth doing at all? | Open | — |
| 3.4 | Maximum capacity per week before quality drops? | Open | — |
| 3.5 | Lead time between order cut-off and production? | Open | — |
| 3.6 | Who is accountable for a batch that fails quality control? | Open | — |

## 4. Food safety and compliance

| # | Question | Status | Answer |
| --- | --- | --- | --- |
| 4.1 | Which food-safety regime applies in the pilot geography, and what registration does it require? | Open | — |
| 4.2 | Is HACCP or equivalent required for this production model? | Open | — |
| 4.3 | What must appear on the label by law (ingredients, allergens, nutrition, producer, dates)? | Open | — |
| 4.4 | Allergen handling: declaration, cross-contamination control, customer-facing wording? | Open | — |
| 4.5 | Who is legally the food business operator — me, the kitchen, or a company to be formed? | Open | — |
| 4.6 | What insurance is required? | Open | — |

## 5. Packaging and shelf life

| # | Question | Status | Answer |
| --- | --- | --- | --- |
| 5.1 | Packaging format, material, and whether it is reheatable and recyclable? | Open | — |
| 5.2 | Verified shelf life per meal type — measured, not estimated? | Open | — |
| 5.3 | Storage instructions the customer must follow for that shelf life to hold? | Open | — |
| 5.4 | Packaging cost per meal at pilot volume? | Open | — |

## 6. Commercial model

| # | Question | Status | Answer |
| --- | --- | --- | --- |
| 6.1 | Weekly subscription, one-off order, or both? | Open | — |
| 6.2 | Meals per order and how a customer configures a week? | Open | — |
| 6.3 | Payment model — prepaid week, per order, card on file? | Open | — |
| 6.4 | Refund and make-good policy for a late, missing or unacceptable delivery? | Open | — |
| 6.5 | Pause and cancellation rules for a subscription? | Open | — |

## 7. Unit economics

| # | Question | Status | Answer |
| --- | --- | --- | --- |
| 7.1 | Food cost per meal at pilot volume? | Open | — |
| 7.2 | Labour cost per meal? | Open | — |
| 7.3 | Packaging + delivery cost per order? | Open | — |
| 7.4 | Wastage rate assumption, and how it is measured after week one? | Open | — |
| 7.5 | Contribution margin per week at the minimum pilot volume? | Open | — |
| 7.6 | Price a real customer accepts — established by asking, not by markup? | Open | — |
| 7.7 | At what weekly volume does this stop losing money? | Open | — |

## 8. Kill criteria

Decide these **before** the pilot, not after:

| # | Condition | Decision |
| --- | --- | --- |
| 8.1 | Fewer than the 1.4 threshold of qualified interest within a defined window | Do not build |
| 8.2 | No kitchen partner able to hold standard at pilot volume | Do not build |
| 8.3 | Compliance requirements exceed what a pilot can carry | Do not build |
| 8.4 | Contribution margin negative at realistic price and volume | Do not build |
| 8.5 | Week-one repeat rate below a threshold set before launch | Stop after pilot |

## 9. What the public site may say today

Allowed:
- that this is a concept under research;
- what the concept is, described in plain language;
- who it is aimed at;
- what is being researched;
- that nothing is for sale and that price, menu, delivery area and timing are undecided;
- an invitation to join a research list.

Not allowed until verified above:
- macros, calories or any nutrition claim;
- health, performance or body-composition outcomes;
- price or discount;
- delivery area, delivery time or capacity;
- shelf life;
- certifications or compliance status;
- launch date or countdown;
- stock, inventory, "limited", or any scarcity framing;
- testimonials or customer results.

## 10. Lead capture

The `/drop` page and homepage section use the existing website lead infrastructure — `RequestDialog → submitLead() → the current n8n Website Lead Intake webhook`. No checkout, no payment, no separate database.

Frontend intent: `drop_interest`, with context `{ concept: "performance_meal_system", stage: "research", source, locale, route }`.

The n8n side was **not** modified. If these leads need their own routing, that is a separate change to the intake workflow, decided after there is enough volume to justify it.
