namespace exercise2 {
  /*
      add a type alias for a single Repo
  */

  const repos = [
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

  const starSum = (repos) => {
    return repos.reduce((acc, repo) => {
      return acc + repo.stars;
    }, 0);
  };

  const approvedRepo = repos.find((repo) => repo.approved);

  const allowedUsers = repos.filter((repo) => repo.userType === 'admin_user');
}

