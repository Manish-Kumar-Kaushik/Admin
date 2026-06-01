import json

path = '/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl'
lines_dict = {}

try:
    with open(path, 'r') as f:
        for line in f:
            data = json.loads(line)
            # Check view_file responses
            if data.get('type') == 'TOOL_RESPONSE':
                content = data.get('content', '')
                if 'File Path: `file:///Users/manishkumarkaushik/Desktop/BuyWish/src/components/dashboard/affiliate-programs/partner-detail.tsx`' in content:
                    lines = content.split('\n')
                    for l in lines:
                        if ':' in l:
                            parts = l.split(':', 1)
                            if parts[0].isdigit():
                                lines_dict[int(parts[0])] = parts[1][1:] # remove leading space
            
            # Check tool calls (replace_file_content, multi_replace_file_content)
            if data.get('type') == 'TOOL_CALL' and data.get('tool_calls'):
                for tc in data['tool_calls']:
                    args = tc.get('args', {})
                    if args.get('TargetFile', '').endswith('partner-detail.tsx'):
                        if tc['name'] == 'replace_file_content':
                            start = int(args['StartLine'])
                            rep = args['ReplacementContent'].split('\n')
                            for i, l in enumerate(rep):
                                lines_dict[start + i] = l
                        elif tc['name'] == 'multi_replace_file_content':
                            chunks = args.get('ReplacementChunks', [])
                            if isinstance(chunks, str):
                                try: chunks = json.loads(chunks)
                                except: pass
                            if isinstance(chunks, list):
                                for chunk in chunks:
                                    start = int(chunk['StartLine'])
                                    rep = chunk['ReplacementContent'].split('\n')
                                    for i, l in enumerate(rep):
                                        lines_dict[start + i] = l

    # Write reconstructed file
    if lines_dict:
        max_line = max(lines_dict.keys())
        output = []
        for i in range(1, max_line + 1):
            output.append(lines_dict.get(i, f'// MISSING LINE {i}'))
        with open('src/components/dashboard/affiliate-programs/partner-detail.tsx', 'w') as out:
            out.write('\n'.join(output))
        print(f"Recovered {max_line} lines to partner-detail.tsx")
        
        # Check how many missing lines
        missing = [i for i in range(1, max_line + 1) if i not in lines_dict]
        print(f"Missing {len(missing)} lines")
    else:
        print("No lines found in transcript")
except Exception as e:
    print(e)
