export function mapGitHubPrs(prsData) {
    if (!prsData?.nodes) {
        return [];
    }

    return prsData.nodes.map(node => ({
        
        date: node.createdAt,
        
    }));
}