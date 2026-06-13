import goIcon from "../assets/icons/go.svg"
import pythonIcon from "../assets/icons/python.svg"
import phpIcon from "../assets/icons/php.svg"
import html5Icon from "../assets/icons/html5.svg"
import cssIcon from "../assets/icons/css.svg"
import sassIcon from "../assets/icons/sass.svg"
import javascriptIcon from "../assets/icons/javascript.svg"
import typescriptIcon from "../assets/icons/typescript.svg"
import pwaIcon from "../assets/icons/pwa.svg"
import websocketIcon from "../assets/icons/websocket.svg"
import nextIcon from "../assets/icons/next.svg"
import reactIcon from "../assets/icons/react.svg"
import angularIcon from "../assets/icons/angular.svg"
import vueIcon from "../assets/icons/vue.svg"
import nodejsIcon from "../assets/icons/nodejs.svg"
import wordpressIcon from "../assets/icons/wordpress.svg"
import laravelIcon from "../assets/icons/laravel.svg"
import djangoIcon from "../assets/icons/django.svg"
import tailwindcssIcon from "../assets/icons/tailwindcss.svg"
import bootstrapIcon from "../assets/icons/bootstrap.svg"
import shopifyIcon from "../assets/icons/shopify.svg"
import woocommerceIcon from "../assets/icons/woocommerce.svg"
import paypalIcon from "../assets/icons/paypal.svg"
import mercadoPagoIcon from "../assets/icons/mercado-pago.svg"
import graphqlIcon from "../assets/icons/graphql.svg"
import postgresqlIcon from "../assets/icons/postgresql.svg"
import mongodbIcon from "../assets/icons/mongodb.svg"
import redisIcon from "../assets/icons/redis.svg"
import valkeyIcon from "../assets/icons/valkey.png"
import prismaIcon from "../assets/icons/prisma.svg"
import mysqlIcon from "../assets/icons/mysql.svg"
import sqliteIcon from "../assets/icons/sqlite.svg"
import mariadbIcon from "../assets/icons/mariadb.svg"
import awsIcon from "../assets/icons/aws.svg"
import digitaloceanIcon from "../assets/icons/digitalocean.svg"
import cloudflareIcon from "../assets/icons/cloudflare.svg"
import dockerIcon from "../assets/icons/docker.svg"
import gitIcon from "../assets/icons/git.svg"
import bashIcon from "../assets/icons/bash.svg"
import linuxIcon from "../assets/icons/linux.svg"
import appleIcon from "../assets/icons/apple.svg"
import windowsIcon from "../assets/icons/windows.svg"
import androidIcon from "../assets/icons/android.svg"
import liquidIcon from "../assets/icons/liquid.png"
import recaptchaIcon from "../assets/icons/recaptcha.svg"
import analyticsIcon from "../assets/icons/analytics.svg"
import tagmanagerIcon from "../assets/icons/tagmanager.svg"
import webcomponentsIcon from "../assets/icons/webcomponents.svg"
import postmanIcon from "../assets/icons/postman.svg"
import figmaIcon from "../assets/icons/figma.svg"
import herokuIcon from "../assets/icons/heroku.svg"
import nginxIcon from "../assets/icons/nginx.svg"
import jwtIcon from "../assets/icons/jwt.svg"
import viteIcon from "../assets/icons/vite.svg"
import vitestIcon from "../assets/icons/vitest.svg"
import leafletIcon from "../assets/icons/leaflet.svg"
import reactrouterIcon from "../assets/icons/reactrouter.svg"
import drizzleIcon from "../assets/icons/drizzle.svg"
import astroIcon from "../assets/icons/astro.svg"
import maplibreIcon from "../assets/icons/maplibre.svg"
import turnstileIcon from "../assets/icons/turnstile.svg"

const iconSize = 70

