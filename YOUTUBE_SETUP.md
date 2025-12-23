# YouTube Integration Setup Guide

This guide will help you integrate YouTube videos from your channel into the Music page.

## Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

## Step 2: Get Your Channel ID

You can find your YouTube Channel ID in several ways:

1. **From YouTube Studio:**
   - Go to [YouTube Studio](https://studio.youtube.com/)
   - Click on "Settings" (gear icon)
   - Go to "Channel" > "Advanced settings"
   - Your Channel ID is displayed there

2. **From Channel URL:**
   - If your channel URL is: `https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxx`
   - The Channel ID is: `UCxxxxxxxxxxxxxxxxxxxxx`

3. **From Custom URL:**
   - If you have a custom URL like `youtube.com/@YourChannelName`
   - Use a tool like [Comment Picker](https://commentpicker.com/youtube-channel-id.php) to find your Channel ID

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root of your project (same level as `package.json`)
2. Add the following:

```env
VITE_YOUTUBE_API_KEY=your_api_key_here
VITE_YOUTUBE_CHANNEL_ID=your_channel_id_here
```

**Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

## Step 4: Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## How It Works

- The app will automatically fetch videos from your YouTube channel when the page loads
- Videos are displayed in the VIDEOS section with thumbnails from YouTube
- Clicking a video opens it in a popup player using YouTube's embed player
- If YouTube API is not configured, it falls back to local video files

## Troubleshooting

- **No videos showing?** Check that your API key and Channel ID are correct
- **API quota exceeded?** YouTube API has a daily quota. You may need to wait or request a quota increase
- **CORS errors?** Make sure your API key has proper restrictions set in Google Cloud Console

