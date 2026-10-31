import { createColumnHelper } from "@tanstack/react-table";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import {
  DataTable,
  useDataTable,
  type DataTableFrameProps,
} from "@/client/components/table/DataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { HelpLabel } from "@/client/components/HelpLabel";
import type { TopPageRow } from "./backlinksPageTypes";
import { useT } from "@/client/lib/i18n";
import type { TopPagesSortField } from "@/types/schemas/backlinks";
import { formatNumber } from "./backlinksPageUtils";
import { useMemo } from "react";

const columnHelper = createColumnHelper<TopPageRow>();

// Column ids map to server-side sort fields; sorting re-queries DataForSEO
// across all pages, not just the loaded page of results.
function buildColumns(t: ReturnType<typeof useT>) {
  return [
    columnHelper.accessor("page", {
      id: "page",
      enableSorting: false,
      meta: { cellClassName: "min-w-80" },
      header: () => (
        <HelpLabel
          label={t("Page")}
          helpText={t("Page on the target site receiving backlinks.")}
        />
      ),
      cell: ({ getValue }) => {
        const page = getValue();
        return page ? (
          <SafeExternalLink
            url={page}
            label={page}
            className="inline-flex items-center gap-1 break-all underline-offset-4 hover:underline"
          />
        ) : (
          "-"
        );
      },
    }),
    columnHelper.accessor("backlinks", {
      id: "backlinks" satisfies TopPagesSortField,
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Backlinks")}
          helpText={t("Total backlinks pointing to this page.")}
        />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      sortDescFirst: true,
    }),
    columnHelper.accessor("referringDomains", {
      id: "referringDomains" satisfies TopPagesSortField,
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Referring Domains")}
          helpText={t("Unique domains linking to this page.")}
        />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      sortDescFirst: true,
    }),
    columnHelper.accessor("rank", {
      id: "rank" satisfies TopPagesSortField,
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Rank")}
          helpText={t("Authority score for this target page.")}
        />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      sortDescFirst: true,
    }),
    columnHelper.accessor("brokenBacklinks", {
      id: "brokenBacklinks" satisfies TopPagesSortField,
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Broken Backlinks")}
          helpText={t("Backlinks pointing here that are currently broken.")}
        />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      sortDescFirst: true,
    }),
  ];
}

export function TopPagesTable({
  rows,
  sorting,
  onSortingChange,
  ...frame
}: DataTableFrameProps & {
  rows: TopPageRow[];
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
}) {
  const t = useT();
  const columns = useMemo(() => buildColumns(t), [t]);
  const table = useDataTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange,
    manualSorting: true,
  });

  return (
    <DataTable
      table={table}
      empty={{ title: t("No top pages found for this target.") }}
      {...frame}
    />
  );
}
