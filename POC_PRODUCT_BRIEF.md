# Pavel Fitness POC: Product and Technical Context

**Document role:** Authoritative project context and implementation handoff  
**Status:** Pre-implementation product brief  
**Last updated:** 2026-09-17  
**Prepared for:** Huzaifa Faran / Nyrix AI  
**Prospect:** Pavel Lobatskii  
**Source of truth:** Eight Instagram conversation screenshots supplied by Huzaifa  

> This document is intended to be portable across Antigravity, Codex, Claude, or another coding assistant. Any future agent should read it fully before proposing architecture, modifying scope, or writing code.

## Evidence labels used in this document

- **[Explicit]** Directly stated by Pavel or Huzaifa in the supplied conversation.
- **[Strongly implied]** A high-confidence interpretation supported by the conversation, but not directly stated.
- **[Proposed]** A product or technical recommendation introduced in this brief.
- **[Unknown]** Not established by the conversation and still open to validation.

Do not promote an item from **Proposed**, **Strongly implied**, or **Unknown** to **Explicit** without new evidence from Pavel.

---

# 1. Executive Understanding

We are building a small but convincing proof of concept for an AI fitness companion whose marketable hook is **Future You**.

Underneath the hook, the product is a persistent, adaptive AI fitness coach. A person describes their body, experience, goal, and current training. The system creates a practical starting plan, accepts natural-language food, water, and workout logs, remembers the user's history, evaluates progress, and recommends the next action. Pavel's canonical training example is that once a user consistently completes bench press at 80 kg for 4 sets of 8, the coach can recommend trying 82.5 kg at the next appropriate session.

The differentiator is not merely a chatbot or workout generator. **Future You** represents the version of the user who has already achieved the current goal. The user's real daily behavior determines whether they move toward or away from that future identity. Pavel initially saw Future You as a feature, then agreed that it may be the product's main hook with the AI coach built around it.

The first POC must prove one coherent loop:

1. The user defines a goal and receives a personalized Future You state.
2. The user logs a meal or workout conversationally.
3. The system extracts and stores structured facts from the message.
4. The coach updates today's progress and training history.
5. Future You visibly changes and gives a specific, context-aware next action.

The POC is a conversion asset for a very warm prospect. It must optimize for speed, polish, clarity, visible intelligence, and a memorable experience. It should demonstrate the product thesis, not attempt to build the entire startup.

---

# 2. Prospect / Client Context

## Known profile

- **[Explicit from profile screenshot]** Name: Pavel Lobatskii.
- **[Explicit from profile screenshot]** Instagram positioning: “Pavel Lobatskii | Hybrid Athlete.”
- **[Explicit from profile screenshot]** Digital creator based in Mainz, Germany.
- **[Explicit from profile screenshot]** Approximately 12K Instagram followers at the time of the screenshot.
- **[Explicit from profile screenshot]** Profile language/theme includes running, boxing, lifting, and discipline.

## Relationship to the product idea

- **[Explicit]** Pavel had already been thinking about an AI fitness coach before Huzaifa asked whether he had something he wanted to build.
- **[Explicit]** He supplied a detailed concept spanning onboarding, training, nutrition, conversational tracking, memory, and progressive adjustment.
- **[Explicit]** He believes the product should support complete beginners and more experienced athletes.
- **[Explicit]** He identified manual gym notebooks and manual tracking as visible friction.
- **[Explicit]** He responded positively to Future You and later supported making it the main hook.
- **[Explicit]** He wants to see the POC before deciding the best collaboration structure.

## Commercial intent and lead quality

- **[Strongly implied]** This is a very warm prospective collaboration, not a contracted build yet.
- **[Strongly implied]** Pavel has meaningful domain familiarity and a creator audience that could support product feedback, distribution, or brand credibility.
- **[Strongly implied]** His willingness to describe detailed workflows and evaluate a working POC signals genuine interest, but commercial commitment is not yet established.
- **[Unknown]** Whether Pavel would be a client, co-founder, advisor, creator partner, distribution partner, or some combination.
- **[Unknown]** Budget, equity expectations, ownership, timeline, and commercial model.

## Technical/product sophistication visible in the conversation

- **[Explicit]** Pavel understands the desired behavior at the user-experience level: natural language input, persistent tracking, adaptation, and progression.
- **[Strongly implied]** He is thinking primarily in product and fitness terms rather than in technical architecture.
- **[Unknown]** His software development experience, access to technical resources, and familiarity with AI implementation constraints.

## Observable preferences

- Practical rather than overly complicated recommendations.
- Clear portions, calories, and macros.
- Minimal manual administration.
- A coach that remembers history and continuously adapts.
- A distinctive, marketable reason to try the product.

These are product preferences evidenced by the conversation, not personality judgments.

---

# 3. Conversation Reconstruction

## 3.1 Opening

Huzaifa approached Pavel with a founder-to-founder product invitation. He explained that he builds AI products with people who have interesting ideas and used **TeachMeBack** as evidence: a person in Massachusetts arrived with the thought “what if you learned by teaching an AI student?”, and roughly a month later the product had been built and deployed at `teachmeback.ai`.

Huzaifa then asked whether Pavel had anything he had wanted to build and offered to explore bringing it to life.

## 3.2 Pavel's original concept

Pavel said he had been thinking about an AI fitness coach that would guide someone through the entire fitness journey, especially a person starting from zero.

His example onboarding input was:

> “I'm 176 cm, 86 kg, my goal is to gain muscle, and I'm a beginner.”

The assistant would turn that into a simple and practical training and nutrition plan with clear portions, calories, and macros.

Pavel then described conversational daily logging. A user could message:

> “I had 3 eggs and some bread for breakfast.”  
> “I drank 500 ml of water.”

The system would keep track, show total intake and progress toward calorie/protein targets, and advise what to adjust.

He applied the same interaction model to training. In a gym or during outdoor calisthenics, a user could log exercises, sets, repetitions, and weights through the AI. It would remember performance and determine what should happen next.

His canonical progression example was:

> If the user completes bench press at 80 kg for 4×8 consistently, the AI could say: “Next session, try 82.5 kg.”

Pavel framed the problem through people carrying notebooks around gyms and manually tracking everything. The intended product removes that friction: the user already has a phone, tells the AI what happened, and the product handles tracking, calculations, and progression.

He specified two broad entry paths:

1. Complete beginners, for whom the AI creates the initial program.
2. More experienced athletes, who enter current numbers and goals and let the AI take over from there.

He summarized the product as an AI coach that knows the user's body, goals, nutrition, and training history, then guides the user step by step without requiring them to manage everything manually.

## 3.3 Differentiation discussion

Huzaifa asked whether comparable products already exist and noted that the category likely has considerable competition. He said the product would need a strong USP.

Huzaifa proposed **Future You**:

> The AI coach becomes the version of you that has already achieved your current goal, and daily choices determine how quickly you “reach” that version.

