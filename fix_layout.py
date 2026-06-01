import os
import glob

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix Alternative Review main wrapper
    content = content.replace(
        '<main className="w-full max-w-[1600px] mx-auto p-4 md:p-8 flex-1 flex flex-col gap-6">',
        '<main className="w-full px-4 md:px-6 py-6 flex-1 flex flex-col gap-6 overflow-x-hidden min-w-0">'
    )
    
    # Fix Alternative Detail main wrapper just in case
    content = content.replace(
        '<main className="w-full px-4 md:px-6 py-6 flex-1 flex flex-col gap-6">',
        '<main className="w-full px-4 md:px-6 py-6 flex-1 flex flex-col gap-6 overflow-x-hidden min-w-0">'
    )

    with open(filepath, 'w') as f:
        f.write(content)

for root, _, files in os.walk('src/components/dashboard/alternatives'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
