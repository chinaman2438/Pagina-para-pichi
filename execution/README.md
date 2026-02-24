# Execution Scripts

This folder contains deterministic Python scripts — the "hands" of the agent.

## Conventions

- Each script should do **one thing well** (single responsibility)
- Load environment variables from `.env` using `python-dotenv`
- Accept inputs via command-line arguments or a config dict
- Print clear success/error messages so the agent can parse them
- Include a top-level docstring explaining what the script does

## Running Scripts

```bash
python execution/your_script.py --arg1 value1 --arg2 value2
```

## Dependencies

Install dependencies as needed:
```bash
pip install python-dotenv requests
```
