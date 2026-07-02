import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type Ref } from "react";
import type * as React from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { buttonVariants, type ButtonVariantProps } from "./button.variants";

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorElementProps = AnchorHTMLAttributes<HTMLAnchorElement>;

interface CommonProps extends ButtonVariantProps {
  readonly className?: string;
}

type ButtonAsButtonProps = CommonProps &
  ButtonElementProps & {
    readonly href?: never;
    readonly external?: never;
  };

type ButtonAsLinkProps = CommonProps &
  Omit<AnchorElementProps, "href"> & {
    readonly href: string;
    readonly external?: boolean;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function isLinkProps(
  props: ButtonAsButtonProps | ButtonAsLinkProps,
): props is ButtonAsLinkProps {
  return typeof (props as ButtonAsLinkProps).href === "string";
}

/**
 * Polymorphic Button.
 * - With `href`, renders a Next.js Link (or <a> when external).
 * - Without `href`, renders a native <button>.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { className, variant, size } = props;
    const classes = cn(buttonVariants({ variant, size }), className);

    if (isLinkProps(props)) {
      const { href, external, className: _omit, variant: _v, size: _s, ...anchorRest } = props;
      void _omit;
      void _v;
      void _s;

      if (external) {
        return (
          <a
            ref={ref as Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={classes}
            {...anchorRest}
          />
        );
      }

      return (
        <Link
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        />
      );
    }

    const { className: _omit, variant: _v, size: _s, ...buttonRest } = props;
    void _omit;
    void _v;
    void _s;

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        {...buttonRest}
      />
    );
  },
);
