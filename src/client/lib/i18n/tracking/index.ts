import { aiSearchMessages } from "./ai-search";
import { aiVisibilityMessages } from "./ai-visibility";
import { localSeoMessages } from "./local-seo";
import { rankTrackingMessages } from "./rank-tracking";

export const trackingMessages: Record<string, string> = {
  ...rankTrackingMessages,
  ...localSeoMessages,
  ...aiVisibilityMessages,
  ...aiSearchMessages,
};
