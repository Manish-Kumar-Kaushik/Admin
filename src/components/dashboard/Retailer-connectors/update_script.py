import re

with open('rate-limit-monitor.tsx', 'r') as f:
    content = f.read()

with open('new_data.txt', 'r') as f:
    new_data = f.read().strip()

# Replace usageData
content = re.sub(r'const usageData = \[.*?\];', new_data, content, flags=re.DOTALL)

# Replace Line Chart Colors & type
content = content.replace('type="monotone" dataKey="amazon" stroke="#3B82F6"', 'type="linear" dataKey="amazon" stroke="#2563EB"')
content = content.replace('type="monotone" dataKey="walmart" stroke="#14B8A6"', 'type="linear" dataKey="walmart" stroke="#0D9488"')
content = content.replace('type="monotone" dataKey="bestBuy" stroke="#6366F1"', 'type="linear" dataKey="bestBuy" stroke="#7C3AED"')
content = content.replace('type="monotone" dataKey="target" stroke="#F97316"', 'type="linear" dataKey="target" stroke="#F97316"')
content = content.replace('type="monotone" dataKey="ebay" stroke="#F43F5E"', 'type="linear" dataKey="ebay" stroke="#E11D48"')

# Replace Legend Colors
content = content.replace('<span className="w-3 h-1 rounded-full bg-blue-500"></span>', '<span className="w-4 h-[3px] rounded-full bg-[#2563EB]"></span>')
content = content.replace('<span className="w-3 h-1 rounded-full bg-teal-500"></span>', '<span className="w-4 h-[3px] rounded-full bg-[#0D9488]"></span>')
content = content.replace('<span className="w-3 h-1 rounded-full bg-indigo-500"></span>', '<span className="w-4 h-[3px] rounded-full bg-[#7C3AED]"></span>')
content = content.replace('<span className="w-3 h-1 rounded-full bg-orange-500"></span>', '<span className="w-4 h-[3px] rounded-full bg-[#F97316]"></span>')
content = content.replace('<span className="w-3 h-1 rounded-full bg-rose-500"></span>', '<span className="w-4 h-[3px] rounded-full bg-[#E11D48]"></span>')

# Update YAxis ticks and domain
content = content.replace('<YAxis \n                    axisLine={false} \n                    tickLine={false} \n                    tick={{ fontSize: 10, fill: \'#64748B\', fontWeight: 600 }} \n                    tickFormatter={(val) => `${val}%`}\n                  />', '<YAxis \n                    axisLine={false} \n                    tickLine={false} \n                    tick={{ fontSize: 10, fill: \'#64748B\', fontWeight: 600 }} \n                    tickFormatter={(val) => `${val}%`}\n                    ticks={[0, 25, 50, 75, 100]}\n                    domain={[0, 100]}\n                  />')

with open('rate-limit-monitor.tsx', 'w') as f:
    f.write(content)

