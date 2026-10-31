import { auditIssueMessages } from "./audit-issue-messages";
import { auditMessages } from "./audit-messages";
import { dashboardMessages } from "./dashboard-messages";
import { errorMessageMessages } from "./error-message-messages";
import { integrationMessages } from "./integration-messages";
import { lighthouseMessages } from "./lighthouse-messages";
import { searchPerformanceMessages } from "./search-performance-messages";
import { sharedControlMessages } from "./shared-control-messages";
import { workspaceMessages } from "./workspace-messages";

/**
 * Simplified Chinese strings for the workbench slice: site audit (including
 * the issue descriptor copy), Lighthouse, dashboard, Search Console /
 * search performance, integrations, settings, reports, project context,
 * agent setup and the shared table/export controls. Keys are the exact
 * English source text; missing entries fall back to English.
 */
export const workbenchMessages: Record<string, string> = {
  ...auditIssueMessages,
  ...auditMessages,
  ...lighthouseMessages,
  ...searchPerformanceMessages,
  ...dashboardMessages,
  ...sharedControlMessages,
  ...errorMessageMessages,
  ...integrationMessages,
  ...workspaceMessages,
};