Pavel called this a “really cool idea” and “a really strong differentiator.”

## 3.4 Initial implementation framing

When Huzaifa asked how Pavel wanted to proceed, Pavel initially suggested:

1. Build the core AI coach.
2. Work out how Future You integrates into it.
3. Brainstorm additional distinctive features.

Huzaifa then argued that Future You could be the part people talk about and could demonstrate especially well. The complete wording of this message is partially obscured in the screenshots, so no additional wording should be treated as verbatim.

Pavel agreed with the evolved framing:

> “Maybe we should actually make the Future You the main hook and build the AI coach around it.”

He added that this could be more marketable and give people a clear reason to try the app.

## 3.5 Commitment and present status

Huzaifa committed to returning the next day with a **small working proof of concept** showing a possible direction. He shared his portfolio at `huzaifafaran.nyrix.co` to demonstrate prior AI product work.

Pavel responded positively:

> “I'm looking forward to seeing the proof of concept tomorrow.”

He explicitly deferred the collaboration structure until after seeing the POC.

Current state:

- Product ideation has advanced into a promised demonstration.
- Pavel is awaiting a working POC.
- Future You is the agreed leading hook.
- The AI coach is the functional engine around that hook.
- Collaboration terms remain open.

---

# 4. Product Vision

## Core Product Idea

An adaptive fitness coach with persistent memory, expressed through a Future You identity that makes daily progress emotionally legible.

## User Problem

Fitness planning and tracking are fragmented and labor-intensive. Beginners often do not know what to do, while experienced trainees may understand their routines but still need to log, calculate, review, and decide progression manually. Generic AI chats can provide advice, but they often do not maintain a dependable longitudinal model of the user's plan and actions.

## Target User

### Explicitly described

- Complete fitness beginners.
- More experienced athletes with current numbers and goals.
- Gym trainees and people training through calisthenics/outdoors.

### Proposed initial POC persona

One adult user whose primary goal is gaining muscle, who performs gym-based resistance training and wants help with protein/calorie adherence. This narrow persona makes the progression loop easy to demonstrate while preserving a path to other goals later.

## Desired User Outcome

The user always knows:

- what to do today;
- how today's behavior compares with the plan;
- what to adjust next;
- whether training is progressing;
- how current behavior is moving them toward their desired future identity.

## Main User Experience

The user converses naturally instead of operating a spreadsheet. The product converts messages into structured records, updates the user's state, and responds with a concise interpretation and next action. A dashboard communicates the same state visually through Future You, daily targets, recent activity, and the next recommended workout action.

## Role of AI

AI should understand ambiguous natural-language logs, summarize context, explain recommendations, and speak as the coach/Future You. It should not independently invent numerical targets or progression rules where deterministic software can calculate them more safely and consistently.

## Potential Long-Term Product Vision

- A consumer mobile fitness companion.
- Full workout planning and adaptive periodization.
- Complete nutrition planning and logging.
- Voice and photo-based logging.
- Wearable and health-platform ingestion.
- Recovery and readiness modeling.
- Creator-led programs and community challenges.
- A richer evolving Future You avatar or identity system.
- Subscription billing and cohort analytics.

All items above are **[Proposed]** possibilities, not agreed scope.

## Long-term product versus immediate POC

| Area | Long-term product | Immediate POC |
| --- | --- | --- |
| Audience | Multiple goals and experience levels | One coherent muscle-gain demo persona plus editable onboarding |
| Platforms | Mobile-first consumer product | Responsive web app |
| Coaching | Broad adaptive programming | One bounded workout progression pattern |
| Nutrition | Production-grade food database and meal planning | Natural-language meal extraction with approximate nutrition and transparent confirmation |
| Memory | Longitudinal behavior model | Persist profile, a few logs, daily totals, and one exercise history |
| Future You | Rich evolving identity/visual layer | Clear state, trajectory, and contextual message |
| Integrations | Wearables, health platforms, notifications | None required |

---

# 5. Requirements Extracted From Conversation

## Explicit Requirements

1. An AI assistant should guide a user through the fitness journey.
2. It should be especially accessible to a person starting from zero.
3. It should accept body/goal/experience data such as height, weight, goal, and beginner status.
4. It should generate a practical, uncomplicated training plan.
5. It should generate practical nutrition guidance containing portions, calories, and macros.
6. Users should be able to log food and water through ordinary messages.
7. The system should retain those events and show daily intake/progress toward calorie and protein targets.
8. It should tell the user what to adjust.
9. Users should be able to log exercises, sets, repetitions, and weights through the AI.
10. It should support gym training and calisthenics/outdoor training conceptually.
11. It should remember training history.
12. It should automatically recommend what to do next based on progress.
13. It should reduce manual tracking and calculations.
14. It should support beginners receiving an initial plan.
15. It should support experienced users entering current numbers and goals.
16. Future You should be the main hook, with the AI coach built around it.
17. The immediate deliverable should be a small working POC that demonstrates a possible direction.

## Strongly Implied Requirements

1. **Persistent user state.** “Remembers everything” and adjusts from history requires data persistence beyond a single model response.
2. **Structured records behind chat.** Reliable calorie totals and progression decisions require meal/workout messages to become structured data.
3. **A confirmation/edit path.** Food descriptions such as “some bread” are ambiguous; the system needs a way to expose interpretations rather than silently claiming precision.
4. **Mobile-friendly UX.** Pavel's phone-as-the-existing-device framing implies the main interaction must work well on a phone.
5. **Low-friction interaction.** The product loses its value if logging needs many forms or taps.
6. **Explainable recommendations.** A progression suggestion should cite relevant performance, not appear arbitrary.
7. **Recurring use.** The value emerges from daily tracking and repeated workout history rather than a one-time plan.
8. **Marketable emotional layer.** Pavel endorsed Future You specifically because it offers a reason to try the app.

## Proposed Enhancements

1. A visual “distance to Future You” or trajectory score calculated from recent adherence.
2. A short Future You message that references the user's actual new log and next best action.
3. Quick-log chips for common events while retaining free-text chat.
4. An extraction confirmation card before saving uncertain nutrition estimates.
5. A “why this recommendation?” affordance for training progression.
6. Seeded history for the demo so adaptation can be shown immediately.
7. A simple timeline combining workouts and nutrition events.
8. Confidence flags for ambiguous food quantities or exercise names.

## Unknowns

- Exact target market and initial niche.
- Whether Pavel is the face/brand of the product.
- Brand/product name.
- Preferred coaching tone.
- Whether Future You is textual, visual, avatar-based, photorealistic, or a combination.
- Exact definition of “reach” and which behaviors influence it.
- Whether the first product should be web, iOS, Android, or cross-platform mobile.
- Geographic market, units, language, and dietary conventions.
- Supported fitness goals beyond gaining muscle.
- Nutrition data source and expected accuracy.
- Training methodology, progression rules, and professional validation process.
- Handling of injuries, medical conditions, minors, eating disorders, pregnancy, or other higher-risk contexts.
- Collaboration model, commercial terms, IP ownership, and budget.

