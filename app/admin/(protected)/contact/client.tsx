"use client";

import { Mail, Phone, Calendar, User } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: Date;
}

export default function ContactClient({
  initialData,
}: {
  initialData: ContactSubmission[];
}) {
  return (
    <div className="grid gap-4">
      {initialData.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-800 rounded-xl border border-gray-700">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p>No inquiries yet.</p>
        </div>
      ) : (
        initialData.map((submission) => (
          <div
            key={submission.id}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-full">
                  <User size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{submission.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {submission.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {submission.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-900 px-3 py-1 rounded-full">
                <Calendar size={14} />
                {new Date(submission.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg text-gray-300 border border-gray-700/50">
              {submission.message}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
