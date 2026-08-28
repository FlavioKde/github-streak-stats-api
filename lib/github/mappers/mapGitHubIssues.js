export function mapGitHubIssues(issuesData) {
    if (!issuesData?.nodes) {
        return [];
    }

    return issuesData.nodes.map(node => ({
        date: node.createdAt
    }));
}