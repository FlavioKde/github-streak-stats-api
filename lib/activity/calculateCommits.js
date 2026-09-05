export function calculateCommits(sorted) {
  if (!Array.isArray(sorted) || sorted.length === 0) {
    return 0;
  }
  return sorted.length;

}