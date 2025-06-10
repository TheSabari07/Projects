import ytdl from 'ytdl-core';

export const handleDownload = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const info = await ytdl.getBasicInfo(url); 

      const formats = info.formats.filter(
        (f) => f.hasAudio && f.hasVideo && f.url
      );

      const videoData = {
        platform: "youtube",
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails?.pop()?.url,
        lengthSeconds: info.videoDetails.lengthSeconds,
        formats: formats.map((format) => ({
          quality: format.qualityLabel,
          url: format.url,
          mimeType: format.mimeType,
        })),
      };

      return res.json(videoData);
    }

    return res.status(400).json({ error: "Only YouTube is supported for now" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
