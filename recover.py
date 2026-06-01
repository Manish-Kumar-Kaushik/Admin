import json

path = '/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl'
try:
    with open(path, 'r') as f:
        for line in reversed(list(f)):
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE':
                content = data.get('content', '')
                if 'File Path: `file:///Users/manishkumarkaushik/Desktop/BuyWish/src/components/dashboard/affiliate-programs/partner-detail.tsx`' in content:
                    print("Found file content in view_file response")
                    lines = content.split('\n')
                    output = []
                    for l in lines:
                        if ':' in l:
                            parts = l.split(':', 1)
                            if parts[0].isdigit():
                                output.append(parts[1][1:]) # remove leading space
                    with open('recovered.tsx', 'w') as out:
                        out.write('\n'.join(output))
                    print("Recovered to recovered.tsx")
                    break
except Exception as e:
    print(e)
