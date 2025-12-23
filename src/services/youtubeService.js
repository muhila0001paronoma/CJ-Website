// YouTube Data API v3 Service
// You'll need to get a YouTube API key from: https://console.cloud.google.com/

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY_HERE'
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'YOUR_CHANNEL_ID_HERE'

/**
 * Fetch ALL videos from a YouTube channel using pagination
 * @param {string} channelId - YouTube Channel ID
 * @param {number} maxResults - Maximum number of videos to fetch (default: 50, set to null for all)
 * @returns {Promise<Array>} Array of video objects
 */
export const fetchChannelVideos = async (channelId = YOUTUBE_CHANNEL_ID, maxResults = null) => {
  try {
    // First, get the uploads playlist ID from the channel
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
    )
    
    if (!channelResponse.ok) {
      const errorData = await channelResponse.json()
      throw new Error(errorData.error?.message || 'Failed to fetch channel data')
    }
    
    const channelData = await channelResponse.json()
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found')
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads
    
    // Fetch all videos using pagination
    let allVideos = []
    let nextPageToken = null
    const maxPerPage = 50 // YouTube API max per request
    
    do {
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxPerPage}&key=${YOUTUBE_API_KEY}`
      
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`
      }
      
      const videosResponse = await fetch(url)
      
      if (!videosResponse.ok) {
        const errorData = await videosResponse.json()
        throw new Error(errorData.error?.message || 'Failed to fetch videos')
      }
      
      const videosData = await videosResponse.json()
      
      // Transform the data to match our video structure
      const videos = videosData.items.map((item) => {
        const snippet = item.snippet
        return {
          id: snippet.resourceId.videoId,
          youtubeId: snippet.resourceId.videoId,
          title: snippet.title,
          thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url,
          description: snippet.description,
          publishedAt: snippet.publishedAt,
          brand: extractBrandFromTitle(snippet.title),
          artist: extractArtistFromTitle(snippet.title),
          language: extractLanguageFromTitle(snippet.title),
          isYouTube: true
        }
      })
      
      allVideos = allVideos.concat(videos)
      nextPageToken = videosData.nextPageToken
      
      // Stop if we've reached the maxResults limit
      if (maxResults && allVideos.length >= maxResults) {
        allVideos = allVideos.slice(0, maxResults)
        break
      }
      
    } while (nextPageToken && (!maxResults || allVideos.length < maxResults))
    
    return allVideos
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return []
  }
}

/**
 * Extract brand from video title (e.g., "CJG", "CJ Germany")
 */
const extractBrandFromTitle = (title) => {
  if (title.includes('CJ Germany') || title.includes('CJGERMANY')) {
    return 'CJ Germany'
  } else if (title.includes('CJG')) {
    return 'CJG'
  }
  return 'CJG'
}

/**
 * Extract artist from video title (e.g., "feat. M. Kowtham")
 */
const extractArtistFromTitle = (title) => {
  const featMatch = title.match(/feat\.?\s*([^)]+)/i)
  if (featMatch) {
    return `feat. ${featMatch[1].trim()}`
  }
  return null
}

/**
 * Extract language from video title
 */
const extractLanguageFromTitle = (title) => {
  if (title.includes('Tamil')) {
    return 'Tamil'
  }
  return null
}

/**
 * Get YouTube embed URL
 */
export const getYouTubeEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
}

/**
 * Get YouTube watch URL
 */
export const getYouTubeWatchUrl = (videoId) => {
  return `https://www.youtube.com/watch?v=${videoId}`
}

