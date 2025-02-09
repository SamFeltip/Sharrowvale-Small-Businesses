import os
import re
from typing import List, Tuple

def parse_table(content: str) -> List[List[str]]:
    """Parse markdown table and return list of lists with row data."""
    table_lines = content.strip().split('\n')[2:]  # Skip header and separator
    rows = []
    
    for line in table_lines:
        if not line.strip() or line.strip().startswith('|--'):
            continue
        cells = [cell.strip() for cell in line.split('|')[1:-1]]
        if len(cells) == 2 and cells[0] and cells[1]:
            rows.append([cells[0], cells[1]])
    return rows

def extract_section_content(content: str, section_name: str) -> str:
    """Extract content between markdown headers."""
    pattern = f"## {section_name}\n\n(.*?)(?=\n\n##|$)"
    match = re.search(pattern, content, re.DOTALL)
    return match.group(1) if match else ""

def format_list_entries(rows: List[List[str]]) -> str:
    """Format rows as a YAML list with explicit brackets."""
    formatted = ""
    for row in rows:
        formatted += f'- ["{row[0]}", "{row[1]}"]\n'
    return formatted

def process_mdx_file(file_path: str) -> None:
    """Process MDX file and update its content."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = content.split('---\n', 2)
    if len(parts) < 3:
        print(f"Invalid MDX format in {file_path}")
        return

    frontmatter = parts[1]
    body = parts[2]

    # Extract and parse tables
    open_hours = parse_table(extract_section_content(body, "Open Hours"))
    business_contacts = parse_table(extract_section_content(body, "Business Contact"))

    # Format the new sections
    open_hours_section = "openHours:\n" + format_list_entries(open_hours)
    business_contacts_section = "\nbusinessContacts:\n" + format_list_entries(business_contacts)

    # Add new sections to frontmatter
    frontmatter_lines = frontmatter.strip().split('\n')
    new_frontmatter = '\n'.join(frontmatter_lines) + '\n\n' + open_hours_section + business_contacts_section + '\n'

    # Remove the table sections from body
    body = re.sub(r'## Open Hours.*?(?=\n\n##|$)', '', body, flags=re.DOTALL)
    body = re.sub(r'## Business Contact.*?(?=\n\n##|$)', '', body, flags=re.DOTALL)
    body = re.sub(r'\n{3,}', '\n\n', body)

    # Reconstruct the file
    new_content = '---\n' + new_frontmatter + '---\n' + body.strip() + '\n'

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
    import argparse
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