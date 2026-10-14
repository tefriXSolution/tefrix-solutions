import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next's defaults plus 512: the phone hero still (251 CSS px, ~440 device
    // px on 1.75× screens) would otherwise jump to the 640px file.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default nextConfig;
