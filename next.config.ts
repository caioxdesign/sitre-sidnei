import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 95 usado em components/about.tsx (foto real, gradientes suaves de
    // azul escuro — o padrão 75 do Next causava banding visível). Next
    // 16 exige declarar toda qualidade usada fora do padrão [75].
    qualities: [75, 95],
  },
};

export default nextConfig;
