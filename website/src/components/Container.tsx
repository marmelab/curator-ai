import clsx from 'clsx';

const styles = {
  xs: 'mx-auto px-2 sm:px-4 md:max-w-2xl md:px-2 lg:px-2',
  sm: 'mx-auto px-2 sm:px-4 md:max-w-2xl md:px-2 lg:max-w-4xl lg:px-4',
  md: 'mx-auto px-2 sm:px-4 md:max-w-2xl md:px-2 lg:max-w-5xl lg:px-4',
  lg: 'mx-auto px-2 sm:px-4 md:max-w-2xl md:px-2 lg:max-w-7xl lg:px-4',
};

export function Container({
  size = 'sm',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { size?: keyof typeof styles }) {
  return <div className={clsx(styles[size], className)} {...props} />;
}
