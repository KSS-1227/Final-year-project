"use client";

import React, { useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import {
  Bell,
  Search,
  Database,
  Menu,
} from "lucide-react";
import { NotificationItem } from "@/types/data-contracts";

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export function Header({ onToggleMobileMenu }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Keyboard listener for Ctrl+K search focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-xs px-4 sm:px-6 shadow-2xs flex-shrink-0">
      {/* Left side: Mobile Hamburger Toggle + Breadcrumbs */}
      <div className="flex items-center space-x-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="flex lg:hidden rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <Breadcrumbs />
      </div>

      {/* Right side: Search, Status, Notifications, Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Command Search Bar */}
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search metrics, records..."
            className="w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-12 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
          />
          <kbd className="absolute right-2 top-2 hidden sm:inline-flex items-center rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
            ⌘K
          </kbd>
        </div>

        {/* Database Status Pill */}
        <div className="hidden lg:flex items-center space-x-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
          <Database className="h-3 w-3 text-emerald-600" />
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>PostgreSQL Active</span>
        </div>

        {/* Notification Bell Icon & Drawer */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-md border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:ring-1 focus:ring-blue-600"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-md border border-slate-200 bg-white p-3 shadow-lg z-50 animate-in fade-in-50 slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-semibold text-slate-900">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-blue-50 border border-blue-200 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded border text-xs transition-colors ${
                        n.read
                          ? "bg-slate-50/50 border-slate-100 text-slate-600"
                          : "bg-blue-50/40 border-blue-100 text-slate-900 font-medium"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-600 leading-tight">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-5 w-px bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center space-x-2 pl-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white font-semibold text-xs shadow-xs">
            DI
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-semibold text-slate-900 leading-tight">
              Analyst
            </span>
            <span className="text-[10px] text-slate-500">Decision Intelligence</span>
          </div>
        </div>
      </div>
    </header>
  );
}

