import os
import re
import yaml
import argparse
from typing import List, Tuple, Dict, Any

def parse_table(content: str) -> List[Tuple[str, str]]:
    """Parse markdown table and return list of tuples with row data."""
    # Skip the table header and separator
    table_lines = content.strip().split('\n')[2:]
    rows = []
    
    for line in table_lines:
        # Skip empty rows or separator lines
        if not line.strip() or line.strip().startswith('|--'):
            continue
            
        # Extract cells, remove leading/trailing whitespace and '|' characters
        cells = [cell.strip() for cell in line.split('|')[1:-1]]
        if len(cells) == 2 and cells[0] and cells[1]:  # Only include non-empty rows
            rows.append((cells[0], cells[1]))
            
    return rows

def extract_section_content(content: str, section_name: str) -> str:
    """Extract content between markdown headers."""
    pattern = f"## {section_name}\n\n(.*?)(?=\n\n##|$)"  # Fixed regex pattern
    match = re.search(pattern, content, re.DOTALL)
    return match.group(1) if match else ""


def process_mdx_file(file_path: str) -> None:
    """Process MDX file and update its content."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        return
    except Exception as e:
        print(f"Error reading file {file_path}: {str(e)}")
        return

    # Split content into frontmatter and body
    parts = content.split('---\n', 2)
    if len(parts) < 3:
        print(f"Invalid MDX format in {file_path}")
        return

    frontmatter = parts[1]
    body = parts[2]

    # Parse the frontmatter
    try:
        front_data = yaml.safe_load(frontmatter)
    except yaml.YAMLError as e:
        print(f"Error parsing YAML frontmatter in {file_path}: {str(e)}")
        return

    # Extract and parse tables
    open_hours = parse_table(extract_section_content(body, "Open Hours"))
    business_contacts = parse_table(extract_section_content(body, "Business Contact"))

    # Convert tuples to lists to avoid !!python/tuple and add to frontmatter
    front_data['openHours'] = [list(row) for row in open_hours]
    front_data['businessContacts'] = [list(row) for row in business_contacts]

    # Remove the table sections from body using the corrected pattern
    body = re.sub(r'## Open Hours.*?(?=\n\n##|$)', '', body, flags=re.DOTALL)
    body = re.sub(r'## Business Contact.*?(?=\n\n##|$)', '', body, flags=re.DOTALL)
    body = re.sub(r'\n{3,}', '\n\n', body)  # Clean up excessive newlines

    # Reconstruct the MDX file
    new_content = (
        '---\n' +
        yaml.dump(front_data, allow_unicode=True, sort_keys=False, default_style='"', width=float("inf")) +
        '---\n' +
        body.strip() + '\n'
    )

    # Write the updated content back to the file
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    except Exception as e:
        print(f"Error writing to file {file_path}: {str(e)}")


def process_directory(directory_path: str) -> None:
    """Process all MDX files in the given directory."""
    if not os.path.exists(directory_path):
        print(f"Error: Directory not found - {directory_path}")
        return
        
    mdx_files = [f for f in os.listdir(directory_path) if f.endswith('.mdx')]
    
    if not mdx_files:
        print(f"Warning: No MDX files found in {directory_path}")
        return
        
    for filename in mdx_files:
        file_path = os.path.join(directory_path, filename)
        print(f"Processing {filename}...")
        process_mdx_file(file_path)
        print(f"Finished processing {filename}")

def main():
    parser = argparse.ArgumentParser(
        description='Process MDX files to move business hours and contact information to frontmatter.',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument(
        'directory',
        type=str,
        help='Path to the directory containing MDX files'
    )
    
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Show what would be done without making actual changes'
    )

    args = parser.parse_args()

    if not os.path.isdir(args.directory):
        parser.error(f"Error: '{args.directory}' is not a valid directory")
        
    print(f"Processing directory: {args.directory}")
    process_directory(args.directory)

if __name__ == "__main__":
    main()