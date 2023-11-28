/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'localhost', 
          "m.media-amazon.com",
          "commons.wikimedia.org", "upload.wikimedia.org"]
      }
}

module.exports = nextConfig
