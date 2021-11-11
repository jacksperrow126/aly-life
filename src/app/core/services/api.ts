const isDev = false;
export const backEndUrl = isDev
  ? 'http://localhost:1260'
  : 'https://life-backend-annguyen.herokuapp.com';

export const apiRoutes = {
  money: {
    backUp: '/money/backUp',
    getWallets: '/money/getWallets',
  },
  user: {
    login: '/user/login',
    create: '/user/create',
  },
};
