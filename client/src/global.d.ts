declare module NodeJS {
  interface Global {
    grecaptcha: any;
  }
}

declare interface Window {
  grecaptcha: {
    ready: (callback: () => void) => void;
    render: (container: string | HTMLElement, parameters: object) => void;
    execute: (siteKey: string, options: object) => Promise<string>;
    getResponse: () => string;
    reset: () => void;
  };
}
