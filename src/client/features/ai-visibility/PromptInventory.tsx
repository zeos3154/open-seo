import { useState } from "react";
import { cn } from "cn";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  AI_ENGINE_LABELS,
  aiNoAnswerLabel,
  type AiEngine,
  type AiObservationRow,
  type AiPrompt,
} from "@/shared/ai-visibility";
import { ConfirmDialog } from "@/client/components/ConfirmDialog";
import { Button } from "@/client/components/ui/button";
import { Spinner } from "@/client/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { useT } from "@/client/lib/i18n";
import { PromptRate, promptHasResults } from "./PromptInventoryParts";
import { EngineLabel } from "./EngineLabel";
import { PromptActionsMenu } from "./PromptActions";
import { RenameTopicDialog } from "./RenameTopicDialog";
import type { AiTrackerPatch } from "@/types/schemas/ai-visibility";

export { promptHasResults } from "./PromptInventoryParts";

export function PromptInventory({
  projectId,
  prompts,
  topics,
  search,
  engines,
  rows,
  loading,
  scheduled,
  pending,
  onEdit,
  onReduce,
  onReview,
}: {
  projectId: string;
  /** Unarchived prompts; topic pause and archive act on all of them. */
  prompts: AiPrompt[];
  topics: string[];
  search: string;
  engines: AiEngine[];
  rows: AiObservationRow[] | undefined;
  /** The run's answers are still loading; prompts show before their rates. */
  loading: boolean;
  /** Whether the tracker has a schedule; pausing only skips scheduled runs. */
  scheduled: boolean;
  pending: boolean;
  onEdit: (prompt: AiPrompt) => void;
  /** Saves with no cost review: pause, archive and topic changes add no answers. */
  onReduce: (patch: AiTrackerPatch) => void;
  onReview: (patch: AiTrackerPatch) => void;
}) {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const t = useT();
  const [archiving, setArchiving] = useState<{
    kind: "prompt" | "topic";
    name: string;
    promptIds: string[];
  } | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const matches = (prompt: AiPrompt) =>
    !search ||
    prompt.text.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  if (!prompts.some(matches))
    return (
      <p className="p-8 text-center text-sm text-muted-foreground">
        {t("No matching prompts. Add prompts or adjust your search.")}
      </p>
    );
  return (
    <>
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">{t("Prompts by topic")}</TableHead>
            <TableHead>{t("Engines")}</TableHead>
            <TableHead>{t("Brand mentions")}</TableHead>
            <TableHead>{t("Owned citations")}</TableHead>
            <TableHead>
              <span className="sr-only">{t("Manage tracking")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        {topics.map((topic) => {
          const topicPrompts = prompts.filter(
            (prompt) => prompt.topic === topic,
          );
          const shownPrompts = topicPrompts.filter(matches);
          if (!shownPrompts.length) return null;
          const paused = topicPrompts.every((prompt) => prompt.paused);
          const topicRows = rows?.filter((row) =>
            shownPrompts.some((prompt) => prompt.id === row.promptId),
          );
          const open = !collapsed.includes(topic);
          return (
            <TableBody key={topic}>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableCell colSpan={2} className="py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex h-auto items-center justify-start gap-2 px-0 text-left hover:bg-transparent aria-expanded:bg-transparent"
                    aria-expanded={open}
                    onClick={() =>
                      setCollapsed((names) =>
                        open
                          ? [...names, topic]
                          : names.filter((name) => name !== topic),
                      )
                    }
                  >
                    {open ? <ChevronDown /> : <ChevronRight />}
                    <span className="inline-flex items-center gap-2">
                      {topic}
                      <span className="text-xs font-normal text-muted-foreground">
                        {t("{count} prompts", {
                          count: shownPrompts.length,
                        })}
                        {paused ? t(" · Paused") : ""}
                      </span>
                    </span>
                  </Button>
                </TableCell>
                <TableCell>
                  <PromptRate
                    rows={topicRows}
                    kind="mentioned"
                    loading={loading}
                  />
                </TableCell>
                <TableCell>
                  <PromptRate rows={topicRows} kind="cited" loading={loading} />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <PromptActionsMenu
                      label={t("Actions for topic {name}", { name: topic })}
                      kind="topic"
                      paused={paused}
                      scheduled={scheduled}
                      pending={pending}
                      onEdit={() => setRenaming(topic)}
                      onTogglePause={() => {
                        const patch = {
                          prompts: topicPrompts.map((prompt) => ({
                            id: prompt.id,
                            text: prompt.text,
                            paused: !paused,
                          })),
                        };
                        if (paused) onReview(patch);
                        else onReduce(patch);
                      }}
                      onArchive={() =>
                        setArchiving({
                          kind: "topic",
                          name: topic,
                          promptIds: topicPrompts.map((prompt) => prompt.id),
                        })
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
              {open &&
                shownPrompts.map((prompt) => {
                  const promptRows = rows?.filter(
                    (row) => row.promptId === prompt.id,
                  );
                  const ready = promptHasResults(prompt, rows);
                  const running =
                    !ready &&
                    !!promptRows?.some((row) => row.status === "pending");
                  // Without answers there is nothing to inspect yet, so the
                  // prompt and its result cells are grayed out.
                  const dim = ready ? undefined : "opacity-60";
                  return (
                    <TableRow key={prompt.id}>
                      <TableCell
                        className={cn("min-w-72 py-4 pl-10 first:pl-10", dim)}
                      >
                        {ready ? (
                          <Link
                            to="/p/$projectId/ai-visibility/prompts/$promptId"
                            params={{ projectId, promptId: prompt.id }}
                            className="whitespace-pre-wrap text-sm font-medium underline-offset-4 hover:text-primary hover:underline"
                            data-ph-mask
                          >
                            {prompt.text}
                          </Link>
                        ) : (
                          <span
                            className="whitespace-pre-wrap text-sm font-medium text-muted-foreground"
                            data-ph-mask
                          >
                            {prompt.text}
                          </span>
                        )}
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          {running && <Spinner className="size-3" />}
                          {running
                            ? t("Collecting answers")
                            : prompt.paused
                              ? t("Paused")
                              : t("Active")}{" "}
                          · {prompt.branded ? t("Branded") : t("Non-branded")}
                        </p>
                      </TableCell>
                      <TableCell className={dim}>
                        <div className="flex min-w-64 items-center gap-3">
                          {engines.map((engine) => (
                            <EngineResult
                              key={engine}
                              engine={engine}
                              row={promptRows?.find(
                                (row) => row.engine === engine,
                              )}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className={dim}>
                        <PromptRate
                          rows={promptRows}
                          kind="mentioned"
                          loading={loading}
                        />
                      </TableCell>
                      <TableCell className={dim}>
                        <PromptRate
                          rows={promptRows}
                          kind="cited"
                          loading={loading}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <PromptActionsMenu
                            label={t("Actions for {name}", {
                              name: prompt.text,
                            })}
                            kind="prompt"
                            paused={prompt.paused}
                            scheduled={scheduled}
                            pending={pending}
                            onEdit={() => onEdit(prompt)}
                            onTogglePause={() => {
                              const patch = {
                                prompts: [
                                  {
                                    id: prompt.id,
                                    text: prompt.text,
                                    paused: !prompt.paused,
                                  },
                                ],
                              };
                              if (prompt.paused) onReview(patch);
                              else onReduce(patch);
                            }}
                            onArchive={() =>
                              setArchiving({
                                kind: "prompt",
                                name: prompt.text,
                                promptIds: [prompt.id],
                              })
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          );
        })}
      </Table>
      {renaming && (
        <RenameTopicDialog
          topic={renaming}
          onClose={() => setRenaming(null)}
          onRename={(name) => {
            // A topic is the name its prompts share, so renaming moves them.
            onReduce({
              prompts: prompts
                .filter((prompt) => prompt.topic === renaming)
                .map((prompt) => ({
                  id: prompt.id,
                  text: prompt.text,
                  topic: name,
                })),
            });
            setRenaming(null);
          }}
        />
      )}
      {archiving && (
        <ConfirmDialog
          title={t("Archive {kind}?", {
            kind: archiving.kind === "topic" ? t("topic") : t("prompt"),
          })}
          confirmLabel={t("Archive")}
          destructive
          onConfirm={() => {
            onReduce({ archivePromptIds: archiving.promptIds });
            setArchiving(null);
          }}
          onClose={() => setArchiving(null)}
        >
          {archiving.kind === "topic"
            ? t('This stops tracking every prompt in "{name}".', {
                name: archiving.name,
              })
            : t('This stops tracking "{name}".', { name: archiving.name })}{" "}
          {t(
            "You can't view archived prompts yet. Their answer history is kept and returns if you add the same prompt again.",
          )}
        </ConfirmDialog>
      )}
    </>
  );
}

function EngineResult({
  engine,
  row,
}: {
  engine: AiEngine;
  row: AiObservationRow | undefined;
}) {
  const t = useT();
  const own = row?.brands.find((brand) => brand.own);
  const result = !row
    ? t("No result available")
    : row.status === "failed"
      ? t("Failed")
      : row.status === "pending"
        ? t("Running")
        : row.answerStatus === "no_answer"
          ? t(aiNoAnswerLabel(engine))
          : row.answerStatus !== "answered"
            ? t("Answer unavailable")
            : own?.mentioned
              ? t("Mentioned")
              : t("Not mentioned");
  return (
    <span
      title={`${AI_ENGINE_LABELS[engine]}: ${result}`}
      className={`inline-flex h-6 items-center text-xs ${result === t("Mentioned") ? "text-success" : result === t("Failed") ? "text-destructive" : "text-muted-foreground"}`}
    >
      <EngineLabel engine={engine} />
    </span>
  );
}
