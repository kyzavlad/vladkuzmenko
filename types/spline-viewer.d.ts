declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      url: string;
      loading?: 'lazy' | 'eager';
      'events-target'?: string;
    };
    'pixel-canvas': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'data-gap'?: number;
      'data-speed'?: number;
      'data-colors'?: string;
      'data-variant'?: string;
      'data-no-focus'?: string;
      style?: React.CSSProperties;
    };
  }
}