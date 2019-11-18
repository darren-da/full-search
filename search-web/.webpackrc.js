import { resolve } from 'path';

export default {
  theme: './src/theme.js',
  alias: {
    components: resolve(__dirname, 'src/components'),
    services: resolve(__dirname, 'src/services'),
    assets: resolve(__dirname, 'src/assets'),
  },
  "proxy": {
    "/**/api/**": {
      "target": "http://localhost:8080/",
      "changeOrigin": true
    }
  }
};