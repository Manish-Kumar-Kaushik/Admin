import json

path = '/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl'
count = 0
with open(path, 'r') as f:
    for line in f:
        if 'partner-detail.tsx' in line:
            print(line[:500])
            count += 1
            if count >= 5: break
