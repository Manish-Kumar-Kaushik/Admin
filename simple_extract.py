import json

path = '/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl'
lines_dict = {}

with open(path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'TOOL_RESPONSE' and data.get('content') and 'partner-detail.tsx' in data['content']:
            content = data['content']
            if "Showing lines" in content or "Total Lines:" in content:
                for l in content.split('\n'):
                    if ':' in l:
                        parts = l.split(':', 1)
                        if parts[0].isdigit():
                            lines_dict[int(parts[0])] = parts[1][1:]

        if data.get('type') == 'TOOL_CALL' and data.get('tool_calls'):
            for tc in data['tool_calls']:
                args = tc.get('args', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: continue
                if args and args.get('TargetFile', '').endswith('partner-detail.tsx'):
                    if tc['name'] == 'replace_file_content':
                        start = int(args['StartLine'])
                        rep = args['ReplacementContent'].split('\n')
                        for i, l in enumerate(rep):
                            lines_dict[start + i] = l
                    elif tc['name'] == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        if isinstance(chunks, str):
                            try: chunks = json.loads(chunks)
                            except: continue
                        for chunk in chunks:
                            start = int(chunk['StartLine'])
                            rep = chunk['ReplacementContent'].split('\n')
                            for i, l in enumerate(rep):
                                lines_dict[start + i] = l

max_line = max(lines_dict.keys()) if lines_dict else 0
print(f"Max line: {max_line}")
if max_line > 0:
    out = []
    for i in range(1, max_line + 1):
        out.append(lines_dict.get(i, f'// MISSING LINE {i}'))
    with open('src/components/dashboard/affiliate-programs/partner-detail.tsx', 'w') as f:
        f.write('\n'.join(out))
    print("Recovered!")
