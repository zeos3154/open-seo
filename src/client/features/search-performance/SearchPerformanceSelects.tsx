import {
  GSC_DEVICES,
  SEARCH_PERFORMANCE_RANGES,
  type SearchPerformanceDateRange,
  type SearchPerformanceDevice,
  type SearchPerformanceSearch,
} from "@/types/schemas/search-performance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import { useT } from "@/client/lib/i18n";

const RANGE_LABELS: Record<SearchPerformanceDateRange, string> = {
  last_7_days: "Last 7 days",
  last_28_days: "Last 28 days",
  last_3_months: "Last 3 months",
};

const DEVICE_LABELS: Record<SearchPerformanceDevice, string> = {
  DESKTOP: "Desktop",
  MOBILE: "Mobile",
  TABLET: "Tablet",
};
// Sentinel for "no filter" in the selects; never written to the URL.
const ALL = "ALL";

function isDateRange(value: string): value is SearchPerformanceDateRange {
  return SEARCH_PERFORMANCE_RANGES.some((option) => option === value);
}

function isDevice(value: string): value is SearchPerformanceDevice {
  return GSC_DEVICES.some((option) => option === value);
}

/** Device, country, and date range selects of the table toolbar. */
export function SearchPerformanceSelects({
  search,
  countries,
  onSearchChange,
}: {
  search: SearchPerformanceSearch;
  countries: { key: string }[];
  onSearchChange: (update: Partial<SearchPerformanceSearch>) => void;
}) {
  const t = useT();
  // Labels translate at render; option values (API enum strings) never change.
  const deviceItems = [
    { value: ALL, label: t("All devices") },
    ...GSC_DEVICES.map((value) => ({
      value,
      label: t(DEVICE_LABELS[value]),
    })),
  ];
  const rangeItems = SEARCH_PERFORMANCE_RANGES.map((value) => ({
    value,
    label: t(RANGE_LABELS[value]),
  }));
  const device = search.device ?? ALL;
  const country = search.country ?? ALL;
  const range = search.range ?? "last_28_days";
  const countryItems = [
    { value: ALL, label: t("All countries") },
    ...(country !== ALL && !countries.some((row) => row.key === country)
      ? [{ value: country, label: country.toUpperCase() }]
      : []),
    ...countries.map((row) => ({
      value: row.key,
      label: row.key.toUpperCase(),
    })),
  ];
  return (
    <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
      <Select
        items={deviceItems}
        value={device}
        onValueChange={(value) => {
          if (value == null) return;
          onSearchChange({
            page: undefined,
            device: isDevice(value) ? value : undefined,
          });
        }}
      >
        <SelectTrigger
          size="sm"
          className="w-36"
          aria-label={t("Device filter")}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {deviceItems.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        items={countryItems}
        value={country}
        onValueChange={(value) => {
          if (value == null) return;
          onSearchChange({
            page: undefined,
            country: value === ALL ? undefined : value,
          });
        }}
      >
        <SelectTrigger
          size="sm"
          className="w-36"
          aria-label={t("Country filter")}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countryItems.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        items={rangeItems}
        value={range}
        onValueChange={(value) => {
          if (value != null && isDateRange(value)) {
            onSearchChange({
              page: undefined,
              range: value,
            });
          }
        }}
      >
        <SelectTrigger size="sm" className="w-36" aria-label={t("Date range")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {rangeItems.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