---

# 6. Core User Journey

## Stage 1: Entry / Promise

**User does:** Opens the product and sees the proposition: meet the version of yourself who has already achieved the goal.  
**System does:** Presents a short explanation and starts onboarding.  
**AI does:** Nothing yet; the opening should load instantly.  
**Data:** Anonymous session only.  
**Screen:** Future You hero, concise product promise, “Meet Future You” CTA.

## Stage 2: Fitness Onboarding

**User does:** Enters name, age range or date of birth if needed, height, weight, goal, experience level, available equipment/training setting, training frequency, dietary preference, and relevant limitations.  
**System does:** Validates required fields and normalizes units.  
**AI does:** Interprets optional free-text goals or preferences into a constrained profile schema.  
**Data:** User profile, goal, preferences, safety declarations.  
**Screen:** A short progressive form, not an interrogation.

## Stage 3: Future You Generation

**User does:** Reviews the interpreted goal.  
**System does:** Calculates preliminary targets using deterministic rules and creates a Future You profile.  
**AI does:** Produces a concise identity statement, plan explanation, and motivating but non-deceptive message.  
**Data:** Goal state, daily targets, initial program, initial Future You state.  
**Screen:** Future You card, initial plan preview, target summary.

## Stage 4: Today Dashboard

**User does:** Sees what matters now.  
**System does:** Displays today's calorie/protein/water status, workout status, recent history, and next action.  
**AI does:** Generates one brief contextual coaching message when state changes.  
**Data:** Aggregated daily totals and recommendation state.  
**Screen:** Future You at top, progress rings/bars, next task, chat composer.

## Stage 5: Conversational Nutrition Log

**User does:** Types “I had 3 eggs and some bread for breakfast.”  
**System does:** Sends the message for extraction, displays identified items and uncertainty, asks for confirmation if material values are ambiguous, then saves the log.  
**AI does:** Extracts food, quantity, meal, and qualifiers into JSON; proposes follow-up only when needed.  
**Data:** Source message, parsed items, nutrition estimates, confidence, confirmed status.  
**Screen:** Chat bubble followed by structured confirmation card and updated totals.

## Stage 6: Conversational Workout Log

**User does:** Types “Bench press 80 kg, 4 sets of 8. Completed all reps.”  
**System does:** Maps the exercise, stores sets and load, compares performance with recent sessions and the active progression rule.  
**AI does:** Extracts structured workout data and explains the deterministic recommendation.  
**Data:** Workout session, exercise result, set performance, recommendation.  
**Screen:** Workout summary card, history comparison, next-session recommendation.

## Stage 7: Future You Update

**User does:** Observes immediate consequence and receives the next best action.  
**System does:** Recalculates today's adherence/trajectory and the display state.  
**AI does:** Produces a short message grounded in actual state, such as acknowledging the logged workout and explaining the next progression.  
**Data:** Updated trajectory/adherence snapshot.  
**Screen:** Small animated state change, updated distance/trajectory, Future You message.

## Stage 8: Recurring Value

**User does:** Returns later, logs additional behavior, and asks questions.  
**System does:** Retrieves profile, today's totals, active plan, and relevant recent history.  
**AI does:** Answers within that context rather than treating each conversation as new.  
**Data:** Longitudinal events and summaries.  
**Screen:** Resumable dashboard/chat with no need to reconstruct context manually.

---

# 7. POC Objective

## Hypothesis

A fitness coach becomes substantially more compelling when persistent, useful tracking is wrapped in an emotionally resonant Future You experience that reacts to real behavior.

## Central wow moment

The user logs a workout in natural language. The product recognizes the exact sets, reps, and load, recalls the user's prior performance, recommends the next progression with a clear reason, and visibly moves the user closer to Future You. The same home screen also reflects a conversational meal log in daily nutrition totals.

## What must be real

- Natural-language extraction for at least nutrition and workout logs.
- Database persistence across refresh/session.
- Structured daily totals.
- Retrieval of recent exercise history.
- Deterministic progression logic for the demonstrated case.
- Context-grounded coach/Future You response.
- Visible Future You state update driven by actual stored activity.

## What may be mocked or seeded

- Prior workout history needed to demonstrate progression immediately.
- A limited food catalogue or nutrition lookup response.
- A bounded exercise catalogue.
- Historical adherence charts.
- A single goal/program template.
- Avatar artwork or visual states, provided the UI does not imply real body prediction.

## What may be simplified

- Authentication may be a demo user or magic-link flow.
- Only metric units may be used initially.
- Nutrition accuracy can be approximate and explicitly confirmable.
- Only one progression scheme needs to be implemented.
- The workout plan can be a small fixed template personalized in presentation.

## What should deliberately not be built yet

- Wearable integrations.
- Full periodization across many sports.
- Photorealistic body transformation prediction.
- Computer vision form analysis.
- Social network/community.
- Payments/subscriptions.
- Production notification infrastructure.
- A large autonomous multi-agent system.
- Vector database or RAG unless later evidence creates a concrete need.

---

# 8. Recommended POC Scope

## Must Have

1. Responsive web experience optimized for a phone viewport.
2. Short onboarding with body, goal, experience, and availability fields.
3. Future You reveal containing a goal summary, identity statement, and trajectory indicator.
4. Today dashboard with calorie, protein, water, and workout state.
5. Conversational log input.
6. Meal/water extraction into a structured, editable confirmation card.
7. Workout extraction into exercise, load, sets, repetitions, and completion.
8. Persistence of profile and logs.
9. Seeded prior bench-press history.
10. Deterministic recommendation from 80 kg 4×8 to 82.5 kg when eligibility conditions are met.
11. Future You state/message update after confirmed activity.
12. Clear loading, ambiguity, error, and empty states.
13. Minimal safety notice and limitation capture.

## Nice to Have

- Lightweight state animation on Future You update.
- Voice input using browser speech-to-text.
- One-tap example messages for demo reliability.
- Daily summary card.
- Simple exercise performance chart.
- Editable AI-parsed logs.
- Dark/light theme based on final visual direction.

## Explicitly Out of Scope

- Native mobile apps.
- Apple Health, Health Connect, Garmin, Oura, Strava, or wearable sync.
- Barcode/photo food recognition.
- Video exercise analysis.
- Live human coach marketplace.
- Full recipe/meal-planning engine.
- Support for every training methodology or sport.
- Medical, rehabilitation, or injury diagnosis.
- Social feed, friends, leaderboards, or public profiles.
- Billing, subscriptions, referral systems, and production analytics stack.
- Fine-tuned models.
- Multiple collaborating AI agents.

---

# 9. POC Demo Experience

## Screen 1: Landing / Meet Future You

