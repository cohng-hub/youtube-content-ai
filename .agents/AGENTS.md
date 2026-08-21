# Workspace Behavioral Rules & Customization

## Browser Subagent Usage Guardrail
- **No Automatic Browser Testing**: Do NOT invoke `browser_subagent` or open web browsers to test web UI/pages automatically during task execution.
- **CLI & Internal Verification Only**: Perform all validations internally using shell commands, script execution, or code inspection.
- **Explicit Exemption**: Only use browser interaction tools if the USER explicitly asks to preview, click, or test something in the browser.
