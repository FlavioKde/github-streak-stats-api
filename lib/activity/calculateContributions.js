export function calculateContributions(contributions) {
    if (!contributions || contributions.length === 0) {
        return {};
    }   

    let totalContributions = 0;

    for( const day of contributions) {
        totalContributions += day.contributionCount;
    }

    return { count: totalContributions };
}