const technologies = {
  go: { icon: goIcon, title: "Go", iconSize },
  python: { icon: pythonIcon, title: "Python", iconSize },
  php: { icon: phpIcon, title: "PHP", iconSize: 100 },
  html: { icon: html5Icon, title: "HTML", iconSize },
  css: { icon: cssIcon, title: "CSS", iconSize },
  sass: { icon: sassIcon, title: "SASS", iconSize },
  javascript: { icon: javascriptIcon, title: "Javascript", iconSize },
  typescript: { icon: typescriptIcon, title: "Typescript", iconSize },
  pwa: { icon: pwaIcon, title: "PWA", iconSize },
  websocket: { icon: websocketIcon, title: "Websocket", iconSize },
  next: { icon: nextIcon, title: "Next.js", iconSize },
  react: { icon: reactIcon, title: "React", iconSize },
  angular: { icon: angularIcon, title: "Angular", iconSize },
  vue: { icon: vueIcon, title: "Vue", iconSize },
  nodejs: { icon: nodejsIcon, title: "Node.js", iconSize },
  wordpress: { icon: wordpressIcon, title: "WordPress", iconSize },
  laravel: { icon: laravelIcon, title: "Laravel", iconSize },
  django: { icon: djangoIcon, title: "Django", iconSize },
  tailwindcss: { icon: tailwindcssIcon, title: "Tailwind", iconSize },
  bootstrap: { icon: bootstrapIcon, title: "Bootstrap", iconSize },
  shopify: { icon: shopifyIcon, title: "Shopify", iconSize },
  woocommerce: { icon: woocommerceIcon, title: "WooCommerce", iconSize: 100 },
  paypal: { icon: paypalIcon, title: "PayPal", iconSize },
  mercado: { icon: mercadoPagoIcon, title: "Mercado Pago", iconSize },
  graphql: { icon: graphqlIcon, title: "GraphQL", iconSize },
  postgresql: { icon: postgresqlIcon, title: "PostgreSQL", iconSize },
  mongodb: { icon: mongodbIcon, title: "MongoDB", iconSize: 40 },
  redis: { icon: redisIcon, title: "REDIS", iconSize },
  valkey: { icon: valkeyIcon, title: "Valkey", iconSize },
  prisma: { icon: prismaIcon, title: "Prisma", iconSize },
  mysql: { icon: mysqlIcon, title: "MySQL", iconSize },
  sqlite: { icon: sqliteIcon, title: "SQLite", iconSize },
  mariadb: { icon: mariadbIcon, title: "MariaDB", iconSize },
  aws: { icon: awsIcon, title: "AWS", iconSize },
  digitalocean: { icon: digitaloceanIcon, title: "Digitalocean", iconSize },
  cloudflare: { icon: cloudflareIcon, title: "Cloudflare", iconSize },
  docker: { icon: dockerIcon, title: "Docker", iconSize },
  git: { icon: gitIcon, title: "Git", iconSize },
  bash: { icon: bashIcon, title: "Bash", iconSize },
  linux: { icon: linuxIcon, title: "Linux", iconSize },
  apple: { icon: appleIcon, title: "macOS/iOS", iconSize },
  windows: { icon: windowsIcon, title: "Windows", iconSize },
  android: { icon: androidIcon, title: "Android", iconSize },
  liquid: { icon: liquidIcon, title: "Liquid", iconSize },
  recaptcha: { icon: recaptchaIcon, title: "reCAPTCHA", iconSize },
  analytics: { icon: analyticsIcon, title: "Google Analytics", iconSize },
  tagmanager: { icon: tagmanagerIcon, title: "Google Tag Manager", iconSize },
  webcomponents: { icon: webcomponentsIcon, title: "Web Components", iconSize },
  postman: { icon: postmanIcon, title: "Postman", iconSize },
  figma: { icon: figmaIcon, title: "Figma", iconSize: 45 },
  heroku: { icon: herokuIcon, title: "Heroku", iconSize },
  jwt: { icon: jwtIcon, title: "JWT", iconSize },
  vite: { icon: viteIcon, title: "Vite", iconSize },
  vitest: { icon: vitestIcon, title: "Vitest", iconSize },
  leaflet: { icon: leafletIcon, title: "Leaflet", iconSize },
  reactRouter: { icon: reactrouterIcon, title: "React Router", iconSize },
  nginx: { icon: nginxIcon, title: "nginx", iconSize },
  drizzle: { icon: drizzleIcon, title: "Drizzle ORM", iconSize },
  astro: { icon: astroIcon, title: "Astro", iconSize },
  maplibre: { icon: maplibreIcon, title: "MapLibre", iconSize },
  turnstile: { icon: turnstileIcon, title: "Turnstile", iconSize },
  // PMTiles
}

type TechnologyKey = keyof typeof technologies

export { technologies, type TechnologyKey }