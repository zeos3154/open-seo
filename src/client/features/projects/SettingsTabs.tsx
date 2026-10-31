import { NavTab, NavTabs } from "@/client/components/NavTabs";
import { useT } from "@/client/lib/i18n";

const tabs = [
  { to: "/p/$projectId/settings" as const, label: "General", exact: true },
  { to: "/p/$projectId/settings/integrations" as const, label: "Integrations" },
];

export function SettingsTabs({ projectId }: { projectId: string }) {
  const t = useT();

  return (
    <NavTabs label={t("Project settings sections")}>
      {tabs.map((tab) => (
        <NavTab
          key={tab.to}
          to={tab.to}
          params={{ projectId }}
          activeOptions={{ exact: tab.exact ?? false }}
        >
          {t(tab.label)}
        </NavTab>
      ))}
    </NavTabs>
  );
}
