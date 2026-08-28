export function mapGitHubCommits(commitsData) {
    if (!commitsData?.commitContributionByRepository) {
        return [];
    }

    return commitsData.commitContributionByRepository.flatMap(repository => 
      repository.contributions.nodes.map(node => ({
        date: node.occurredAt
      }))
    );
}