**Objective:** Establish the differentiated promise immediately.  
**UI:** Brand placeholder, headline, one-line explanation, Future You visual, “Meet Future You” button.  
**Input:** CTA only.  
**Output:** Starts onboarding.  
**Important states:** Fast initial load; no long marketing page.  
**Transition:** To onboarding.

## Screen 2: Build Your Baseline

**Objective:** Collect only what is needed to personalize the POC.  
**UI:** Stepper or compact card flow for height, weight, goal, experience, training setting, sessions/week, and limitations.  
**Input:** Structured fields plus optional free-text goal.  
**Output:** Valid profile.  
**AI interaction:** Optional interpretation of free text after submit.  
**States:** Validation errors; explicit note that this is fitness guidance, not medical care.  
**Transition:** Loading/reveal.

## Screen 3: Future You Reveal

**Objective:** Deliver the emotional hook.  
**UI:** Future You card/visual, goal identity, initial trajectory, three priority behaviors, target summary.  
**Input:** Accept or edit.  
**Output:** Active goal and initial plan.  
**AI interaction:** Generates a short message grounded in the structured profile.  
**States:** Generation loading; safe fallback copy if model fails.  
**Transition:** Dashboard.

## Screen 4: Today With Future You

**Objective:** Make recurring value obvious.  
**UI:** Future You card, “today” targets, calorie/protein/water progress, workout status, next action, chat composer, example chips.  
**Input:** Natural-language log.  
**Output:** Parsing/confirmation flow.  
**States:** Empty day, partial progress, completed target, model unavailable.  
**Transition:** In-place card updates.

## Screen 5: Confirm Nutrition Log

**Objective:** Turn casual language into trustworthy data.  
**UI:** Parsed items, quantities, estimated calories/macros, confidence/ambiguity note, edit/confirm buttons.  
**Input:** Corrections or confirmation.  
**Output:** Saved nutrition event and recalculated totals.  
**AI interaction:** Structured extraction only; calculations happen in code.  
**States:** “Some bread” requires a default assumption or user edit; low-confidence fields highlighted.  
**Transition:** Back to updated Today screen.

## Screen 6: Log Training

**Objective:** Demonstrate memory and adaptation.  
**UI:** Chat input plus workout extraction card showing bench press, 80 kg, 4×8, all reps completed.  
**Input:** Confirm/edit.  
**Output:** Saved workout and recommendation.  
**AI interaction:** Extracts the message; explains the result after deterministic evaluation.  
**States:** Exercise not recognized; missing load; incomplete sets.  
**Transition:** Progression result.

## Screen 7: Progression Result / Wow Moment

**Objective:** Prove the coach knows the user and can decide what comes next.  
**UI:** Prior-session comparison, “Next session: try 82.5 kg,” short reason, Future You trajectory change.  
**Input:** Acknowledge or ask why.  
**Output:** Next-session prescription stored.  
**AI interaction:** Natural-language explanation grounded only in rule output and recent history.  
**States:** Maintain load, deload/recovery suggestion, or insufficient evidence as safe alternatives.  
**Transition:** Dashboard.

## Screen 8: End-of-Day Snapshot

**Objective:** Show the combined coach loop.  
**UI:** Daily totals, achieved/missed targets, workout completion, one prioritized adjustment, Future You message.  
**Input:** Optional question.  
**Output:** Summary and tomorrow's focus.  
**AI interaction:** Narrative summary based on deterministic aggregates.  
**States:** Sparse data should be acknowledged, not fabricated.  
**Transition:** Return later with persisted state.

---

# 10. AI System Design

## Capability A: Onboarding Interpreter

**Purpose:** Convert optional free-text goals/preferences into a constrained profile.  
**Input:** Structured onboarding fields plus user text.  
**Output:** Validated JSON containing goal, experience, preferences, constraints, and unresolved fields.  
**Context:** Allowed enum values and safety policy.  
**Responsibility:** Interpret, normalize, and identify ambiguity; never invent missing medical facts.  
**Model:** Low-latency LLM with reliable structured output.  
**Failure modes:** Unsupported goal, invented facts, unit confusion.  
**Guardrails:** JSON schema validation, allowed enums, deterministic unit conversion, user review.  
**Type:** LLM plus deterministic validation.

## Capability B: Nutrition Event Extractor

**Purpose:** Parse casual meal/water messages.  
**Input:** User message, locale/units, optional recent context.  
**Output example:**

```json
{
  "event_type": "nutrition",
  "meal": "breakfast",
  "items": [
    {"name": "egg", "quantity": 3, "unit": "whole", "confidence": 0.98},
    {"name": "bread", "quantity": null, "unit": "slice", "confidence": 0.42}
  ],
  "requires_confirmation": true
}
```

**Context:** Nutrition catalogue/API response only after items are normalized.  
**Responsibility:** Extract what the user said, preserve ambiguity, never claim exact nutrition for unspecified quantities.  
**Model:** Structured-output LLM.  
**Failure modes:** Misreading quantities, conflating meals, fabricated ingredients.  
**Guardrails:** Confirmation UI, raw-message retention, confidence thresholds, recalculation after edits.  
**Type:** LLM extraction + external/static nutrition data + deterministic arithmetic.

## Capability C: Workout Event Extractor

**Purpose:** Parse exercise, sets, reps, load, and completion.  
**Input:** User message and bounded exercise catalogue.  
**Output:** Workout event JSON with canonical exercise ID and unresolved fields.  
**Context:** Active workout and recent exercise aliases.  
**Responsibility:** Extraction and normalization, not progression decisions.  
**Model:** Structured-output LLM or schema-constrained parser.  
**Failure modes:** Confusing total repetitions with per-set repetitions, unit errors, exercise alias mismatch.  
**Guardrails:** User confirmation; kg/lb displayed explicitly; no invented set results.  
**Type:** LLM extraction + deterministic validation.

## Capability D: Target and Daily Total Calculator

**Purpose:** Calculate progress toward calorie, macro, and water targets.  
**Input:** Confirmed events and stored targets.  
**Output:** Numerical totals and percentages.  
**Context:** Current date/timezone and confirmed logs.  
**Failure modes:** Double counting, timezone boundary errors, unconfirmed estimates included.  
**Guardrails:** Idempotency keys, event status, clear units.  
**Type:** Deterministic application logic, not AI.

## Capability E: Training Progression Evaluator

**Purpose:** Determine the next prescription for the demonstrated exercise.  
**Input:** Program rule, latest confirmed performance, recent sessions, optional exertion/pain flags.  
**Output:** Increase, maintain, regress/deload, or insufficient-evidence state with rule facts.  
**Context:** Exercise-specific increment and required successful-session count.  
**Failure modes:** Increasing load after incomplete performance, ignoring pain, excessive jumps.  
**Guardrails:** Conservative bounded rules, pain/injury override, explicit eligibility conditions, user confirmation.  
**Type:** Deterministic recommendation engine.

