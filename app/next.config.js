/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'localhost', 
          "m.media-amazon.com",
          "commons.wikimedia.org", "upload.wikimedia.org", "encrypted-tbn0.gstatic.com"]
      }
}

module.exports = nextConfig
