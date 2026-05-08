import * as React from 'react';

type StyledProps<T extends HTMLElement = HTMLElement> = React.HTMLAttributes<T> & {
  backgroundColor?: string;
  big?: boolean;
  color?: string;
  is?: keyof JSX.IntrinsicElements;
  level?: number;
  mt?: number;
  mb?: number;
  pt?: number;
  pb?: number;
  small?: boolean;
  theme?: 'error' | 'success' | string;
};

const spacing = (value?: number) => (value === undefined ? undefined : `${value * 8}px`);

const withSpacing = <T extends HTMLElement>({
  backgroundColor,
  color,
  mt,
  mb,
  pt,
  pb,
  style,
}: StyledProps<T>): React.CSSProperties => ({
  backgroundColor,
  color,
  marginTop: spacing(mt),
  marginBottom: spacing(mb),
  paddingTop: spacing(pt),
  paddingBottom: spacing(pb),
  ...style,
});

export const Space: React.FC<{ auto?: boolean }> = ({ auto }) => (
  <span style={{ flex: auto ? '1 1 auto' : undefined }} />
);

export const Toolbar: React.FC<StyledProps<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      minHeight: 48,
      ...withSpacing<HTMLDivElement>(props),
    }}
  >
    {children}
  </div>
);

export const NavItem: React.FC<StyledProps<HTMLDivElement>> = ({
  children,
  is,
  ...props
}) => {
  const Element = (is === 'object' ? 'div' : is || 'div') as keyof JSX.IntrinsicElements;

  return (
    <Element style={withSpacing(props as StyledProps)}>
      {children}
    </Element>
  );
};

export const Container: React.FC<StyledProps<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <main
    style={{
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 960,
      paddingLeft: 16,
      paddingRight: 16,
      ...withSpacing<HTMLDivElement>(props),
    }}
  >
    {children}
  </main>
);

export const Heading: React.FC<StyledProps<HTMLHeadingElement>> = ({
  big,
  children,
  level = 2,
  ...props
}) => {
  const safeLevel = Math.min(Math.max(level, 1), 6);
  const Element = `h${safeLevel}` as keyof JSX.IntrinsicElements;

  return (
    <Element
      style={{
        fontSize: big ? 32 : undefined,
        lineHeight: 1.2,
        ...withSpacing<HTMLHeadingElement>(props),
      }}
    >
      {children}
    </Element>
  );
};

export const Text: React.FC<StyledProps<HTMLParagraphElement>> = ({
  children,
  small,
  ...props
}) => (
  <p
    style={{
      fontSize: small ? 14 : undefined,
      lineHeight: 1.5,
      ...withSpacing<HTMLParagraphElement>(props),
    }}
  >
    {children}
  </p>
);

export const Button: React.FC<StyledProps<HTMLButtonElement>> = ({
  big,
  children,
  theme,
  ...props
}) => {
  const backgroundColor = theme === 'error' ? '#c92a2a' : theme === 'success' ? '#2f9e44' : '#111';

  return (
    <button
      {...props}
      style={{
        backgroundColor,
        border: 0,
        borderRadius: 4,
        color: 'white',
        cursor: 'pointer',
        fontSize: big ? 18 : 16,
        padding: big ? '12px 18px' : '8px 12px',
        ...withSpacing<HTMLButtonElement>(props),
      }}
    >
      {children}
    </button>
  );
};
