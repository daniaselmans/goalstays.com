
# Email Notifications for Price Drops

## Overview
Add email notifications using Resend so users receive price drop alerts even when they're not on the site. This will enhance the existing price monitoring system by sending emails alongside the in-app notifications.

## Implementation Steps

### Step 1: Add Resend API Key
First, you'll be prompted to enter your Resend API key. This will be securely stored and used by the background function to send emails.

### Step 2: Update the Price Check Function
Modify the `check-price-alerts` edge function to:
1. Import the Resend library
2. Fetch the user's email address from the authentication system when a price drop is detected
3. Send a beautifully formatted HTML email with:
   - The item name and type (hotel, flight, or car)
   - Current price vs. target price
   - A call-to-action button linking to the alerts page
   - Unsubscribe information

### Step 3: Email Template Design
Create a professional email template that includes:
- Eye-catching price drop announcement
- Item details and search parameters
- Price comparison (was vs. now)
- Direct link to view the deal
- Mobile-responsive design

## Technical Details

**Edge Function Changes:**
- Add Resend npm import: `npm:resend@2.0.0`
- Use `RESEND_API_KEY` from environment secrets
- Query `auth.users` using service role to get user email
- Send email with proper error handling and logging

**Email Sender Configuration:**
- If you have a verified domain in Resend, emails will be sent from `alerts@your-domain.com`
- For testing, Resend provides a default sender that works with unverified domains

**Graceful Fallback:**
- If email sending fails, the in-app notification is still created
- Errors are logged but don't break the price check process

## What You'll Get
- Users receive instant email alerts when prices drop below their targets
- Professional HTML emails that look great on all devices
- Both email AND in-app notifications for redundancy
- Detailed logging for troubleshooting
