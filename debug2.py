import json

path = '/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl'
with open(path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get('step_index') == 2536:
            if 'tool_calls' in data:
                print(json.dumps(data['tool_calls'], indent=2)[:2000])
                break
