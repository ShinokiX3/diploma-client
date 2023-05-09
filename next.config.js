/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const path = require('path')
    
module.exports = {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "main.scss";`
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "gw.alipayobjects.com",
        },
      ],
    },
}

// https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png

module.exports = nextConfig
