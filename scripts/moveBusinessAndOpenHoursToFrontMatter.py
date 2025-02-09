import os
import re
import yaml
import argparse
from typing import List, Tuple

def parse_table(content: str) -> List[Tuple[str, str]]:
    """Parse markdown table and return list of tuples with row data."""
    table_lines = content.strip().split('\n')[2:]  # Skip header and separator
    rows = []
    
    for line in table_lines:
        if not line.strip() or line.strip().startswith('|--'):
            continue
        cells = [cell.strip() for cell in line.split('|')[1:-1]]
        if len(cells) == 2 and cells[0] and cells[1]:
            rows.append([cells[0], cells[1]])  # Use list instead of tuple
    return rows

def extract_section_content(content: str, section_name: str) -> str:
    """Extract content between markdown headers."""
    pattern = f"## {section_name}\n\n(.*?)(?=\n\n##|$)"
    match = re.search(pattern, content, re.DOTALL)
    return match.group(1) if match else ""

def process_mdx_file(file_path: str) -> None:
    """Process MDX file and update its content."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split content into frontmatter and body
    parts = content.split('---\n', 2)
    if len(parts) < 3:
        print(f"Invalid MDX format in {file_path}")
        return

    frontmatter = parts[1]
    body = parts[2]

    # Parse the frontmatter
    front_data = yaml.safe_load(frontmatter)

    # Extract and parse tables
    open_hours = parse_table(extract_section_content(body, "Open Hours"))
    business_contacts = parse_table(extract_section_content(body, "Business Contact"))

    # Add the new fields
    front_data['openHours'] = open_hours
    front_data['businessContacts'] = business_contacts

    # Remove the original table sections
    body = re.sub(r'## Open Hours.*?(?=\n\n##|$)', '', body, flags=re.DOTALL)
    body = re.sub(r'## Business Contact.*?(?=\n\n##|$)', '', body, flags=re.DOTALL)
    body = re.sub(r'\n{3,}', '\n\n', body)

    # Custom YAML dump configuration to preserve format
    class Dumper(yaml.Dumper):
        def increase_indent(self, flow=False, indentless=False):
            return super().increase_indent(flow, False)

    # Create new content
    new_content = (
        '---\n' + 
        yaml.dump(front_data, Dumper=Dumper, default_flow_style=False, allow_unicode=True, sort_keys=False) +
        '---\n' + 
        body.strip() + '\n'
    )

    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

def process_directory(directory_path: str) -> None:
    """Process all MDX files in the given directory."""
    for filename in os.listdir(directory_path):
        if filename.endswith('.mdx'):
            file_path = os.path.join(directory_path, filename)
            print(f"Processing {filename}...")
            process_mdx_file(file_path)
            print(f"Finished processing {filename}")

def main():
    parser = argparse.ArgumentParser(
        description='Process MDX files to move business hours and contact information to frontmatter.'
    )
    parser.add_argument('directory', help='Path to the directory containing MDX files')
    args = parser.parse_args()

    if not os.path.isdir(args.directory):
        parser.error(f"Error: '{args.directory}' is not a valid directory")
    
    process_directory(args.directory)

if __name__ == "__main__":
    main()