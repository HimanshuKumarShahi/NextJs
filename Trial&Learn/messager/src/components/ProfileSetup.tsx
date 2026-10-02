"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { User, Sparkles, Check, RefreshCw, AlertCircle } from "lucide-react";

export interface UserProfile {
  userId: string;
  displayName: string;
  profilePicUrl: string;
}

const AVATAR_SEEDS = ["Felix", "Luna", "Oliver", "Bella", "Charlie", "Milo", "Chloe", "Leo"];

interface ProfileSetupProps {
  onProfileReady: (profile: UserProfile) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
  onProfileReady,
  isOpen: forcedOpen,
  onClose,
}) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_SEEDS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Use a ref to prevent the effect from running more than once on mount
  const didCheckLocal = useRef(false);

  // Only read localStorage ONCE on mount to decide if modal should show
  useEffect(() => {
    if (didCheckLocal.current) return;
    didCheckLocal.current = true;

    try {
      const storedUserId = localStorage.getItem("family_user_id");
      const storedName = localStorage.getItem("family_user_name");
      const storedAvatar = localStorage.getItem("family_user_avatar");

      if (storedUserId && storedName) {
        const profile: UserProfile = {
          userId: storedUserId,
          displayName: storedName,
          profilePicUrl:
            storedAvatar ||
            `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(storedName)}`,
        };
        // Call once — parent must use useCallback so this reference is stable
        onProfileReady(profile);
      } else {
        setIsModalOpen(true);
      }
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
      setIsModalOpen(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — runs once on mount only

  // Handle external open/close control (edit profile button)
  useEffect(() => {
    if (forcedOpen === true) {
      setIsModalOpen(true);
    } else if (forcedOpen === false && isModalOpen) {
      // only close if forcedOpen was explicitly set to false after being true
      // we don't close on initial undefined→false transition
    }
  }, [forcedOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!displayName.trim()) {
        setError("Please enter your name or nickname");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        let userId = localStorage.getItem("family_user_id");
        if (!userId) {
          userId = uuidv4();
        }

        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(selectedAvatar)}`;

        const newProfile: UserProfile = {
          userId,
          displayName: displayName.trim(),
          profilePicUrl: avatarUrl,
        };

        localStorage.setItem("family_user_id", newProfile.userId);
        localStorage.setItem("family_user_name", newProfile.displayName);
        localStorage.setItem("family_user_avatar", newProfile.profilePicUrl);

        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProfile),
        });

        if (!res.ok) {
          console.warn("API returned non-OK status; saved locally anyway.");
        }

        setIsModalOpen(false);
        onProfileReady(newProfile);
        onClose?.();
      } catch (err) {
        console.error("Error creating profile:", err);
        setError("An error occurred while saving profile, but you can continue.");
        const userId = localStorage.getItem("family_user_id") || uuidv4();
        const profile: UserProfile = {
          userId,
          displayName: displayName.trim(),
          profilePicUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(selectedAvatar)}`,
        };
        setIsModalOpen(false);
        onProfileReady(profile);
      } finally {
        setIsLoading(false);
      }
    },
    [displayName, selectedAvatar, onProfileReady, onClose]
  );

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl text-zinc-100 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black mb-4 shadow-lg shadow-emerald-500/20">
            <Sparkles className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome to Family Messenger
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Choose your nickname and avatar to get started. No password needed!
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-950/50 border border-red-800/50 px-4 py-2.5 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Choose Avatar
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {AVATAR_SEEDS.map((seed) => {
                const isSelected = selectedAvatar === seed;
                const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`;
                return (
                  <button
                    key={seed}
                    type="button"
                    onClick={() => setSelectedAvatar(seed)}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 shadow-md scale-105"
                        : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatarUrl} alt={seed} className="h-10 w-10 rounded-full" />
                    <span className="text-[10px] mt-1 text-zinc-400 truncate max-w-full font-medium">
                      {seed}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1 right-1 rounded-full bg-emerald-500 p-0.5 text-black">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"
            >
              Your Name / Nickname
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
                <User className="h-4 w-4" />
              </div>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Dad, Mom, Alex, Sophie..."
                maxLength={30}
                required
                autoFocus
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !displayName.trim()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>Join Family Room →</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
