# Campfire

Campfire is a verified word-of-mouth network. Users learn about products from people who actually own them.

---

## The Problem
Finding real product reviews online is difficult. Many reviews are fake, sponsored, or written for affiliate commissions. Social media threads are full of promoters. You cannot tell who actually owns the product.

## The Solution
Campfire verifies product ownership using store receipts. Users must verify their products before writing reviews. This creates a space with honest opinions from real owners. You get trustworthy advice before spending money.

---

## Core Features

### Product Verification
Upload a photo of your purchase receipt. Campfire checks the receipt details using Gemini AI. This process verifies that you actually own the hardware. You can only review products you have verified.

### Product Registry
Campfire lists popular tech hardware in categorized hubs. Anyone can browse these hubs to find specific products. This organization keeps all related discussions and reviews in one place. Use this to compare products before buying.

### Owner Conversations
Ask questions directly to verified owners on product pages. Owners share their real-world experience. This lets you get honest answers without sponsored hype. Use this to chat with owners before making a purchase.

---

## Tech Stack

The app uses these tools:
* **Next.js**: Powers the frontend web app.
* **PostgreSQL**: Stores database records.
* **Clerk**: Handles user authentication.
* **UploadThing**: Stores uploaded receipt images.
* **Gemini AI**: Extracts product names from receipts.
* **Resend**: Delivers emails.
* **PostHog**: Tracks usage data.

---

If you find a bug or have an idea, open an issue.
