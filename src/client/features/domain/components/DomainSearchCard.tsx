import type { FormEvent } from "react";
import { useMemo } from "react";
import { useStore } from "@tanstack/react-form";
import { getFieldError } from "@/client/lib/forms";
import type { DomainOverviewControlsForm } from "@/client/features/domain/DomainOverviewPage";
import { toSortMode } from "@/client/features/domain/utils";
import type { DomainSortMode } from "@/client/features/domain/types";
import { LABS_LOCATION_OPTIONS } from "@/client/features/keywords/locations";
import { LocationSelect } from "@/client/components/LocationSelect";
import { ResearchScopeSelect } from "@/client/components/ResearchScopeSelect";
import { SearchCard, SearchInput } from "@/client/components/SearchCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/components/ui/select";
import type { ResearchScope } from "@/shared/researchScope";
import { useT } from "@/client/lib/i18n";

const SORT_ITEMS: { value: DomainSortMode; label: string }[] = [
  { value: "rank", label: "By Rank" },
  { value: "traffic", label: "By Traffic" },
  { value: "volume", label: "By Volume" },
  { value: "score", label: "By Score" },
  { value: "cpc", label: "By CPC" },
];

type Props = {
  controlsForm: DomainOverviewControlsForm;
  isLoading: boolean;
  onSubmit: (event: FormEvent) => void;
  onDomainChange: (domain: string) => void;
  onScopeChange: (scope: ResearchScope) => void;
  onSortChange: (sort: DomainSortMode) => void;
  onLocationChange: (locationCode: number) => void;
};

export function DomainSearchCard({
  controlsForm,
  isLoading,
  onSubmit,
  onDomainChange,
  onScopeChange,
  onSortChange,
  onLocationChange,
}: Props) {
  const domainError = useStore(controlsForm.store, (state) =>
    getFieldError(state.fieldMeta.domain?.errors ?? []),
  );
  const t = useT();
  const sortItems = useMemo(
    () => SORT_ITEMS.map((item) => ({ ...item, label: t(item.label) })),
    [t],
  );

  return (
    <SearchCard
      onSubmit={onSubmit}
      pending={isLoading}
      error={domainError ? t(domainError) : null}
      errorId="domain-input-error"
    >
      <controlsForm.Field name="domain">
        {(field) => (
          <SearchInput
            placeholder={t("Enter a domain or URL")}
            aria-label={t("Domain or URL")}
            value={field.state.value}
            onChange={(event) => {
              field.handleChange(event.target.value);
              onDomainChange(event.target.value);
            }}
            aria-invalid={domainError ? true : undefined}
            aria-describedby={domainError ? "domain-input-error" : undefined}
          />
        )}
      </controlsForm.Field>

      <controlsForm.Field name="scope">
        {(field) => (
          <ResearchScopeSelect
            value={field.state.value}
            className="w-full lg:w-40"
            onChange={(scope) => {
              field.handleChange(scope);
              onScopeChange(scope);
            }}
          />
        )}
      </controlsForm.Field>

      <controlsForm.Field name="locationCode">
        {(field) => (
          <LocationSelect
            value={field.state.value}
            options={LABS_LOCATION_OPTIONS}
            className="w-full lg:w-44 lg:shrink-0"
            onChange={(code) => {
              field.handleChange(code);
              onLocationChange(code);
            }}
          />
        )}
      </controlsForm.Field>

      <controlsForm.Field name="sort">
        {(field) => (
          <Select
            items={sortItems}
            value={field.state.value}
            onValueChange={(value) => {
              const next = toSortMode(value ?? "") ?? "traffic";
              field.handleChange(next);
              onSortChange(next);
            }}
          >
            <SelectTrigger
              aria-label={t("Sort keywords")}
              className="w-full shrink-0 lg:w-36"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </controlsForm.Field>
    </SearchCard>
  );
}
