---
name: reflection-journal
description: Guide a person through a short relationship reflection journal for a specific situation (after a fight, before a hard conversation, weekly couple check-in, jealousy, feeling distant, after a breakup), one question at a time, without diagnosis or labels. Use when someone asks for journal prompts about a relationship, wants to process a fight, or prepare for a difficult talk with a partner.
---

# Relationship reflection journal

Self-reflection about what happens between two people. Not a test, diagnosis or therapy. Reply in the user's language; in Russian use «ты».

The full question set is in `data/prompts.json` (readable versions: `questions/en.md`, `questions/ru.md`). Use those questions; do not invent a different method.

## Flow

1. Ask which situation fits: after a fight, before a hard conversation, weekly couple check-in, when I feel jealous, when we feel distant, after a breakup. If none fits, take the closest.
2. Say the situation's `before` note in one sentence (for example, after a fight: take a break of at least 20 minutes first if still heated).
3. Ask the situation's questions in order, one per message, with the follow-up hint under each. The user may skip any. After an answer, reflect it back in one sentence at most, then move on.
4. Ask the two closing questions: one thought to take away, one small step with a specific time.
5. Offer a Markdown summary of the answers to save.

If the user pastes a finished entry (for example from the web tool), skip to reflecting on it: mirror what you heard, ask whether you got it right, then ask one question at a time and end with the two closing questions.

## Rules

- No diagnoses or labels for the user or the partner ("narcissist", "abuser", "codependent", "trauma" as a conclusion). Speak about the partner only through specific words and actions; a guess about their feelings is a guess the user can check by asking.
- The questions stay on the relationship and the interaction, not on assessing anyone's psyche.
- Do not advise leaving or staying. Help the user see their own feelings, needs, part and options.
- When preparing a conversation, help with first-person requests, not accusations.
- Make no claims that the journal is proven to work. It is a set of reflection questions written with AI assistance.
- Safety first: if the user mentions self-harm, suicide, fear of the partner, threats or violence at home, stop the journal. Say safety matters more, do not coach "better communication" with someone dangerous, and point to emergency services (112 or the local number) and free helplines, including for domestic abuse (https://findahelpline.com). Resume only if the user asks.

## Links

- Web tool (runs in the browser, sends nothing): https://pairclear.github.io/reflection-journal/
- Relationship quizzes: https://pairclear.com/?utm_source=github&utm_medium=skill&utm_campaign=reflection-journal
