import { cva } from 'class-variance-authority';

export const spacingStyles = cva('', {
  variants: {
    margin: {
      xs: 'm-xs', // margin: 4px;
      sm: 'm-sm', // margin: 8px;
      ms: 'm-ms', // margin: 12px;
      md: 'm-md', // margin: 16px;
      ml: 'm-ml', // margin: 20px;
      lg: 'm-lg', // margin: 24px;
      xl: 'm-xl', // margin: 32px;
      '2xl': 'm-2xl', // margin: 48px;
    },
    padding: {
      xs: 'p-xs', // padding: 4px;
      sm: 'p-sm', // padding: 8px;
      ms: 'p-ms', // padding: 12px;
      md: 'p-md', // padding: 16px;
      ml: 'p-ml', // padding: 20px;
      lg: 'p-lg', // padding: 24px;
      xl: 'p-xl', // padding: 32px;
      '2xl': 'p-2xl', // padding: 48px;
    },
    marginX: {
      xs: 'mx-xs', // margin-left: 4px; margin-right: 4px;
      sm: 'mx-sm', // margin-left: 8px; margin-right: 8px;
      ms: 'mx-ms', // margin-left: 12px; margin-right: 12px;
      md: 'mx-md', // margin-left: 16px; margin-right: 16px;
      ml: 'mx-ml', // margin-left: 20px; margin-right: 20px;
      lg: 'mx-lg', // margin-left: 24px; margin-right: 24px;
      xl: 'mx-xl', // margin-left: 32px; margin-right: 32px;
      '2xl': 'mx-2xl', // margin-left: 48px; margin-right: 48px;
    },
    marginY: {
      xs: 'my-xs', // margin-top: 4px; margin-bottom: 4px;
      sm: 'my-sm', // margin-top: 8px; margin-bottom: 8px;
      ms: 'my-ms', // margin-top: 12px; margin-bottom: 12px;
      md: 'my-md', // margin-top: 16px; margin-bottom: 16px;
      ml: 'my-ml', // margin-top: 20px; margin-bottom: 20px;
      lg: 'my-lg', // margin-top: 24px; margin-bottom: 24px;
      xl: 'my-xl', // margin-top: 32px; margin-bottom: 32px;
      '2xl': 'my-2xl', // margin-top: 48px; margin-bottom: 48px;
    },
    paddingX: {
      xs: 'px-xs', // padding-left: 4px; padding-right: 4px;
      sm: 'px-sm', // padding-left: 8px; padding-right: 8px;
      ms: 'px-ms', // padding-left: 12px; padding-right: 12px;
      md: 'px-md', // padding-left: 16px; padding-right: 16px;
      ml: 'px-ml', // padding-left: 20px; padding-right: 20px;
      lg: 'px-lg', // padding-left: 24px; padding-right: 24px;
      xl: 'px-xl', // padding-left: 32px; padding-right: 32px;
      '2xl': 'px-2xl', // padding-left: 48px; padding-right: 48px;
    },
    paddingY: {
      xs: 'py-xs', // padding-top: 4px; padding-bottom: 4px;
      sm: 'py-sm', // padding-top: 8px; padding-bottom: 8px;
      ms: 'py-ms', // padding-top: 12px; padding-bottom: 12px;
      md: 'py-md', // padding-top: 16px; padding-bottom: 16px;
      ml: 'py-ml', // padding-top: 20px; padding-bottom: 20px;
      lg: 'py-lg', // padding-top: 24px; padding-bottom: 24px;
      xl: 'py-xl', // padding-top: 32px; padding-bottom: 32px;
      '2xl': 'py-2xl', // padding-top: 48px; padding-bottom: 48px;
    },
    marginTop: {
      xs: 'mt-xs', // margin-top: 4px;
      sm: 'mt-sm', // margin-top: 8px;
      ms: 'mt-ms', // margin-top: 12px;
      md: 'mt-md', // margin-top: 16px;
      ml: 'mt-ml', // margin-top: 20px;
      lg: 'mt-lg', // margin-top: 24px;
      xl: 'mt-xl', // margin-top: 32px;
      '2xl': 'mt-2xl', // margin-top: 48px;
    },
    marginBottom: {
      xs: 'mb-xs', // margin-bottom: 4px;
      sm: 'mb-sm', // margin-bottom: 8px;
      ms: 'mb-ms', // margin-bottom: 12px;
      md: 'mb-md', // margin-bottom: 16px;
      ml: 'mb-ml', // margin-bottom: 20px;
      lg: 'mb-lg', // margin-bottom: 24px;
      xl: 'mb-xl', // margin-bottom: 32px;
      '2xl': 'mb-2xl', // margin-bottom: 48px;
    },
    marginLeft: {
      xs: 'ml-xs', // margin-left: 4px;
      sm: 'ml-sm', // margin-left: 8px;
      ms: 'ml-ms', // margin-left: 12px;
      md: 'ml-md', // margin-left: 16px;
      ml: 'ml-ml', // margin-left: 20px;
      lg: 'ml-lg', // margin-left: 24px;
      xl: 'ml-xl', // margin-left: 32px;
      '2xl': 'ml-2xl', // margin-left: 48px;
    },
    marginRight: {
      xs: 'mr-xs', // margin-right: 4px;
      sm: 'mr-sm', // margin-right: 8px;
      ms: 'mr-ms', // margin-right: 12px;
      md: 'mr-md', // margin-right: 16px;
      ml: 'mr-ml', // margin-right: 20px;
      lg: 'mr-lg', // margin-right: 24px;
      xl: 'mr-xl', // margin-right: 32px;
      '2xl': 'mr-2xl', // margin-right: 48px;
    },
    paddingTop: {
      xs: 'pt-xs', // padding-top: 4px;
      sm: 'pt-sm', // padding-top: 8px;
      ms: 'pt-ms', // padding-top: 12px;
      md: 'pt-md', // padding-top: 16px;
      ml: 'pt-ml', // padding-top: 20px;
      lg: 'pt-lg', // padding-top: 24px;
      xl: 'pt-xl', // padding-top: 32px;
      '2xl': 'pt-2xl', // padding-top: 48px;
    },
    paddingBottom: {
      xs: 'pb-xs', // padding-bottom: 4px;
      sm: 'pb-sm', // padding-bottom: 8px;
      ms: 'pb-ms', // padding-bottom: 12px;
      md: 'pb-md', // padding-bottom: 16px;
      ml: 'pb-ml', // padding-bottom: 20px;
      lg: 'pb-lg', // padding-bottom: 24px;
      xl: 'pb-xl', // padding-bottom: 32px;
      '2xl': 'pb-2xl', // padding-bottom: 48px;
    },
    paddingLeft: {
      xs: 'pl-xs', // padding-left: 4px;
      sm: 'pl-sm', // padding-left: 8px;
      ms: 'pl-ms', // padding-left: 12px;
      md: 'pl-md', // padding-left: 16px;
      ml: 'pl-ml', // padding-left: 20px;
      lg: 'pl-lg', // padding-left: 24px;
      xl: 'pl-xl', // padding-left: 32px;
      '2xl': 'pl-2xl', // padding-left: 48px;
    },
    paddingRight: {
      xs: 'pr-xs', // padding-right: 4px;
      sm: 'pr-sm', // padding-right: 8px;
      ms: 'pr-ms', // padding-right: 12px;
      md: 'pr-md', // padding-right: 16px;
      ml: 'pr-ml', // padding-right: 20px;
      lg: 'pr-lg', // padding-right: 24px;
      xl: 'pr-xl', // padding-right: 32px;
      '2xl': 'pr-2xl', // padding-right: 48px;
    },
  },
  // 명시적으로 사용하기 위해 defaultVariants를 사용하지 않음
  // defaultVariants: {
  //   margin: 'md',
  //   padding: 'md',
  // },
});
