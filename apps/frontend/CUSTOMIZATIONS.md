# Traveloga: AI-Assisted Development Customizations

This document describes the custom agents, instructions, and workflows that shape how AI assists with Traveloga development. These customizations ensure clarity, simplicity, and maintainability throughout the development process.

## Quick Navigation

| Customization               | Type        | Purpose                                                             | Location                                                                                                                       |
| --------------------------- | ----------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Clarify First**           | Instruction | Always ask clarifying questions before proceeding                   | [`.github/instructions/clarify-first.instructions.md`](.github/instructions/clarify-first.instructions.md)                     |
| **Spec-Driven Development** | Instruction | Guide for AI-assisted feature work with specs, plans, and execution | [`.github/instructions/spec-driven-development.instructions.md`](.github/instructions/spec-driven-development.instructions.md) |
| **Senior UI Developer**     | Agent       | React 19 expert—builds clean, simple, immutable code                | [`.github/agents/senior-ui-developer.agent.md`](.github/agents/senior-ui-developer.agent.md)                                   |
| **UI/UX Designer**          | Agent       | Design expert—prioritizes accessibility and user intuition          | [`.github/agents/ui-ux-designer.agent.md`](.github/agents/ui-ux-designer.agent.md)                                             |

---

## 1. Clarify First (Instruction)

**What it does**: Ensures AI asks clarifying questions _before_ taking action—even if there seems to be enough context.

**Auto-applies to**: All interactions (`applyTo: "**"`)

**Usage**: This runs automatically on every request. You'll see AI confirm its interpretation and ask back if anything is ambiguous.

### Example

```
You: "Fix the booking component"

AI: "I want to make sure I nail this. A few clarifications:
1. Are you referring to a specific bug, visual issue, or performance improvement?
2. Which booking component file? (BookingUI.tsx, DateOfBookingComponent.tsx, etc.)
3. What's the current problem you're seeing?
4. Any constraints I should know about?

Once I understand these, I'll have a solid plan."
```

### When AI Can Skip Confirmation

Only if you explicitly say:

- "No confirmation needed, just do it"
- "I'm unsure myself; suggest the best approach"
- "Just answer the question directly" (for factual queries)

**Ref**: [`.github/instructions/clarify-first.instructions.md`](.github/instructions/clarify-first.instructions.md)

---

## 2. Spec-Driven Development (Instruction)

**What it does**: Guides all feature work, bug fixes, chores, and refactoring through three stages: **Spec → Plan → Execute**.

**Auto-applies to**: All work (`applyTo: "**"`)

**Core approach**:

- AI writes most code; you review and guide
- Progressive complexity: base UI → logic → types → edge cases
- Always refine specs and plans as you learn
- Keep documentation clean and current

### Three-Stage Workflow

#### Stage 1: Specification (`docs/<feature>/spec.md`)

Define the problem and requirements.

**Includes**:

