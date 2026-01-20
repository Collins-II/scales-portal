"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isValid,
} from "date-fns"

/* ---------------------------
   Utils
--------------------------- */
function formatDate(date: Date) {
  return date.toISOString().slice(0, 10) // YYYY-MM-DD
}

function parseDate(value?: string | null) {
  if (!value) return undefined
  const d = new Date(value)
  return isValid(d) ? d : undefined
}

/* ---------------------------
   Component
--------------------------- */
export function DatePicker() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedFrom = parseDate(searchParams.get("from"))
  const selectedTo = parseDate(searchParams.get("to"))

  const updateParams = React.useCallback(
    (from?: Date, to?: Date) => {
      const params = new URLSearchParams(searchParams.toString())

      if (from) params.set("from", formatDate(from))
      else params.delete("from")

      if (to) params.set("to", formatDate(to))
      else params.delete("to")

      router.replace(`/admin/orders?${params.toString()}`, {
        scroll: false,
      })
    },
    [router, searchParams]
  )

  /* ---------------------------
     Presets
  --------------------------- */
  const today = React.useMemo(() => new Date(), [])

  const presets = [
    {
      label: "Today",
      action: () => updateParams(today, today),
    },
    {
      label: "Week",
      action: () =>
        updateParams(
          startOfWeek(today, { weekStartsOn: 1 }),
          endOfWeek(today, { weekStartsOn: 1 })
        ),
    },
    {
      label: "Month",
      action: () =>
        updateParams(startOfMonth(today), endOfMonth(today)),
    },
    {
      label: "Clear",
      action: () => updateParams(undefined, undefined),
    },
  ]

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent className="space-y-3">
        {/* Preset Shortcuts */}
        <div className="grid grid-cols-4 gap-2 px-2">
          {presets.map((p) => (
            <Button
              key={p.label}
              size="sm"
              variant="outline"
              onClick={p.action}
            >
              {p.label}
            </Button>
          ))}
        </div>

        {/* Calendar */}
        <Calendar
          mode="range"
          selected={{
            from: selectedFrom,
            to: selectedTo,
          }}
          onSelect={(range) => {
            if (!range?.from) {
              updateParams(undefined, undefined)
              return
            }
            updateParams(range.from, range.to ?? range.from)
          }}
          className="
            [&_[role=gridcell]]:w-[33px]
            [&_[role=gridcell].bg-accent]:bg-sidebar-primary
            [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground
          "
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
