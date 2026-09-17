export function calculateIssues(issues) {
    if (!Array.isArray(issues) || issues.length === 0) {
        return {};
    }
    return { count: issues.length };
}