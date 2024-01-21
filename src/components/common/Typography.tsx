import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type TypographyVariant =
  | "T_Bold_H1"
  | "T_Bold_H2"
  | "T_Bold_H3"
  | "T_Bold_H4"
  | "T_Bold_H5"
  | "T_Bold_H6"
  | "T_Bold_H7"
  | "T_Bold_H8"
  | "T_SemiBold_H1"
  | "T_SemiBold_H2"
  | "T_SemiBold_H3"
  | "T_SemiBold_H4"
  | "T_SemiBold_H5"
  | "T_SemiBold_H6"
  | "T_SemiBold_H7"
  | "T_SemiBold_H8"
  | "T_Medium_H1"
  | "T_Medium_H2"
  | "T_Medium_H3"
  | "T_Medium_H4"
  | "T_Medium_H5"
  | "T_Medium_H6"
  | "T_Medium_H7"
  | "T_Medium_H8"
  | "T_Regular_H1"
  | "T_Regular_H2"
  | "T_Regular_H3"
  | "T_Regular_H4"
  | "T_Regular_H5"
  | "T_Regular_H6"
  | "T_Regular_H7"
  | "T_Regular_H8";

export type CVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning";

interface ITypeographyProps extends PropsWithChildren {
  variant?: TypographyVariant;
  maxLines?: number;
  disableSelect?: boolean;
  className?: string;
  color?: CVariant;
  as?: React.ElementType;
}

const getVariant = (variant: TypographyVariant) => {
  switch (variant) {
    // "Bold" - 700
    case "T_Bold_H1":
      return {
        className: "font-bold text-4xl md:text-6xl tracking-normal",
        element: "h1",
      };
    case "T_Bold_H2":
      return {
        className: "font-bold text-2xl md:text-4xl tracking-normal",
        element: "h2",
      };
    case "T_Bold_H3":
      return {
        className: "font-bold text-xl md:text-2xl tracking-normal",
        element: "h3",
      };
    case "T_Bold_H4":
      return {
        className: "font-bold text-lg md:text-xl tracking-normal",
        element: "h4",
      };
    case "T_Bold_H5":
      return {
        className: "font-bold text-base md:text-lg tracking-normal",
        element: "h5",
      };
    case "T_Bold_H6":
      return {
        className: "font-bold text-sm md:text-base tracking-normal",
        element: "h6",
      };
    case "T_Bold_H7":
      return {
        className: "font-bold text-xs md:text-sm tracking-normal",
        element: "h6",
      };
    case "T_Bold_H8":
      return {
        className: "font-bold text-xs tracking-normal",
        element: "h6",
      };

    // "SemiBold" - 600
    case "T_SemiBold_H1":
      return {
        className: "font-semibold text-4xl md:text-6xl tracking-normal",
        element: "h1",
      };
    case "T_SemiBold_H2":
      return {
        className: "font-semibold text-2xl md:text-4xl tracking-normal",
        element: "h2",
      };
    case "T_SemiBold_H3":
      return {
        className: "font-semibold text-xl md:text-2xl tracking-normal",
        element: "h3",
      };
    case "T_SemiBold_H4":
      return {
        className: "font-semibold text-lg md:text-xl tracking-normal",
        element: "h4",
      };
    case "T_SemiBold_H5":
      return {
        className: "font-semibold text-base md:text-lg tracking-normal",
        element: "h5",
      };
    case "T_SemiBold_H6":
      return {
        className: "font-semibold text-sm md:text-base tracking-normal",
        element: "h6",
      };
    case "T_SemiBold_H7":
      return {
        className: "font-semibold  text-xs md:text-sm tracking-normal",
        element: "h6",
      };
    case "T_SemiBold_H8":
      return {
        className: "font-semibold  text-xs tracking-normal",
        element: "h6",
      };

    // "Medium" - 500
    case "T_Medium_H1":
      return {
        className: "font-medium text-4xl md:text-6xl tracking-normal",
        element: "h1",
      };
    case "T_Medium_H2":
      return {
        className: "font-medium text-2xl md:text-4xl tracking-normal",
        element: "h2",
      };
    case "T_Medium_H3":
      return {
        className: "font-medium text-xl md:text-2xl tracking-normal",
        element: "h3",
      };
    case "T_Medium_H4":
      return {
        className: "font-medium text-lg md:text-xl tracking-normal",
        element: "h4",
      };
    case "T_Medium_H5":
      return {
        className: "font-medium text-base md:text-lg tracking-normal",
        element: "h5",
      };
    case "T_Medium_H6":
      return {
        className: "font-medium text-sm md:text-base tracking-normal",
        element: "h6",
      };
    case "T_Medium_H7":
      return {
        className: "font-medium  text-xs md:text-sm tracking-normal",
        element: "h6",
      };
    case "T_Medium_H8":
      return {
        className: "font-medium  text-xs tracking-normal",
        element: "h6",
      };

    // "Regular" - 400
    case "T_Regular_H1":
      return {
        className: "text-4xl md:text-6xl tracking-normal",
        element: "p",
      };
    case "T_Regular_H2":
      return {
        className: "text-2xl md:text-4xl tracking-normal",
        element: "p",
      };
    case "T_Regular_H3":
      return {
        className: "text-xl md:text-2xl tracking-normal",
        element: "p",
      };
    case "T_Regular_H4":
      return {
        className: "text-lg md:text-xl tracking-normal",
        element: "p",
      };
    case "T_Regular_H5":
      return {
        className: "text-base md:text-lg tracking-normal",
        element: "p",
      };
    case "T_Regular_H6":
      return {
        className: "text-sm md:text-base tracking-normal",
        element: "p",
      };
    case "T_Regular_H7":
      return {
        className: "text-xs md:text-sm tracking-normal",
        element: "p",
      };
    case "T_Regular_H8":
      return {
        className: "text-xs tracking-normal",
        element: "p",
      };

    default:
      return {
        className: "text-base md:text-lg tracking-normal",
        element: "p",
      };
  }
};

const getColor = (cVariant: CVariant) => {
  switch (cVariant) {
    case "primary":
      return "text-foreground";
    case "secondary":
      return "text-primary-100";
    case "danger":
      return "text-danger";
    case "success":
      return "text-success";
    case "warning":
      return "text-warning";
    default:
      return "text-primary";
  }
};

function Typography({
  variant = "T_Regular_H6",
  color = "primary",
  children,
  maxLines,
  disableSelect = false,
  className,
  as,
  ...props
}: ITypeographyProps) {
  if (!variant) {
    throw new Error("variant is required");
  }

  let { className: fontTypes, element: Element } = getVariant(variant);
  let textColor = getColor(color);

  const lineClampClass = maxLines
    ? maxLines > 0
      ? `line-clamp-${maxLines?.toString()}`
      : "whitespace-normal"
    : "";

  let Component = as ?? Element;

  const content = (
    <Component
      className={`${fontTypes} ${className} ${lineClampClass} ${textColor} overflow-wrap overflow-hidden leading-normal`}
      style={{ userSelect: disableSelect ? "none" : "auto" }}
      {...props}
    >
      {children}
    </Component>
  );

  return content;
}

export default Typography;
