"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  Trash2,
  ExternalLink,
  Flame,
  Package,
  Tag,
  Info,
  CheckCheck,
} from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { timeAgo } from "@/lib/utils";
import { NotificationType } from "@/types";

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<"all" | NotificationType>("all");

  const filtered = notifications.filter((n) => {
    if (activeTab === "all") return true;
    return n.type === activeTab;
  });

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <Package className="w-5 h-5 text-orange-400" />;
      case "drop":
        return <Flame className="w-5 h-5 text-red-400" />;
      case "promo":
        return <Tag className="w-5 h-5 text-amber-400" />;
      case "system":
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
            INBOX & ALERTS
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-3">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs bg-orange-500 text-black px-2.5 py-0.5 rounded-full font-black">
                {unreadCount} UNREAD
              </span>
            )}
          </h1>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-orange-400" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
        {[
          { id: "all", label: "All Alerts" },
          { id: "order", label: "📦 Orders" },
          { id: "drop", label: "🔥 Hot Drops" },
          { id: "promo", label: "🏷️ Promos" },
          { id: "system", label: "⚙️ System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === tab.id
                ? "bg-orange-500 text-black shadow-md shadow-orange-500/20"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all duration-300 flex items-start gap-4 ${
                !item.read
                  ? "bg-zinc-900/80 border-orange-500/30 shadow-lg shadow-orange-500/5"
                  : "bg-zinc-900/30 border-zinc-800/80 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 shrink-0">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{item.title}</span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                    )}
                  </h3>
                  <span className="text-[11px] text-zinc-500 shrink-0">
                    {timeAgo(item.createdAt)}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.message}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs">
                  {item.link && (
                    <Link
                      href={item.link}
                      onClick={() => markAsRead(item.id)}
                      className="text-orange-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Check Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}

                  {!item.read && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark Read</span>
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={() => deleteNotification(item.id)}
                className="text-zinc-600 hover:text-red-400 p-1.5 transition-colors"
                aria-label="Delete notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="border border-dashed border-zinc-800 rounded-3xl p-12 text-center space-y-3">
            <Bell className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No notifications here</h3>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              You&apos;re caught up with all updates, drop announcements, and order tracking alerts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
