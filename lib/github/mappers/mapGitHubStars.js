export function mapGitHubStars(starsData) {
    if (!starsData?.nodes) {
        return [];
    }

    return starsData.nodes.map(node => ({
        date: node.createdAt,
        
    }));
}