## Capability F: Coach / Future You Narrator

**Purpose:** Express system state as concise, motivating, context-aware coaching.  
**Input:** Structured user profile, aggregates, rule outputs, and a narrowly selected recent history window.  
**Output:** Short response plus optional suggested action.  
**Context:** Only facts retrieved by the application.  
**Responsibility:** Explain and motivate; never overwrite calculated values or prescribe outside available evidence.  
**Model:** Low-latency LLM.  
**Failure modes:** Generic encouragement, fabricated history, unsafe certainty, verbose responses.  
**Guardrails:** Grounding contract, length limit, safety instruction, prohibited claim types, fallback templates.  
**Type:** LLM grounded in application state.

## Capability G: Future You State Engine

**Purpose:** Convert adherence into a visible product state.  
**Input:** Confirmed daily/weekly behaviors and plan priorities.  
**Output:** Trajectory score/state and reasons.  
**Context:** Selected adherence window and weights.  
**Failure modes:** False precision, punishment for one imperfect day, gamification that promotes unsafe restriction/overtraining.  
**Guardrails:** Call it trajectory/adherence, not a physiological prediction; use capped, explainable contributions and rolling trends.  
**Type:** Deterministic scoring + LLM narration.

---

# 11. Fitness Domain Logic

## Basic POC logic

### Profile and goals

- Store height, weight, goal, experience, training environment, sessions/week, units, and disclosed limitations.
- Support one primary POC goal: muscle gain.
- Present calorie/macro targets as estimates and allow edits.

### Nutrition

- Nutrition totals use confirmed items only.
- Ambiguous quantities require confirmation or a visible default.
- Water is stored separately in milliliters.
- The POC may use a small curated food map for demo items.

### Training

- Store exercise, date/time, load, unit, sets, reps per set, and completion.
- Canonical POC progression rule:
  - Active prescription: bench press 80 kg, 4×8.
  - If the configured number of qualifying recent sessions meets all target repetitions with no reported pain and acceptable effort, recommend the next configured increment, e.g. 82.5 kg.
  - Otherwise maintain the load or flag insufficient evidence.
- **[Unknown]** Pavel said “consistently,” but did not define how many successful sessions count. POC default: two qualifying sessions.

### Future You trajectory

- Calculate from confirmed behaviors, not chat sentiment.
- Example POC dimensions: workout completion, protein adherence, calorie-range adherence, and water adherence.
- Avoid treating maximum exercise or minimum calories as inherently better.
- Use rolling adherence and show contributing reasons.

## Production-grade logic required later

- Validated energy-expenditure and target-setting methodology.
- Goal-specific rate-of-change guardrails.
- Program periodization, fatigue, RPE/RIR, deloads, exercise substitutions, and plateau detection.
- Broader strength, hypertrophy, endurance, boxing, running, and calisthenics logic.
- Recovery inputs and interactions between training modalities.
- Complete nutrient database, branded foods, recipes, regional portions, and uncertainty propagation.
- Injury/contraindication screening and escalation.
- Professional review by qualified fitness/nutrition practitioners in target jurisdictions.

## Professional/medical validation flags

Any production recommendation involving pain, injury, medication, illness, pregnancy, eating disorder risk, aggressive weight change, or clinical nutrition must not be treated as ordinary coaching. The POC should decline diagnosis and direct the user toward an appropriate qualified professional.

---

# 12. Functional Architecture

## Frontend

- Responsive single-page web application.
- Onboarding, Future You reveal, Today dashboard, chat/logging, confirmation cards, and progression result.
- Optimistic UI only after the server accepts a confirmed log.

## Backend

- One application backend handling authentication/session, profile CRUD, logs, daily aggregates, recommendations, and AI orchestration.
- No microservices.
- Server-side validation for all AI outputs.

## Database

- Relational database for profiles, goals, plans, events, sessions, exercise results, and state snapshots.
- Database is the source of truth; chat text alone is not state.

## Authentication

- Recommended for POC: demo account or passwordless magic link.
- If time is extremely constrained, a fixed demo user is acceptable for the private demonstration.

## AI Layer

- A small number of schema-constrained model calls: onboarding interpretation, log extraction, and grounded narration.
- Prompt versions stored in code/config and logged with responses.

## APIs / Integrations

- LLM API.
- Optional nutrition data API or curated local demo data.
- No wearable or health-platform integration.

## Storage

- Relational records only; object storage is unnecessary unless custom media is added.

## Analytics / Logging

- Record model latency, failures, schema validation, confirmation corrections, and demo funnel steps.
- Avoid placing sensitive free-text health details in broad third-party analytics events.

## Background Jobs

- Not required for the central POC.
- Daily summary can be generated on request.

## Deployment

- One web deployment and one managed database project.
- Preview and production/demo environments may share the same code but should not share secrets.

## End-to-end flow

```text
User
  → Responsive frontend
  → Application API
  → Authentication + validation
  → AI extraction (when interpreting language)
  → Deterministic fitness/business logic
  → Relational database
  → Aggregates + grounded narration
  → Updated dashboard / Future You state
```

---

# 13. Recommended Tech Stack

## Primary recommendation

- **Next.js + TypeScript:** Fast delivery of a polished responsive UI and server endpoints in one codebase.
- **Tailwind CSS + shadcn/ui:** Rapid product-quality interface construction without inventing a design system.
- **Supabase Postgres:** Relational persistence, optional passwordless auth, Row Level Security, and quick iteration.
- **Zod:** Shared runtime schemas for forms, API contracts, and model structured outputs.
- **OpenAI structured outputs or equivalent schema-capable LLM:** Reliable extraction and controlled narration. Keep the provider behind a small adapter.
- **Vercel:** Straightforward preview/demo deployment for a Next.js POC.
- **PostHog or minimal first-party event table:** Only if funnel visibility is needed; not required for the first demo.

## Why this fits

This stack supports a single full-stack TypeScript repository, fast visual iteration, strong schema enforcement, relational history, and easy deployment. It is sufficient to evolve beyond the POC without imposing microservices or infrastructure unrelated to the demo.

## Reversibility

- Model provider should be abstracted behind interfaces for extraction and narration.
- Nutrition source should be an adapter so local demo fixtures can later be replaced by an API.
- Future You scoring weights should be configuration, not hard-coded UI logic.
- Progression rules should be stored/configured separately from narration prompts.

---

# 14. Data Model

