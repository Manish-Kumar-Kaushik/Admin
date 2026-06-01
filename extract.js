const fs = require('fs');

try {
  const content = fs.readFileSync('/Users/manishkumarkaushik/.gemini/antigravity-ide/brain/74235b5a-9696-415c-a7ee-96e7145b58b6/.system_generated/logs/transcript.jsonl', 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (!line) continue;
    try {
      const data = JSON.parse(line);
      if (data.type === 'TOOL_CALL' && data.tool_calls) {
        for (const tc of data.tool_calls) {
          if (tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('partner-detail.tsx')) {
            console.log("Found replace call at step", data.step_index);
            if (tc.name === 'replace_file_content') {
               fs.appendFileSync('snippets.txt', `\n--- STEP ${data.step_index} replace ---\nSTART: ${tc.args.StartLine}\nEND: ${tc.args.EndLine}\nCONTENT:\n${tc.args.ReplacementContent}\n`);
            } else if (tc.name === 'multi_replace_file_content') {
               let chunks = tc.args.ReplacementChunks;
               if (typeof chunks === 'string') chunks = JSON.parse(chunks);
               for (const chunk of chunks) {
                 fs.appendFileSync('snippets.txt', `\n--- STEP ${data.step_index} multi ---\nSTART: ${chunk.StartLine}\nEND: ${chunk.EndLine}\nCONTENT:\n${chunk.ReplacementContent}\n`);
               }
            }
          }
        }
      } else if (data.type === 'TOOL_RESPONSE' && data.content && data.content.includes('partner-detail.tsx')) {
         fs.appendFileSync('snippets.txt', `\n--- VIEW FILE RESP at step ${data.step_index} ---\n${data.content}\n`);
      }
    } catch (e) {}
  }
  console.log("Done");
} catch (e) {
  console.log(e);
}
