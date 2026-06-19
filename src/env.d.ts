interface ImportMetaEnv {
  readonly PUBLIC_CAPTCHA_SITE_KEY: string;
  readonly PUBLIC_GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}