import os
import re
import requests
import argparse

# List of social media domains to ignore
SOCIAL_MEDIA_DOMAINS = [
    "facebook.com", "twitter.com", "instagram.com", "linkedin.com",
    "pinterest.com", "youtube.com", "tiktok.com", "snapchat.com"
]

def is_social_media_url(url):
    # Check if the URL contains any social media domain
    return any(domain in url for domain in SOCIAL_MEDIA_DOMAINS)

def download_image(url, save_folder):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Check if the request was successful
        content_type = response.headers.get('Content-Type')
        
        if 'image' in content_type:
            # Generate a unique save path based on the URL
            save_name = os.path.basename(url.split("?")[0])
            save_path = os.path.join(save_folder, save_name)
            
            # Save the image to the specified folder
            with open(save_path, 'wb') as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
            print(f"Downloaded image from {url} to {save_path}")
        else:
            print(f"URL does not contain an image: {url}")

    except requests.RequestException as e:
        print(f"Failed to download image from {url}: {e}")

def search_files(input_folder, output_folder):
    # Regex pattern for URLs starting with "https"
    url_pattern = re.compile(r'https://[^\s",\]]+')  # Matches URLs in strings, lists, or key-value pairs
    
    for root, _, files in os.walk(input_folder):
        for file_name in files:
            if file_name.endswith('.json') or file_name.endswith('.md'):
                file_path = os.path.join(root, file_name)
                
                with open(file_path, 'r', encoding='utf-8') as file:
                    file_folder =  file_path.replace('./', '').replace('.json', '').replace('.md', '')
                    output = os.path.join(output_folder, file_folder)

                    os.makedirs(output, exist_ok=True)


                    content = file.read()
                    
                    # Find all URLs in the file content
                    urls = url_pattern.findall(content)
                    for url in urls:
                        # Skip URLs that match social media domains
                        if is_social_media_url(url):
                            print(f"Skipped social media URL: {url}")
                            continue
                        
                        # Only download if the URL has an image file extension
                        if url.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):

                            
                            # print(f"download to: {output}")
                            download_image(url, output)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Search for image URLs in .json and .md files and download them.")
    parser.add_argument('input_folder', type=str, help="Path to the folder to search for .json and .md files")
    parser.add_argument('output_folder', type=str, help="Path to the folder where images will be saved")

    args = parser.parse_args()

    # Ensure the output folder exists
    os.makedirs(args.output_folder, exist_ok=True)

    # Run the search and download process
    search_files(args.input_folder, args.output_folder)
