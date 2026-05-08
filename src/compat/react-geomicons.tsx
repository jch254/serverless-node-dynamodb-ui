import * as React from 'react';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: 'check' | 'home' | 'info' | 'list' | 'user' | string;
}

const paths: Record<string, string> = {
  check: 'M8.5 15.5 3.5 10.5 5.2 8.8 8.5 12.1 18.8 1.8 20.5 3.5z',
  home: 'M2 10.5 11 3l9 7.5v9.5h-6v-6h-6v6H2z',
  info: 'M11 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm1 14h-2v-6h2zm0-8h-2V6h2z',
  list: 'M4 5h2v2H4zm4 0h12v2H8zM4 10h2v2H4zm4 0h12v2H8zM4 15h2v2H4zm4 0h12v2H8z',
  user: 'M11 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0z',
};

const Icon: React.FC<IconProps> = ({ fill = 'currentColor', name, ...props }) => (
  <svg viewBox="0 0 22 22" aria-hidden="true" focusable="false" fill={fill} {...props}>
    <path d={paths[name] || paths.info} />
  </svg>
);

export default Icon;