- Goal (1-2 sentences)
- Context (why it's needed)
- Scope (in/out)
- Usage (user stories)
- Requirements (functional + constraints)
- Acceptance criteria (how to know it's done)

#### Stage 2: Planning (`docs/<feature>/plan-v1.md`)

Break work into simple, reviewable tasks.

**Includes**:

- Overview of approach
- Why it's simple (no over-engineering)
- Task breakdown (each 30 mins - 2 hours)
- Complexity ratings (Low/Medium/High)
- Dependencies & blockers

#### Stage 3: Execution (`docs/<feature>/execution.md`)

Implement tasks with AI assistance.

**Includes**:

- Progress tracker (which tasks are done)
- Completed task notes (output, review, refinements)
- Blockers and questions
- Documentation of all changes and decisions

### Documentation Structure

```
docs/
  <feature-name>/
    spec.md              # Initial specification
    plan-v1.md           # First plan (or plan-v2.md if major changes)
    execution.md         # Progress & implementation notes
    CLEANUP.md           # (optional) Tracks removed/archived plans
```

### Refinement Protocol

**Minor changes** → Add to "Refinement Notes" in the same plan
**Major changes** → Create `plan-v2.md` (never edit old plans)
**Removed content** → Document in `CLEANUP.md` to avoid confusion

### AI Review Checklist

Before accepting generated code, verify:

- [ ] Matches the exact task description
- [ ] No state mutations (all updates immutable)
- [ ] Follows project patterns
- [ ] Uses design tokens/system correctly
- [ ] Minimal dependencies
- [ ] Readable by junior developers
- [ ] TypeScript types appropriate
- [ ] Comments explain "why", not "what"

**Ref**: [`.github/instructions/spec-driven-development.instructions.md`](.github/instructions/spec-driven-development.instructions.md)

---

## 3. Senior UI Developer (Agent)

**What it does**: Expert React developer who prioritizes simplicity, React 19 best practices, and immutable code.

**When to use**: Type `/` in chat and select **"Senior UI Developer"**, or ask for React component work.

**Specializations**:

- ✅ React 19.2 APIs (`use()`, `useEffectEvent()`, Suspense)
- ✅ Immutable state patterns (no mutations)
- ✅ Component simplicity (readable → junior devs understand in 30 seconds)
- ✅ Following project patterns and conventions
- ✅ Accessibility and semantic HTML

### React 19.2 Features This Agent Knows

1. **`use()`** — Unwrap promises cleanly with Suspense
2. **`useEffectEvent()`** — Stable callbacks that don't trigger re-renders
3. **Immutable updates** — Spread operators, `.map()`, avoid mutations
4. **Context + `use()`** — Type-safe, testable context patterns

### Example Prompts

```
/senior-ui-developer: Build a SaveDraft component that stores form state to localStorage. Start with base UI, no logic yet.

/senior-ui-developer: Review this component for immutability issues. Are we mutating state anywhere?

/senior-ui-developer: Refactor this to use React 19's use() for async data instead of useEffect + useState
```

**Ref**: [`.github/agents/senior-ui-developer.agent.md`](.github/agents/senior-ui-developer.agent.md)

---

## 4. UI/UX Designer (Agent)

**What it does**: Expert at interpreting user stories, designing intuitive layouts, and prioritizing accessibility + UX best practices.

**When to use**: Type `/` in chat and select **"UI/UX Designer"**, or ask for design work.

**Specializations**:

- ✅ User story → intuitive design translation
- ✅ Accessibility (WCAG compliance, contrast ratios, semantic HTML)
- ✅ Typography, color, spacing hierarchy
- ✅ Simplicity (removes unnecessary complexity)
- ✅ Design system awareness (detects Tailwind, shadcn/ui, etc.)

### Design Review Checklist

This agent uses a 10-point checklist:

- [ ] User story alignment
- [ ] Simplicity (nothing unnecessary?)
- [ ] Contrast (CTA pops from background?)
- [ ] Typography (readable, clear hierarchy?)
- [ ] Color identity (reflects brand?)
- [ ] Intuition (would first-time user know what to do?)
- [ ] Accessibility (WCAG AA+, semantic HTML?)
- [ ] Consistency (matches design language?)
- [ ] Responsive (mobile, tablet, desktop?)
- [ ] Feedback (do users know what happened after click?)

### Example Prompts

```
/ui-ux-designer: Design a new payment confirmation modal. User story: After booking, users need clear confirmation their payment succeeded.

/ui-ux-designer: Review the BookingUI component for accessibility. Check contrast, font sizes, and semantic structure.

/ui-ux-designer: Improve the AboutUs page for mobile. Make it simpler and more intuitive.
```

**Ref**: [`.github/agents/ui-ux-designer.agent.md`](.github/agents/ui-ux-designer.agent.md)

---

## How They Work Together

### Typical Feature Workflow

1. **You have an idea** (e.g., "Add wishlist feature")

2. **Clarify First engages** → Confirms scope, success criteria, constraints

3. **Create a Spec** → Write `docs/add-wishlist/spec.md`

   - Goal: "Let users save favorite destinations"
   - Usage: User clicks heart icon to save/unsave
   - Requirements: localStorage for now, later cloud sync

4. **Create a Plan** → Write `docs/add-wishlist/plan-v1.md`

   - Task 1: Wishlist heart button UI
   - Task 2: useState to track wishlist locally
   - Task 3: Save/load from localStorage

5. **Designer reviews** (optional)

   ```
   /ui-ux-designer: Review this plan for the Wishlist feature.
   Does the UI flow make sense? Any accessibility concerns?
   ```

6. **Execute Task 1** → Ask Senior UI Developer

   ```
   /senior-ui-developer: Implement Task 1 from docs/add-wishlist/plan-v1.md
   Create a Wishlist component with a heart button (no logic yet).
   ```

7. **Review & Document** → Update `docs/add-wishlist/execution.md`

   - Output looks good ✓
   - Uses design system correctly ✓
   - Task complete, move to next

8. **Execute Task 2, 3, ...** → Repeat the cycle

9. **Refinement if needed** → Create `plan-v2.md` if scope changes

10. **When complete** → Mark all tasks done, archive old plans in `CLEANUP.md`

---

## Key Principles

### 1. Simplicity First

- Each plan task should take 30 mins - 2 hours
- Build base UI first, add complexity gradually
- Never over-engineer; defer edge cases

### 2. Always Ask First (Clarify First)

- Even with full context, AI confirms interpretation
- Ambiguity → always ask, never assume
- Exceptions only when you explicitly say so

### 3. AI Writes, You Review

- AI generates most code
- You spend 5-10 mins reviewing each task
- Catch patterns early; correct before they spread

### 4. Documentation Hygiene

- Keep `docs/` current and clean
- Archive old plans when refining
- Use `CLEANUP.md` to avoid confusion
- Leftover data = technical debt

### 5. Progressive Complexity

1. Base UI (dumb components, no logic)
2. State & Logic (add behavior)
3. Types (strict TypeScript)
4. Edge Cases (error handling, validation)
5. Performance (optimization as needed)

---

## File Locations

```
.github/
  instructions/
    clarify-first.instructions.md           ← Always ask before acting
    spec-driven-development.instructions.md ← Guide for AI-assisted work
  agents/
    senior-ui-developer.agent.md            ← React 19 expert
    ui-ux-designer.agent.md                 ← Design & accessibility expert

docs/
  <feature-name>/
    spec.md                   ← What & why
    plan-v1.md                ← How (tasks)
    execution.md              ← Progress (in-flight tasks)
    CLEANUP.md                ← Removed/archived content (optional)
```

---

## For AI: How to Navigate This System

When working on Traveloga:

1. **Every interaction**: Check [Clarify First](.github/instructions/clarify-first.instructions.md)

   - Ask clarifying questions before taking action
   - Confirm interpretation explicitly

2. **For feature work**: Reference [Spec-Driven Development](.github/instructions/spec-driven-development.instructions.md)

   - Point user to templates in that file
   - Guide spec → plan → execute workflow
   - Track progress in execution.md

3. **For React code**: Suggest the [Senior UI Developer](.github/agents/senior-ui-developer.agent.md) agent

   - For component building, refactoring, React 19 patterns
   - User can say `/senior-ui-developer` to invoke

4. **For design/UX**: Suggest the [UI/UX Designer](.github/agents/ui-ux-designer.agent.md) agent
   - For layout design, accessibility reviews, design system alignment
   - User can say `/ui-ux-designer` to invoke

---

## For Developers: Quick Reference

Working on a new feature?

1. **Read the spec** → `docs/<feature>/spec.md` (understand the goal)
2. **Check the plan** → `docs/<feature>/plan-v1.md` (see planned tasks)
3. **Review notes** → `docs/<feature>/execution.md` (track progress, blockers, refinements)
4. **See cleanup** → `docs/<feature>/CLEANUP.md` (understand what changed and why)

Adding to an existing feature?

- Ask AI to start with "[Clarify First](.github/instructions/clarify-first.instructions.md)"
- If redesigning, create `plan-v2.md` (don't edit v1)
- Document changes in `CLEANUP.md`

---

## Examples to Get Started

### Example 1: Plan a Simple Feature

```markdown
# Spec: Add User Avatar Upload

## Goal

Allow users to upload and display an avatar on their profile.

## Usage

User clicks "Change Avatar" button → file picker → confirmation → avatar displays

## Requirements

- Accept jpg/png only (< 2MB)
- Store in public/avatars/ folder
- Display on profile page and nav bar
- Fallback to default avatar if none uploaded

## Acceptance Criteria

- [ ] Upload button works
- [ ] File validation (type, size)
- [ ] Avatar persists across sessions
- [ ] Mobile-friendly upload
```

### Example 2: Execute a Task

```
You: /senior-ui-developer: Implement Task 1 from docs/avatar-upload/plan-v1.md
Create an AvatarUpload component with:
- File input (hidden)
- Upload button that opens file picker
- Selected file preview
NO logic yet, just UI. Use Tailwind classes from our design system.

Response: [AI generates AvatarUpload.tsx]

You: [Review for 5 mins]
✓ Looks good, matches our design system
✓ Semantic HTML, accessible
✓ Ready to move to Task 2
```

---

## Support & Questions

For questions about:

- **Clarify First**: See [`.github/instructions/clarify-first.instructions.md`](.github/instructions/clarify-first.instructions.md)
- **Spec-Driven workflow**: See [`.github/instructions/spec-driven-development.instructions.md`](.github/instructions/spec-driven-development.instructions.md)
- **Senior UI Developer**: See [`.github/agents/senior-ui-developer.agent.md`](.github/agents/senior-ui-developer.agent.md)
- **UI/UX Designer**: See [`.github/agents/ui-ux-designer.agent.md`](.github/agents/ui-ux-designer.agent.md)

---

## Next Steps

1. **Try the workflow**: Create a small feature with spec → plan → execute
2. **Refine as you go**: Adjust the process based on what works for your team
3. **Keep docs clean**: Archive old plans in CLEANUP.md when you're done
4. **Share with team**: This system is team-friendly—invite colleagues to contribute to specs/plans

Happy building! 🚀
