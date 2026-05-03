export interface ProcessedTopic<T extends string = string> {
  id: number;
  label: string;
  icon: string;
  value: T;
}

/**
 * Converts controlled topics from JSON metadata into formatted topic objects
 * with id, label, icon, and value properties.
 *
 * @param controlledTopics - Array of topic strings from practice-questions.normalized.json
 * @returns Array of ProcessedTopic objects ready for UI rendering
 */
export function processControlledTopics<T extends string>(
  controlledTopics: readonly T[],
): ProcessedTopic<T>[] {
  const iconMap: Record<string, string> = {
    baits: "fingerprint",
    traceability: "tracking_list",
    diseases: "virus_alert",
    "foot-and-mouth-disease": "coronavirus",
    pharmacology: "medication",
    "drug-administration": "syringe",
    biosecurity: "shield",
    "border-control": "border_color",
    ethics: "gavel",
  };

  return controlledTopics.map((topic, index) => ({
    id: index + 1,
    label: formatTopicLabel(topic),
    icon: iconMap[topic] || "help",
    value: topic,
  }));
}

/**
 * Converts kebab-case topic strings to Title Case labels
 *
 * @param topic - Topic string in kebab-case format
 * @returns Formatted label for display
 */
export function formatTopicLabel(topic: string): string {
  const abbreviations: Record<string, string> = {
    woah: "WOAH",
    baits: "BAITS",
  };

  if (abbreviations[topic]) {
    return abbreviations[topic];
  }

  return topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
