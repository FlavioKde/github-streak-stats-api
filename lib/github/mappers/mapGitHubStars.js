export function mapGitHubStars(starsData) {
    if (!starsData?.nodes) {
        return 0;
    }

    return starsData.nodes.reduce((total, repository) => total + repository.stargazerCount, 0);
    };
