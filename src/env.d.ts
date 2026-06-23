interface ImportMetaEnv {
  readonly PUBLIC_CAPTCHA_SITE_KEY: string;
  readonly PUBLIC_GTM_ID: string;
  readonly PUBLIC_CONTACT_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}