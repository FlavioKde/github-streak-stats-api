export function mapGitHubCommits(commitsData) {
    if (!commitsData?.commitContributionsByRepository) {
        return [];
    }
    
    return commitsData.commitContributionsByRepository.flatMap(repository => 
      repository.contributions.nodes.map(node => ({
        date: node.occurredAt
      }))
    );
}