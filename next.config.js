/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tabrizian.storage.iran.liara.space',
                port: '',
            }
        ]
    }
};

module.exports = nextConfig;
