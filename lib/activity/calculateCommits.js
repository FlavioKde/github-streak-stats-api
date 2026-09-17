export function calculateCommits(sorted) {
  if (!Array.isArray(sorted) || sorted.length === 0) {
    return {};
  }
  return { count: sorted.length };

}