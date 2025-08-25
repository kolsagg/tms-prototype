"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Wraps Radix's Avatar Primitive Root with project default avatar styles and forwards all props.
 *
 * @param className - Optional additional CSS classes merged with the component's default avatar styles.
 * @returns A configured `AvatarPrimitive.Root` element with merged classes and forwarded props.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Avatar image component that wraps Radix's Avatar.Image and applies default sizing classes.
 *
 * Merges any provided `className` with the default "aspect-square size-full" classes and forwards all other props to the underlying `AvatarPrimitive.Image`.
 *
 * @param className - Additional CSS class names to append to the default avatar image classes.
 * @returns The wrapped `AvatarPrimitive.Image` element.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders fallback content for an avatar when the image is unavailable.
 *
 * Wraps `AvatarPrimitive.Fallback`, applies the component's default styling and
 * sets `data-slot="avatar-fallback"`. Merges any provided `className` with
 * the default classes and forwards all other props to the underlying Radix
 * Avatar Fallback primitive.
 *
 * @returns The rendered `AvatarPrimitive.Fallback` element.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
