"use client";

import React from "react";
import { Trash2, Quote, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MessageCardProps {
  message: {
    _id: string;
    content: string;
    createdAt: string | Date;
  };
  onMessageDelete: (messageId: string) => void;
}

export default function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  return (
    <div className="group relative p-1 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-orange-500/50 hover:to-amber-500/50 transition-all duration-300">
      <div className="h-full w-full bg-zinc-950 rounded-[22px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
        <Quote className="absolute top-4 right-4 h-24 w-24 text-zinc-900/50 -rotate-12 pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <p className="text-zinc-200 text-lg leading-relaxed font-medium">
            "{message.content}"
          </p>
        </div>

        <div className="relative z-10 mt-8 flex justify-between items-end">
          <p className="text-xs text-zinc-500 font-mono font-medium">
            {new Date(message.createdAt).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          
          <AlertDialog>
            
            <AlertDialogTrigger 
              className="flex items-center justify-center h-10 w-10 p-0 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all duration-300 focus:outline-none"
            >
              <Trash2 className="h-4 w-4" />
            </AlertDialogTrigger>
            
            <AlertDialogContent className="bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-xl text-white">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  This action cannot be undone. This will permanently delete this anonymous message from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onMessageDelete(message._id)}
                  className="bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-[0_0_15px_-5px_rgba(220,38,38,0.5)] transition-all"
                >
                  Yes, delete it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}