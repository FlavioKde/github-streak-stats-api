

export function calculateActivity(activity) {
    if (!activity) {
        return {
            commits: null,
            pullRequests: null,
            issues: null,
            stars: 0,
            contributions: null
        };
    }
};