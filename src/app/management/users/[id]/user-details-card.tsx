"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Mail, Building } from "lucide-react";
import { type User } from "@/lib/mock-data";

interface UserDetailsCardProps {
  user: User;
}

/**
 * Extracts up to two uppercase initials from a full name.
 *
 * Splits the input `name` on spaces, takes the first character of each word,
 * joins them, converts to uppercase, and returns at most the first two characters.
 *
 * @param name - The full name string to derive initials from.
 * @returns Up to two uppercase initials (empty string if `name` is empty).
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2); // Maksimum 2 harf
}

/**
 * Deterministically selects a Tailwind background color class for an avatar based on a name.
 *
 * Uses a simple character-code hash of `name` to pick one of a fixed palette of CSS classes.
 *
 * @param name - The input name used to derive the color (empty string yields the first palette color).
 * @returns A Tailwind CSS background color class (e.g. `bg-blue-500`).
 */
function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'bg-blue-500',
    'bg-emerald-500', 
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-rose-500',
    'bg-teal-500',
    'bg-amber-500'
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Render a user details card showing an avatar, basic profile info, contact links, and a statistics placeholder.
 *
 * The avatar displays up to two initials derived from `user.name` with a background color computed from the name.
 * The component shows `user.name`, `user.role` (falls back to "Senior FI Consultant" when absent), a static "FI" label,
 * the user's phone number, and an email link (mailto). A right-hand panel contains a placeholder for statistics.
 *
 * @param user - The user to render. Expected fields used: `name` (required), `email`, `phone`, and optional `role`.
 * @returns A JSX element containing the rendered user detail card.
 */
export function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32 shadow-lg">
              <AvatarFallback className={`${getAvatarColor(user.name)} text-white text-3xl font-bold`}>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600 font-medium">{user.role || "Senior FI Consultant"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Building className="w-4 h-4" />
                <span>FI</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${user.email}`} className="hover:underline">
                  {user.email}
                </a>
              </div>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="flex-shrink-0 w-80">
            <Card className="bg-gray-100">
              <CardContent className="p-4 text-center">
                <p className="text-gray-600">İstatistik alanı burada yer alacaktır.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
