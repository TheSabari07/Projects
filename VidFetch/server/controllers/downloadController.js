import ytdl from 'ytdl-core';

export const handleDownload = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const info = await ytdl.getInfo(url);
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

      const videoData = {
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails?.pop()?.url,
        lengthSeconds: info.videoDetails.lengthSeconds,
        formats: formats.map(format => ({
          quality: format.qualityLabel,
          url: format.url,
          mimeType: format.mimeType,
        }))
      };

      return res.json({ platform: "youtube", ...videoData });
    }

    res.status(400).json({ error: "Only YouTube supported for now" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
