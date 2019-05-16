
namespace solution2 {
  type AdminUser = 'admin_user';
  type ReadonlyUser = 'readonly_user';

  type User = AdminUser | ReadonlyUser;

  type Repo = {
    name: string
    stars: number
    approved: boolean
    userType: User
  }

  const repos: Repo[] = [
    {
      name: 'vuejs',
      stars: 2000,
      approved: true,
      userType: 'admin_user',
    },

    {
      name: 'reactjs',
      stars: 1999,
      approved: false,
      userType: 'readonly_user',
    }
  ];

  const starSum = (repos: Repo[]): number => {
    return repos.reduce((acc: number, repo: Repo): number => {
      return acc + repo.stars;
    }, 0);
  };

  const approvedRepo: Repo | undefined = repos.find((repo: Repo): boolean => repo.approved);

  const allowedUsers = repos.filter((repo: Repo) => repo.userType === 'admin_user');
}

