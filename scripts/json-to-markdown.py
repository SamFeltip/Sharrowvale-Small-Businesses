import os
import json
import yaml
import argparse
from PIL import Image, ImageDraw, ImageFont


def create_placeholder_image(filepath, text):
    """Create a placeholder image with specified text."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    width, height = 1200, 600  # Example dimensions
    image = Image.new("RGB", (width, height), color=(200, 200, 200))
    draw = ImageDraw.Draw(image)

    # Add text to the placeholder
    try:
        # Use a default font
        font = ImageFont.load_default()
    except:
        font = None

    text_width, text_height = draw.textsize(text, font=font)
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2

    draw.text((text_x, text_y), text, fill="black", font=font)

    # Save the image
    image.save(filepath, "JPEG")


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

            # Extract the base name (without extension) for dynamic image paths
            base_name = os.path.splitext(filename)[0]
            hero_image_path = f"/content/images/category/{base_name}/{base_name}.jpg"
            banner_image_path = f"/content/images/category/{base_name}/{base_name}.jpg"
            data["heroImage"] = hero_image_path
            data["bannerImage"] = banner_image_path
            data["isPage"] = False  # Add the "isPage" property

            # Create placeholder images
            create_placeholder_image(f"./{hero_image_path.lstrip('/')}", f"Hero: {base_name}")
            create_placeholder_image(f"./{banner_image_path.lstrip('/')}", f"Banner: {base_name}")

            # Convert the JSON properties to YAML frontmatter
            frontmatter = yaml.dump(data, default_flow_style=False)

            # Create the Markdown content
            markdown_content = f"---\n{frontmatter}---\n"

            # Write the Markdown file
            output_filename = f"{base_name}.md"
            output_path = os.path.join(output_dir, output_filename)

            with open(output_path, 'w', encoding='utf-8') as file:
                file.write(markdown_content)

            print(f"Converted {filename} to {output_filename} and created images.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert JSON files to Markdown with frontmatter and images.")
    parser.add_argument("input_dir", help="Directory containing JSON files")
    parser.add_argument("output_dir", help="Directory to save Markdown files")

    args = parser.parse_args()
    json_to_markdown(args.input_dir, args.output_dir)
