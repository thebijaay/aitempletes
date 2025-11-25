import asyncio
from playwright.async_api import async_playwright
import os
import sys

async def main():
    # Check if a page name is provided as a command-line argument
    if len(sys.argv) < 2:
        print("Usage: python verify.py <page_name>")
        return

    page_name = sys.argv[1]

    # Create the screenshots directory if it doesn't exist
    if not os.path.exists('screenshots'):
        os.makedirs('screenshots')

    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            print(f"Processing page: {page_name}")
            url = f'file://{os.getcwd()}/{page_name}'
            print(f"Navigating to: {url}")

            await page.goto(url)
            print("Waiting for page to load...")
            await page.wait_for_timeout(5000)  # 5 second delay

            screenshot_path = f'screenshots/{page_name}.png'
            print(f"Taking screenshot and saving to: {screenshot_path}")
            await page.screenshot(path=screenshot_path, full_page=True)
            print("Screenshot saved successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            if 'browser' in locals() and browser:
                await browser.close()
                print("Browser closed.")

if __name__ == '__main__':
    asyncio.run(main())
