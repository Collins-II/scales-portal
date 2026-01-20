"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Layers, ShieldCheck, BarChart3, Boxes, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-2xl font-bold tracking-tight text-red-600">Quick Links</h1>
      </motion.header>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        <AdminCard
          title="Category Management"
          description="Create, edit, nest, and organize scale categories"
          icon={<Layers />}
          href="/admin/categories"
        />
        <AdminCard
          title="Products & Scales"
          description="Attach products to categories and manage inventory"
          icon={<Boxes />}
          href="/admin/products"
        />
        <AdminCard
          title="Audit Logs"
          description="Track admin actions and system changes"
          icon={<ShieldCheck />}
          href="/admin/audit-logs"
        />
        <AdminCard
          title="Analytics"
          description="View category usage and product performance"
          icon={<BarChart3 />}
          href="/admin/analytics"
        />
        <AdminCard
          title="User Management"
          description="Manage admin roles and access control"
          icon={<Users />}
          href="/admin/users"
        />
        <AdminCard
          title="System Settings"
          description="Configure platform-wide settings"
          icon={<Settings />}
          href="/admin/settings"
        />
      </section>
    </div>
  );
}

function AdminCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardContent
          className="
            p-4 sm:p-5 md:p-6
            flex flex-col gap-3 sm:gap-4
            h-full
          "
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="
                p-2 sm:p-2.5
                rounded-lg sm:rounded-xl
                bg-primary/10
                text-red-500
                shrink-0
              "
            >
              {icon}
            </div>

            <h2
              className="
                font-semibold
                text-base sm:text-lg
                leading-tight
              "
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <p
            className="
              text-gray-600
              text-xs sm:text-sm
              leading-relaxed
              flex-1
            "
          >
            {description}
          </p>

          {/* Action */}
          <Link href={href} className="mt-auto">
            <Button
              className="
                w-full
                h-9 sm:h-10
                text-sm
                bg-red-500
              "
            >
              Open
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
