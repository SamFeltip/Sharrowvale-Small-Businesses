import os
import re

content_dir = './src/content'
images_dir = './src/images'

# Regular expression to find Webflow URLs in text, allowing for various formatting
url_pattern = re.compile(r'"?(https://uploads-ssl\.webflow\.com/[A-Za-z0-9\-]+/(.+?\.jpg|.+?\.jpeg|.+?\.webp))"?')

def get_local_image_path(content_file_path, image_filename):
    # Determine the relative path from the content directory
    relative_path = os.path.relpath(content_file_path, content_dir)
    print(f"Relative path for {content_file_path}: {relative_path}")

    # Split the relative path to construct the local image path
    path_segments = os.path.dirname(relative_path).split('/', 1)
    print(f"Path segments after split: {path_segments}")

    # Remove the first segment of the path to create the correct local image path
    local_image_dir = os.path.join(images_dir, path_segments[-1], image_filename)
    print(f"Constructed local image path: {local_image_dir}")

    if os.path.exists(local_image_dir):
        print(f"Found local image for {image_filename}: {local_image_dir}")
        return local_image_dir
    else:
        print(f"Local image not found for {image_filename} at {local_image_dir}")
        return None


def replace_webflow_urls(file_path):
    print(f"Processing file: {file_path}")
    # Read the content of the file
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Search for Webflow URLs and replace them with local paths
    updated_content = content
    changes_made = False
    for match in url_pattern.finditer(content):
        webflow_url = match.group(1)
        image_filename = match.group(2)
        print(f"Found Webflow URL: {webflow_url}")
        local_image_path = get_local_image_path(file_path, image_filename)
        if local_image_path:
            # Replace the Webflow URL with the local image path
            local_image_relative = os.path.relpath(local_image_path, start=os.path.dirname(file_path))
            updated_content = updated_content.replace(webflow_url, local_image_relative)
            print(f"Replaced with local path: {local_image_relative}")
            changes_made = True
    
    # Only write back if changes were made
    if changes_made:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(f"File updated: {file_path}")
    else:
        print(f"No changes made to: {file_path}")

def process_directory(directory):
    print(f"Starting to process directory: {directory}")
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.md', '.json')):
                file_path = os.path.join(root, file)
                replace_webflow_urls(file_path)
    print("Processing complete.")

# Run the script
process_directory(content_dir)
