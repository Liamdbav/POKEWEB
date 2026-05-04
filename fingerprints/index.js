import { frontendFrameworks } from "./frontend-frameworks.js";
import { metaFrameworks } from "./meta-frameworks.js";
import { cssFrameworks } from "./css-frameworks.js";
import { cms } from "./cms.js";
import { hosting } from "./hosting.js";
import { analytics } from "./analytics.js";

export const allFingerprints = [
  ...frontendFrameworks,
  ...metaFrameworks,
  ...cssFrameworks,
  ...cms,
  ...hosting,
  ...analytics,
];
