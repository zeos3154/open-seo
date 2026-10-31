import { Languages } from "lucide-react";
import { SegmentedToggle } from "@/client/components/SegmentedToggle";
import {
  LOCALE_OPTIONS,
  setLocale,
  useLocale,
  type Locale,
} from "@/client/lib/i18n";

/** English / 简体中文 segmented radio, styled like the theme radio. */
export function LanguagePreferenceRadio() {
  const locale = useLocale();

  return (
    <SegmentedToggle<Locale>
      showLabels
      items={LOCALE_OPTIONS.map(({ value, label }) => ({
        value,
        label,
        icon: <Languages />,
      }))}
      value={locale}
      onChange={setLocale}
    />
  );
}
