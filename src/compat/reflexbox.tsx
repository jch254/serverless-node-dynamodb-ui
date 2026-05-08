import * as React from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: React.CSSProperties['alignItems'];
  auto?: boolean;
  column?: boolean;
  justify?: React.CSSProperties['justifyContent'];
  mt?: number;
  mb?: number;
  pt?: number;
  pb?: number;
};

const spacing = (value?: number) => (value === undefined ? undefined : `${value * 8}px`);

export const Flex: React.FC<FlexProps> = ({
  align,
  auto,
  children,
  column,
  justify,
  mt,
  mb,
  pt,
  pb,
  style,
  ...rest
}) => (
  <div
    {...rest}
    style={{
      display: 'flex',
      flex: auto ? '1 1 auto' : undefined,
      flexDirection: column ? 'column' : undefined,
      alignItems: align,
      justifyContent: justify,
      marginTop: spacing(mt),
      marginBottom: spacing(mb),
      paddingTop: spacing(pt),
      paddingBottom: spacing(pb),
      ...style,
    }}
  >
    {children}
  </div>
);
