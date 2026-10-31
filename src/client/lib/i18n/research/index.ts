import { backlinksMessages } from "./backlinks";
import { domainOverviewMessages } from "./domain";
import { keywordResearchMessages } from "./keywords";
import { savedKeywordsMessages } from "./savedKeywords";
import { researchSharedMessages } from "./shared";

/**
 * Simplified Chinese UI strings for the research features (keyword research,
 * saved keywords, domain overview, backlinks). Keys are the exact English
 * source text rendered by the app; entries missing here fall back to English.
 * Phase-one common keys in the root aggregator take precedence over these.
 */
export const researchMessages: Record<string, string> = {
  ...researchSharedMessages,
  ...keywordResearchMessages,
  ...savedKeywordsMessages,
  ...domainOverviewMessages,
  ...backlinksMessages,
};