```text
users
- id
- display_name
- email (nullable for fixed demo user)
- timezone
- preferred_units
- created_at

fitness_profiles
- id
- user_id
- height_cm
- weight_kg
- experience_level
- training_environment
- sessions_per_week
- dietary_preferences_json
- disclosed_limitations_json
- created_at
- updated_at

goals
- id
- user_id
- goal_type
- description
- status
- started_at
- target_date (nullable)

daily_targets
- id
- user_id
- effective_from
- calories_kcal
- protein_g
- carbs_g (nullable)
- fat_g (nullable)
- water_ml
- provenance

training_plans
- id
- user_id
- goal_id
- name
- status
- version
- created_at

plan_exercises
- id
- training_plan_id
- canonical_exercise_id
- session_label
- order_index
- target_sets
- target_reps
- target_load_kg (nullable)
- progression_rule_json

activity_events
- id
- user_id
- event_type (nutrition, water, workout, check_in)
- raw_message
- occurred_at
- status (draft, needs_confirmation, confirmed, rejected)
- extraction_json
- extraction_confidence
- model_metadata_json
- created_at

nutrition_items
- id
- activity_event_id
- canonical_food_id (nullable)
- display_name
- quantity
- unit
- calories_kcal
- protein_g
- carbs_g
- fat_g
- estimate_source
- confirmed_by_user

workout_sessions
- id
- user_id
- activity_event_id
- started_at
- completed_at
- source

exercise_performances
- id
- workout_session_id
- canonical_exercise_id
- load_kg
- reps_by_set_json
- target_completed
- effort_rating (nullable)
- pain_reported

recommendations
- id
- user_id
- recommendation_type
- source_entity_type
- source_entity_id
- structured_payload_json
- explanation
- status
- created_at

future_you_states
- id
- user_id
- goal_id
- trajectory_score
- state_label
- contribution_breakdown_json
- generated_message
- calculated_at
```

### Relationships

- A user has one active fitness profile and may have multiple goals over time.
- A goal may have one active training plan.
- Activity events retain the original message and own parsed nutrition/workout records.
- Recommendations reference the exact record(s) that caused them.
- Future You states are snapshots derived from confirmed events and current targets.

For an extremely compressed build, daily totals should be computed from events rather than stored separately to avoid synchronization errors.

---

# 15. AI Prompt / Agent Architecture

Do not implement a multi-agent system for the POC. Use one model provider with separate, testable prompt contracts.

## Prompt 1: Profile Interpreter

**Input** → Structured fields + optional goal text  
**Responsibility** → Normalize intent into allowed profile/goal schema and list unresolved facts  
**Output** → `ProfileInterpretation` JSON  
**Context** → Allowed enums, units, safety exclusions

## Prompt 2: Activity Classifier and Extractor

**Input** → Current user message + unit preference + bounded aliases  
**Responsibility** → Classify as nutrition, water, workout, check-in, question, or unknown; extract only observed facts  
**Output** → Discriminated union JSON by event type  
**Context** → Active plan and small exercise/food alias list, only when relevant

## Application logic between prompts

1. Validate extraction.
2. Ask for confirmation if required.
3. Persist confirmed event.
4. Calculate totals or progression deterministically.
5. Recompute Future You state.

## Prompt 3: Grounded Coach Narrator

**Input** → User intent + verified profile facts + calculated totals + recommendation facts + Future You state  
**Responsibility** → Explain the state in the chosen voice and offer one useful next action  
**Output** → Short message and optional UI action  
**Context** → Only data explicitly supplied by the application  
**Prohibition** → No new target values, invented history, diagnoses, or changes to deterministic recommendations

## Memory strategy

- Long-term memory is the relational database.
- The model receives a curated context packet, not an unbounded transcript.
- Recent raw messages may be included only when required to resolve the current interaction.
- Conversation summaries are optional later; they are not the source of truth for workout/nutrition facts.

---

# 16. External Data / Integrations

| Integration | POC status | Notes |
| --- | --- | --- |
| LLM API | **Needed for POC** | Structured extraction and grounded narration |
| Small food/nutrition data source | **Needed for POC** | Curated fixtures are acceptable for the exact demo foods |
| Exercise catalogue | **Needed for POC** | A small local catalogue is sufficient |
| Authentication provider | **Optional for POC** | Fixed demo user or Supabase magic link |
| Apple Health / Health Connect | **Future / Production** | Not required to prove the loop |
| Garmin / Oura / Fitbit / Strava | **Future / Production** | Useful for activity/recovery ingestion later |
| Barcode scanner / food photo model | **Future / Production** | Adds scope without improving the first proof |
| Voice transcription | **Nice to have** | Browser/native speech or transcription API |
| Push notifications | **Future / Production** | Useful for habit loop, unnecessary for live demo |
| Stripe | **Future / Production** | Commercial model is unresolved |
| Avatar/image generation | **Optional** | Use designed static states for POC; avoid false transformation prediction |

---

# 17. Safety, Privacy, and Fitness-Specific Risks

## Medical and injury advice

The product must not diagnose injuries or tell users to train through pain. If pain, acute symptoms, or medical conditions appear, the coach should pause the affected recommendation and advise appropriate professional input.

## Nutrition and eating-disorder risk

Avoid aggressive restriction, moral judgments about food, or punitive Future You mechanics. A single missed target should not trigger shame or encourage compensatory behavior.

## Unsafe exercise progression

Progression must be bounded by explicit rules and should not occur solely because an LLM says so. Pain, incomplete targets, and insufficient history block automatic increases.

## False precision

Casual meal descriptions are estimates. The UI should surface uncertainty and ask for confirmation instead of claiming exact calories/macros.

## Sensitive personal data

Body measurements, diet, workout history, and limitations are sensitive. Use least-privilege access, server-side authorization, encrypted transport, and avoid leaking raw health text into logs or analytics.

## Future You representation

Do not present an avatar or date as a scientifically accurate prediction of future appearance. Frame it as a motivational representation and an adherence trajectory.

## Minimal POC safeguards

- Brief non-medical guidance notice.
- Limitation/pain input during onboarding and workout logging.
- Confirmation before saving uncertain extracted data.
- Deterministic progression gate.
- Safe-response path for injury/clinical prompts.
- Delete/reset demo data control.
- No use by minors in the POC without a separately designed policy.

---

# 18. Implementation Plan

## Phase 0: Product Lock

**Build/decide:** Final POC persona, one goal, scoring semantics, progression rule, visual direction, demo script, and seeded history.  
**Dependencies:** This brief and Huzaifa's approval.  
**Output:** Frozen POC contract and acceptance criteria.  
**Done when:** Every screen and data transition in the demo can be described without introducing another major feature.

## Phase 1: UX Skeleton

**Build:** Landing, onboarding, Future You reveal, dashboard, log composer, confirmation cards, progression result.  
**Dependencies:** Phase 0.  
**Output:** Clickable responsive experience using mock data.  
**Done when:** Full demo flow works on phone and desktop without AI/backend.

## Phase 2: Core Backend

**Build:** Schema, database migrations, demo authentication/session, profile APIs, event APIs, history queries, seeded records.  
**Dependencies:** Stable data contracts from Phase 1.  
**Output:** Persistent profile and logs.  
**Done when:** Confirmed events survive refresh and are correctly scoped to the user.

## Phase 3: AI Intelligence

