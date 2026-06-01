import json
import sys

log_path = "/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl"
with open(log_path, "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "VIEW_FILE" and "Total Lines: 741" in data.get("content", ""):
                print("FOUND IT!")
                with open("recovered_raw.txt", "w") as out:
                    out.write(data["content"])
                sys.exit(0)
        except Exception as e:
            pass

print("Not found :(")
