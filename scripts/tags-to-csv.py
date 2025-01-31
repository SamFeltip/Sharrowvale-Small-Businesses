import os
import csv
import yaml
from pathlib import Path

def extract_frontmatter(markdown_content):
    """Extract YAML frontmatter from markdown content."""
    if markdown_content.startswith('---'):
        parts = markdown_content[3:].split('---', 1)
        if len(parts) >= 2:
            try:
                return yaml.safe_load(parts[0])
            except yaml.YAMLError:
                return None
    return None

def process_markdown_files(directory, output_path):
    """Process all markdown files in the directory and create CSV."""
    data = []
    
    # Get all markdown files
    markdown_files = Path(directory).glob('*.md')
    
    for file_path in markdown_files:
        # Read markdown content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract frontmatter
        frontmatter = extract_frontmatter(content)
        if frontmatter and 'name' in frontmatter:
            # Get slug from filename (remove .md extension)
            slug = file_path.stem
            data.append({
                'Name': frontmatter['name'],
                'slug': slug
            })
    
    # Write to CSV
    if data:
        with open(output_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['Name', 'slug'])
            writer.writeheader()
            writer.writerows(data)

if __name__ == '__main__':
    import sys
    if len(sys.argv) != 3:
        print("Usage: python script.py <directory_path> <output_csv_path>")
        sys.exit(1)
    
    directory = sys.argv[1]
    output_path = sys.argv[2]
    process_markdown_files(directory, output_path)