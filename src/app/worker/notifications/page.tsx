"use client";

import React from "react";
import { BellOff, CheckCheck } from "lucide-react";
import { Button, Card, EmptyState } from "@/components/ui";
import { NotificationItem } from "@/components/cards";
import { useDemo } from "@/lib/demo-context";

export default function WorkerNotifications() {
  const { notifications, markAllRead, toast } = useDemo();
  const mine = notifications.filter((n) => n.role === "worker");

  return (
    <div className="anim-fade-up max-w-2xl mx-auto">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Notifications</h1>
          <p className="text-mist mt-1">Job requests, settlements and cooperative updates</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            markAllRead("worker");
            toast("All notifications marked as read");
          }}
        >
          <CheckCheck className="w-4 h-4" /> Mark all read
        </Button>
      </div>

      {mine.length === 0 ? (
        <Card className="mt-6">
          <EmptyState icon={BellOff} title="All caught up" sub="New job requests will appear here instantly." />
        </Card>
      ) : (
        <Card className="mt-6 divide-y divide-line overflow-hidden">
          {mine.map((n) => (
            <NotificationItem key={n.id} n={n} />
          ))}
        </Card>
      )}
    </div>
  );
}
