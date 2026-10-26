// Docusaurus's MDX components, plus Falken's Lab's own, usable in any page without an import
// (src/theme/MDXComponents.tsx).
import MDXComponents from "@theme-original/MDXComponents";
import Prompt from "@site/src/components/Prompt";
import Terminal from "@site/src/components/Terminal";

export default { ...MDXComponents, Prompt, Terminal };
