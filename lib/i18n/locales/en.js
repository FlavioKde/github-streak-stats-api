export default {
  labels: {
    'title': 'GitHub Streak Stats',
    'currentStreak': 'Current',
    'longestStreak': 'Longest',
    'totalContributions': 'Total'
  },
  languagesLabels: {
    'languagesTitle': 'GitHub Language Stats',
    'totalLanguages': 'Total Languages',
    'totalBytes': 'Total Bytes',
    'languages': 'Languages'
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