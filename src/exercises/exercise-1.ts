/*
    add types to var declarations and function arguments return values
*/

namespace exercise1 {
  const githubUrl = 'https://www.github.com';

  const frameworks = ['reactjs', 'knockoutjs', 'vuejs'];

  const repos = [
    {
      name: 'vuejs',
      stars: 2000,
      approved: true,
    },

    {
      name: 'reactjs',
      stars: 1999,
      approved: false,
    }
  ];

  const starSum = (repos) => {
    return repos.reduce((acc, repo) => {
      return acc + repo.stars;
    }, 0);
  };

  const approvedRepo = repos.find((repo): boolean => repo.approved);
}


