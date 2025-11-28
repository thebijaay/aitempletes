import sys
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    filename = sys.argv[1]
    page.goto(f"file:///app/{filename}")
    page.screenshot(path="screenshots/screenshot.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