**Build:** Activity classifier/extractor, onboarding interpreter if retained, narrator, schema validation, retries/fallbacks.  
**Dependencies:** Event schemas and model provider credentials.  
**Output:** Tested structured-output contracts.  
**Done when:** Core demo phrases parse reliably and ambiguous phrases trigger confirmation.

## Phase 4: Fitness and Future You Logic

**Build:** Daily aggregation, progression engine, Future You trajectory calculation, explanation facts.  
**Dependencies:** Confirmed events and seeded history.  
**Output:** Deterministic state updates.  
**Done when:** The canonical 80 kg 4×8 scenario yields 82.5 kg only when configured eligibility is satisfied.

## Phase 5: End-to-End Workflow

**Build:** Connect UI, APIs, AI extraction, persistence, calculations, narration, and state updates.  
**Dependencies:** Phases 1–4.  
**Output:** Working POC.  
**Done when:** Onboarding through nutrition/workout logging and Future You update works without manual database intervention.

## Phase 6: Demo Polish

**Build:** Animation, responsive refinement, concise copy, example prompts, loading/error/retry states, deterministic fallback demo path.  
**Dependencies:** Stable workflow.  
**Output:** Prospect-ready build.  
**Done when:** A fresh user can understand the promise and complete the core flow unaided.

## Phase 7: Validation

**Build/test:** Schema tests, progression unit tests, data isolation, prompt eval cases, browser flow, slow/failing-model conditions, reset script, rehearsed demo.  
**Dependencies:** Completed POC.  
**Output:** Validation report and demo checklist.  
**Done when:** The central demo succeeds repeatedly and failures degrade gracefully.

---

# 19. Build Order

1. Lock the central demo story and canonical user data.
2. Define TypeScript/Zod contracts for profile, events, recommendations, and Future You state.
3. Create database schema and migrations from those contracts.
4. Seed the demo user, targets, active plan, and required prior bench-press sessions.
5. Build the complete UI with fixtures.
6. Implement profile and activity-event persistence.
7. Implement deterministic daily aggregation.
8. Implement the progression engine and unit tests.
9. Implement Future You scoring and tests.
10. Add structured AI classification/extraction.
11. Add the confirmation/edit flow for extracted records.
12. Add grounded coach narration.
13. Connect state changes and animations.
14. Implement empty, ambiguous, loading, timeout, and error states.
15. Add reset/reseed control for repeatable demonstrations.
16. Run prompt evals and end-to-end browser tests.
17. Deploy and rehearse the exact presentation.

Key dependency rule: do not let LLM prompts define the database model or progression behavior. Schemas and deterministic logic come first; model outputs must conform to them.

---

# 20. Technical Unknowns and Decisions

| Decision | Current state | Recommendation | Why |
| --- | --- | --- | --- |
| Main POC platform | Unknown | Responsive web app | Fastest polished demo; mobile-friendly |
| Initial goal | Example is muscle gain | Use muscle gain for POC | Best alignment with stated examples |
| Future You representation | Concept agreed, format unknown | Designed identity card + trajectory states | Demonstrates hook without false body prediction |
| Trajectory semantics | Unknown | Explainable adherence trend, not ETA/body forecast | Safer and easier to validate |
| “Consistently” threshold | Unknown | Two qualifying demo sessions, configurable | Makes Pavel's progression example demonstrable |
| Nutrition accuracy | Unknown | Curated demo foods + confirmation | Reliable enough for POC without large integration |
| AI architecture | Not discussed | One provider, separate prompt contracts | Simple and testable |
| Memory architecture | Desired behavior explicit | Relational structured memory | Required for reliable totals/history |
| Authentication | Not discussed | Fixed demo account or magic link | Avoids distracting implementation |
| Units | Pavel used cm, kg, ml | Metric for POC | Matches source examples |
| Coaching voice | Unknown | Concise, encouraging, direct | Fits product while remaining easy to change |
| Production plan generation | Broadly desired | Template + bounded personalization in POC | Prevents unsafe/unverifiable complexity |
| Collaboration model | Deferred | Discuss after demonstration | Matches Pavel's stated preference |

---

# 21. Questions for the Prospect

## Blocking

No additional question must block a small private POC if the assumptions in Section 22 are accepted internally. The immediate promise was to show a possible direction, not deliver a production specification.

If Huzaifa wants to use Pavel's likeness, image, or brand directly in the prototype, permission is blocking. Otherwise, use neutral demo artwork.

## Can Safely Assume for POC

1. Is the first showcased goal muscle gain?
2. Should the demo use metric units?
3. Can “consistently” mean two successful sessions for the demonstration?
4. Can Future You be represented by a designed state/identity card rather than a photorealistic predicted body?
5. Is a responsive web POC acceptable before discussing native mobile development?
6. Should nutrition estimates require confirmation when quantities are vague?

These should be stated as POC choices during the demo, not misrepresented as Pavel's final decisions.

## Future Product Questions

1. Who is the first narrow customer segment?
2. Which goals and training modalities launch first?
3. Is Pavel the product's public face or creator partner?
4. What should the coach sound like?
5. How should Future You look and evolve?
6. Which regions/languages/units are priorities?
7. Which wearables and health platforms matter?
8. Who validates training and nutrition methods?
9. What is the pricing and distribution model?
10. What are the collaboration, IP, budget, and ownership terms?

---

# 22. Recommended Assumptions for the POC

**Unknown:** Initial goal.  
**POC assumption:** Muscle gain.  
**Why:** Pavel's example explicitly uses gaining muscle and bench-press progression.  
**Easy to change later:** Yes.

**Unknown:** Initial user persona.  
**POC assumption:** Adult beginner-to-intermediate gym trainee.  
**Why:** It unifies plan creation, nutrition targets, and load progression in one narrative.  
**Easy to change later:** Yes.

**Unknown:** Platform.  
**POC assumption:** Responsive web application.  
**Why:** Fastest route to a shareable, phone-friendly working POC.  
**Easy to change later:** UI concepts yes; native implementation requires new work.

**Unknown:** Future You visualization.  
**POC assumption:** An aspirational but non-photorealistic identity card with 3–4 trajectory states.  
**Why:** Delivers the hook without pretending to predict future appearance.  
**Easy to change later:** Yes.

**Unknown:** Meaning of “reach Future You.”  
**POC assumption:** A rolling adherence trajectory across selected behaviors, not a guaranteed date or body outcome.  
**Why:** Explainable and safer.  
**Easy to change later:** Yes, if scoring is configurable.

**Unknown:** Successful progression threshold.  
**POC assumption:** Two consecutive qualifying sessions meeting all prescribed reps, no pain flag, then smallest configured load increment.  
**Why:** Operationalizes “consistently” for the demo.  
**Easy to change later:** Yes.

**Unknown:** Food data source.  
**POC assumption:** Curated values for demo foods with user confirmation.  
**Why:** Reduces integration risk and supports a controlled demonstration.  
**Easy to change later:** Yes, through an adapter.

