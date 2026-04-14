# ⚡ Sync Protocol: Control Tower

// turbo-all

This workflow synchronizes the current session's progress with the **Control-Tower** Obsidian vault.

## 🔄 Execution Steps

1. **Collect Environment State**
   - Identify completed tasks from the session `task.md`.
   - Identify recent `git` logs from the repository.

2. **Execute Sync Script**
   - Run the Python sync utility.
   - Command: `python .agents/scripts/obsidian_sync.py`

3. **Verify Manifest**
   - Verify that the daily note `00 - Pulse/Daily Notes/YYYY-MM-DD.md` has been updated.

---
*Autonomous Sync initiated by Antigravity OS.*
