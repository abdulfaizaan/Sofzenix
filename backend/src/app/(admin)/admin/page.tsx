import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";
import type { Lead, ContactMessage } from "@prisma/client";
import { StatusSelect } from "./StatusSelect";
import { updateLeadStatus, updateMessageStatus } from "./actions";

export default async function AdminDashboard() {
  const recentLeads = await prisma.lead.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const recentMessages = await prisma.contactMessage.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Leads</h3>
        <div className="bg-white shadow rounded-lg overflow-hidden border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentLeads.map((lead: Lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{decrypt(lead.emailEncrypted)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <StatusSelect id={lead.id} currentStatus={lead.status} onUpdate={updateLeadStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Contact Messages</h3>
        <div className="bg-white shadow rounded-lg overflow-hidden border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentMessages.map((msg: ContactMessage) => (
                <tr key={msg.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div>{msg.name}</div>
                    <div className="text-xs text-gray-400">{msg.service || 'General'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">{msg.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <StatusSelect id={msg.id} currentStatus={msg.status} onUpdate={updateMessageStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
