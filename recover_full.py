import json

log_path = "/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl"
with open(log_path, "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "VIEW_FILE":
                content = data.get("content", "")
                if "score-breakdown-detail.tsx" in content and "Total Lines: 741" in content:
                    print(content[:500])
                    if "Showing lines 1 to" in content and "truncated" not in content.lower():
                        print("FOUND FULL FILE!")
                        with open("recovered_full.txt", "w") as out:
                            out.write(content)
        except:
            pass
