/*
    add types to var declarations and function arguments/ return values
*/

namespace solution1 {
  const githubUrl: 'https://www.github.com' = 'https://www.github.com';

  const frameworks: string[] = ['reactjs', 'knockoutjs', 'vuejs'];

  const repos: {name: string, stars: number, approved: boolean}[] = [
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

  const starSum = (repos: {name: string, stars: number, approved: boolean}[]): number => {
    return repos.reduce((acc: number, repo: {name: string, stars: number, approved: boolean}): number => {
      return acc + repo.stars;
    }, 0);
  };

  const approvedRepo: {name: string, stars: number, approved: boolean} | undefined = repos.find((repo: {name: string, stars: number, approved: boolean}): boolean => repo.approved);
}