**Unknown:** Authentication requirement.  
**POC assumption:** One seeded demo user; add magic link only if time permits.  
**Why:** Authentication does not validate the product thesis.  
**Easy to change later:** Yes.

**Unknown:** Full initial program generation method.  
**POC assumption:** Select a validated template and let AI personalize its explanation, not invent an unrestricted program.  
**Why:** More reliable and easier to evaluate.  
**Easy to change later:** Yes.

---

# 23. Success Criteria

## Product Success

- A first-time viewer understands Future You and the coach relationship within 30 seconds.
- The user can log food/water or a workout in ordinary language without navigating a complex form.
- The system visibly connects actions to today's status and the Future You trajectory.
- Recommendations feel specific to stored history rather than generic fitness chat.

## Technical Success

- Structured extraction passes schema validation for the canonical demo inputs.
- Confirmed logs persist and are not double-counted.
- Daily totals recompute correctly.
- The progression engine produces 82.5 kg only when configured conditions are met.
- Narration contains no values or history absent from its supplied context.
- The central flow survives refresh and has usable failure fallbacks.

## Demo Success

- The complete scripted flow can be run repeatedly in under five minutes.
- The wow moment works without manual database edits.
- The interface is polished and readable on a phone viewport.
- The presenter can reset/reseed the demo quickly.

## Prospect Validation

The strongest validation signals are Pavel saying that:

1. the POC reflects what he had in mind;
2. Future You feels like a real hook rather than decoration;
3. the natural logging and remembered progression feel useful;
4. he wants to discuss the next version and collaboration structure.

---

# 24. What We Should Show the Prospect

## Opening

Open on the Future You promise, not on technical architecture or a generic chat window.

## Main flow

1. Enter or reveal a concise user profile and goal.
2. Meet Future You and see the initial plan/trajectory.
3. Log “I had 3 eggs and some bread for breakfast.”
4. Show that the product notices “some bread” is ambiguous and lets the user confirm.
5. Update calorie/protein/water progress.
6. Log the canonical bench-press session.
7. Reveal remembered history and the 82.5 kg recommendation.
8. Show Future You respond and the trajectory change.

## AI wow moment

The wow is not that text appears from a model. The wow is that one casual message becomes a trusted record, changes the user's live state, retrieves the right history, and produces an explainable next action through Future You.

## Explain verbally

- The POC intentionally demonstrates one end-to-end loop.
- Structured memory, not a long chat transcript, powers continuity.
- Progression and totals are deterministic; AI handles language and communication.
- Ambiguous inputs are confirmed rather than treated as precise.

## Let the product communicate without narration

- The visual Future You hook.
- Frictionless logging.
- Updated daily totals.
- Remembered exercise history.
- Specific next-session recommendation.

## Mention only after the demo

- Voice/photo logging.
- Wearables.
- Broader goals and training modalities.
- Richer Future You states/avatars.
- Creator programs and distribution possibilities.

Do not dilute the demonstration with a long future-feature list before the central loop lands.

---

# 25. Current Project State

## What We Know

- Pavel is a hybrid athlete and digital creator in Mainz with an approximately 12K-follower Instagram audience at the time captured.
- He wants an AI coach that guides beginners and experienced users across training and nutrition.
- Users should be able to log meals, water, exercises, sets, reps, and loads conversationally.
- The system should remember history, calculate progress, and recommend next actions.
- Pavel sees manual fitness tracking as unnecessary friction.
- Pavel considers Future You a strong differentiator and potential main marketing hook.
- Huzaifa promised a small working POC showing a possible direction.
- Pavel is waiting to see it before discussing collaboration structure.

## What Has Been Agreed

- The product direction combines an AI coach with Future You.
- Future You should be the main hook, with the coaching capability built around it.
- A small working POC is the immediate next artifact.
- Collaboration structure will be discussed after Pavel sees the POC.

## What We Have Proposed

- A responsive web POC centered on one complete action-to-adaptation loop.
- Structured persistent memory behind conversational logging.
- Deterministic totals, progression rules, and Future You trajectory.
- AI for language extraction and grounded narration.
- A designed Future You state rather than an unsupported body-transformation prediction.
- Seeded history to make adaptation demonstrable immediately.

## What Is Still Unknown

- Final target niche, platform, branding, coaching voice, and Future You visual format.
- Production fitness/nutrition methodology and validation.
- Data sources and integrations.
- Business model, budget, IP, ownership, and collaboration form.
- Exact product timeline beyond the promised POC.

## What We Are Building First

A phone-friendly web POC in which a user meets Future You, logs nutrition and one workout conversationally, sees data persist and daily status update, receives an explainable next-session bench-press progression based on stored history, and sees that action affect the Future You trajectory.

## Immediate Next Step

Lock the POC assumptions and visual direction, then build the complete fixture-driven UX before connecting persistence, AI extraction, and deterministic fitness logic.

---

# Appendix A: Canonical Demo Data

Use the following only as **POC seed data**, not as client-provided facts:

```yaml
demo_user:
  display_name: Alex
  height_cm: 176
  weight_kg: 86
  goal: gain_muscle
  experience_level: beginner
  preferred_units: metric

example_daily_targets:
  status: placeholder_until_method_is_validated
  calories_kcal: configurable
  protein_g: configurable
  water_ml: configurable

bench_press_rule:
  current_load_kg: 80
  target_sets: 4
  target_reps_per_set: 8
  successful_sessions_required: 2
  next_increment_kg: 2.5
  block_if_pain_reported: true
```

The numbers 176 cm, 86 kg, muscle gain, 80 kg, 4×8, and 82.5 kg originate from Pavel's examples. The demo identity “Alex,” thresholds, and all target values are proposed implementation choices.

# Appendix B: Canonical Demo Inputs

```text
I had 3 eggs and some bread for breakfast.
I drank 500 ml of water.
Bench press: 80 kg, 4 sets of 8. I hit every rep.
Why are you increasing the weight next time?
```

Expected behavior:

- The first message creates a nutrition draft and flags bread quantity as ambiguous.
- The second creates a confirmed water event after lightweight confirmation.
- The third creates a workout draft, confirms it, compares it with seeded history, and triggers the configured progression rule.
- The fourth explains the rule and relevant history without inventing additional facts.

# Appendix C: Instructions for Future Coding Agents

1. Read this entire file before coding.
2. Preserve the fact/inference/proposal distinction.
3. Do not expand scope without explicit instruction from Huzaifa.
4. Treat the database as the source of truth for fitness facts.
5. Use AI for language interpretation and grounded communication, not arithmetic or unconstrained progression.
6. Make every model output schema-valid before use.
7. Keep the POC repeatable with seed/reset tooling.
8. Add or update a decision log when assumptions change.
9. Never claim the Future You state predicts a user's actual future body or outcome.
10. Do not start production integrations until the central loop has been validated with Pavel.
