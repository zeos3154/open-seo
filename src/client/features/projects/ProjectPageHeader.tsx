import { useQuery } from "@tanstack/react-query";
import { BackLink, PageHeader } from "@/client/components/PageHeader";
import { useT } from "@/client/lib/i18n";
import { projectsQueryOptions } from "./projectQueries";

export function ProjectPageHeader({
  projectId,
  title,
  showBackLink = false,
}: {
  projectId: string;
  title: string;
  showBackLink?: boolean;
}) {
  const projectsQuery = useQuery(projectsQueryOptions());
  const t = useT();
  const project = projectsQuery.data?.find((entry) => entry.id === projectId);

  return (
    <PageHeader
      title={title}
      description={project?.name ?? " "}
      backLink={
        showBackLink ? (
          <BackLink to="/projects">{t("Projects")}</BackLink>
        ) : undefined
      }
    />
  );
}
