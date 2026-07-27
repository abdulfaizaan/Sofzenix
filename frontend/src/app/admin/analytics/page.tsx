import type * as React from "react";
import { Container } from "@/shared/components/ui/Container";
import { Heading } from "@/shared/components/ui/Heading";

async function getAnalytics() {
  // In a real app, this would be an authenticated fetch to the backend API
  // using cookies/headers. For this demonstration, we'll mock the response.
  return {
    metrics: [
      { label: "Total Projects", value: "24", change: "+12%" },
      { label: "Published Posts", value: "18", change: "+5%" },
      { label: "Client Testimonials", value: "9", change: "+2" },
      { label: "Page Views (30d)", value: "12,450", change: "+18%" }
    ],
    recentActivity: [
      { action: "New Lead Captured", time: "2 mins ago" },
      { action: "Project 'Fintech App' Updated", time: "1 hour ago" },
      { action: "Newsletter Sent to 1,200 subs", time: "Yesterday" }
    ]
  };
}

export default async function AnalyticsDashboard(): Promise<React.JSX.Element> {
  const data = await getAnalytics();

  return (
    <div className="py-24 bg-background min-h-screen">
      <Container>
        <Heading level="h1" as="h1" className="mb-12">
          Analytics Dashboard
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.metrics.map((metric, i) => (
            <div key={i} className="bg-surface border border-surface-hover p-6 rounded-2xl">
              <h3 className="text-sm text-muted uppercase tracking-wider mb-2">{metric.label}</h3>
              <div className="flex items-end gap-4">
                <span className="text-4xl font-display font-medium text-text">{metric.value}</span>
                <span className="text-sm text-accent font-medium mb-1">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        <Heading level="h2" as="h2" className="text-2xl mb-6">
          Recent Activity
        </Heading>

        <div className="bg-surface border border-surface-hover rounded-2xl overflow-hidden">
          <div className="divide-y divide-surface-hover">
            {data.recentActivity.map((activity, i) => (
              <div key={i} className="p-6 flex justify-between items-center">
                <span className="text-text font-medium">{activity.action}</span>
                <span className="text-sm text-muted">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
