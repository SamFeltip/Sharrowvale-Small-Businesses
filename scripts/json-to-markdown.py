import os
import json
import yaml
import argparse

def json_to_markdown(input_dir, output_dir):
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Iterate over all JSON files in the input directory
    for filename in os.listdir(input_dir):
        if filename.endswith('.json'):
            input_path = os.path.join(input_dir, filename)

            # Read the JSON file
            with open(input_path, 'r', encoding='utf-8') as file:
                try:
                    data = json.load(file)
                except json.JSONDecodeError as e:
                    print(f"Error reading {filename}: {e}")
                    continue

            # Convert the JSON properties to YAML frontmatter
            frontmatter = yaml.dump(data, default_flow_style=False)

            # Create the Markdown content
            markdown_content = f"---\n{frontmatter}---\n"

            # Write the Markdown file
            output_filename = f"{os.path.splitext(filename)[0]}.md"
            output_path = os.path.join(output_dir, output_filename)

            with open(output_path, 'w', encoding='utf-8') as file:
                file.write(markdown_content)

            print(f"Converted {filename} to {output_filename}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert JSON files to Markdown with frontmatter.")
    parser.add_argument("input_dir", help="Directory containing JSON files")
    parser.add_argument("output_dir", help="Directory to save Markdown files")

    args = parser.parse_args()
    json_to_markdown(args.input_dir, args.output_dir)
