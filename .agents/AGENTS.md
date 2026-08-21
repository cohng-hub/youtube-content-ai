# Workspace Behavioral Rules & Customization

## Browser Subagent Usage Guardrail
- **No Automatic Browser Testing**: Do NOT invoke `browser_subagent` or open web browsers to test web UI/pages automatically during task execution.
- **CLI & Internal Verification Only**: Perform all validations internally using shell commands, script execution, or code inspection.
- **Explicit Exemption**: Only use browser interaction tools if the USER explicitly asks to preview, click, or test something in the browser.

## Video Generator Planning Principles
- **Extract & Apply Viral Strengths Only**: When generating video storyboards, scripts, descriptions, and AI video prompts for ANY input topic, reference ONLY the core strengths of top-performing viral videos (e.g., 3-second hook structure, 3D visual contrast, pacing, high CTR title formulas).
- **No Topic Leakage or Misplaced Copy**: Never copy specific text, negative flaws, or unrelated context from one analyzed video into another topic. Every generated item must be 100% tailored to the user's specific input topic.
