"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

/* --------------------------------
   Route → Header Config
-------------------------------- */
type HeaderConfig = {
  image: string;
  subtitle?: string;
  title?: string;
};

const PUBLIC_HEADER_CONFIG: Record<string, HeaderConfig> = {
  "/market-sectors": {
    image: "/products/lab-s1.png",
    subtitle: "Solutions Across Key Industries"
  },
  "/services": {
    image: "/products/retail-s3.png",
    subtitle: "Professional Calibration & Support"
  },
  "/why-us": {
    image: "/products/lab-s2.png",
    subtitle: "Trusted Precision Since Day One"
  },
  "/contact-us": {
    image: "/products/retail-s5.png",
    subtitle: "Get In-Touch With Us"
  },
  "/products": {
    image: "/products/retail-s4.png",
    subtitle: "Precision Weighing Solutions"
  }
};

const ADMIN_HEADER_CONFIG: Record<string, HeaderConfig> = {
  "/admin": {
    image: "/products/retail-s1.png",
    title: "Admin Dashboard",
    subtitle: "Platform overview & management"
  },
  "/admin/products": {
    image: "/products/retail-s5.png",
    title: "Products",
    subtitle: "Manage weighing products & variants"
  },
  "/admin/categories": {
    image: "/products/lab-s1.png",
    title: "Categories",
    subtitle: "Organize product classifications"
  },
  "/admin/banners": {
    image: "/products/retail-s1.png",
    title: "Banners",
    subtitle: "Homepage & campaign banners"
  },
  "/admin/orders": {
    image: "/products/retail-s3.png",
    title: "Orders",
    subtitle: "Customer orders & fulfillment"
  }
};

/* --------------------------------
   Helpers
-------------------------------- */
function formatSegment(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function resolveAdminConfig(pathname: string): HeaderConfig | null {
  const match = Object.keys(ADMIN_HEADER_CONFIG)
    .sort((a, b) => b.length - a.length)
    .find(route => pathname.startsWith(route));

  return match ? ADMIN_HEADER_CONFIG[match] : null;
}

/* --------------------------------
   Component
-------------------------------- */
export function SiteHeader() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  /* -------- Admin Header -------- */
  if (isAdmin) {
    const adminConfig =
      resolveAdminConfig(pathname) ?? {
        image: "/products/retail-s5.png",
        title: "Admin Portal",
        subtitle: "System management & configuration"
      };

    return (
      <header className="relative w-full h-[10vh] min-h-[140px] flex items-center text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={adminConfig.image}
            alt={adminConfig.title ?? "Admin"}
            fill
            priority
            className="object-cover object-center"
          />
          {/* ✅ Proper overlay */}
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">
          <SidebarTrigger />
          <Link href="/" className="hover:text-white transition font-medium">
            Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {adminConfig.title}
          </h1>
          {adminConfig.subtitle && (
            <p className="mt-1 text-sm md:text-base text-neutral-300">
              {adminConfig.subtitle}
            </p>
          )}
        </div>
      </header>
    );
  }

  /* -------- Public Header -------- */
  const normalizedPath = pathname.toLowerCase();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map(formatSegment);

  const pageTitle =
    segments.length > 0
      ? segments[segments.length - 1]
      : "Precision Weighing Solutions";

  const headerConfig =
    PUBLIC_HEADER_CONFIG[normalizedPath] ?? {
      image: "/products/retail-s5.png",
      subtitle: "Manage categories, products, audits, and system operations securely."
    };

  return (
    <header className="relative w-full bg-neutral-200 h-[10vh] min-h-[140px] flex items-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={headerConfig.image}
          alt={pageTitle}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full p-6 md:px-10 flex flex-col gap-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-neutral-300 ">
          <SidebarTrigger />
          <Link href="/" className="hover:text-white transition font-medium">
            Home
          </Link>

          {segments.map((seg, i) => (
            <span key={i} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4 text-neutral-400" />
              <span
                className={
                  i === segments.length - 1
                    ? "text-white font-semibold"
                    : "text-neutral-300"
                }
              >
                {seg}
              </span>
            </span>
          ))}
        </nav>

        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {pageTitle}
          </h1>
          <p className="mt-2 text-base md:text-lg text-neutral-200 max-w-2xl">
            {headerConfig.subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
