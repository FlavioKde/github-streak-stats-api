export const getUserContributionQuery = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        createdAt
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

export const getUserCreatedAtQuery = `
    query($username: String!) {
      user(login: $username) {
        createdAt
      }
    }
  `;

  export const getUserLanguagesQuery = `
  query($username: String!) {
    user(login: $username) {
      repositories(
        first: 100
        ownerAffiliations: [OWNER]
        isFork: false
        privacy: PUBLIC
        orderBy: {
          field: UPDATED_AT
          direction: DESC
        }
      ) {
        nodes {
          name

          languages(first: 10) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

export const getUserActivityQuery = `
  query($username: String!) {
    user(login: $username) {

    # commits
      commits: contributionsCollection {
          commitContributionsByRepository {
            contributions(first: 100) {
              nodes {
                occurredAt
                }
              } 
            }
          }
    # pull requests
      pullRequests: pullRequests(first: 100) {          
              nodes {
                createdAt           
            }
          }
    # issues
      issues: issues(first: 100) {           
              nodes {
                createdAt            
            }
          }
    # stars
      stars: starredRepositories(first: 100){
            nodes {         
                createdAt 
            }
         }   
    # contributions
      contributions: contributionsCollection {
            contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
`;