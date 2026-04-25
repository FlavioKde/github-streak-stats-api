export default {
  labels: {
    'title': 'GitHub Streak Stats',
    'currentStreak': 'Current',
    'longestStreak': 'Longest',
    'totalContributions': 'Total'
  },
  errors: {
    ConfigurationError:
      "GitHub token is not configured. Please set the GITHUB_TOKEN environment variable.",

    GithubApiError:
      "GitHub API request failed.",

    NotFoundError:
      "GitHub user not found.",

    ValidationError:
      "Username is required to fetch GitHub contributions.",

    UnknownError:
      "Unexpected error."
  }
  };