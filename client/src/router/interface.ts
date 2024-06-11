export interface Route {
  path: string;
  element?: string | (() => string);
  init?: () => void;
}
