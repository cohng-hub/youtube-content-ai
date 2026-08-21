# Workspace Behavioral Rules & Customization

## Browser Subagent Usage Guardrail
- **No Automatic Browser Testing**: Do NOT invoke `browser_subagent` or open web browsers to test web UI/pages automatically during task execution.
- **CLI & Internal Verification Only**: Perform all validations internally using shell commands, script execution, or code inspection.
- **Explicit Exemption**: Only use browser interaction tools if the USER explicitly asks to preview, click, or test something in the browser.

## Video Generator Planning Principles
- **Mandatory 5-Part Narrative Structure**: Every generated storyboard MUST be structured into 5 distinct narrative parts: Part 1 도입부 (Setup & Hook), Part 2 갈등 심화 (Crisis & Scale), Part 3 난제 제시 (Dilemma), Part 4 해결 시도 (Solution & Breakthrough), Part 5 결론 & 여운 (Resolution & Insight).
- **Mandatory Web Search & Real Fact Retrieval for Every Topic**: For ANY input topic entered into the video generator, perform dynamic web search / fact retrieval to fetch actual scientific facts, real mechanisms, historical dates, real numbers, and core causes for THAT specific topic. Use those real fetched facts to construct 100% genuine, topic-tailored titles, descriptions, narrations, visual descriptions, and AI video prompts. Never use generic placeholder sentences.
- **Extract & Apply Viral Strengths Only**: When generating video storyboards, scripts, descriptions, and AI video prompts for ANY input topic, reference ONLY the core strengths of top-performing viral videos (e.g., 3-second hook structure, 3D visual contrast, pacing, high CTR title formulas).
- **No Topic Leakage or Misplaced Copy**: Never copy specific text, negative flaws, or unrelated context from one analyzed video into another topic. Every generated item must be 100% tailored to the user's specific input topic.
