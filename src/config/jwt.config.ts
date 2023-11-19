/* eslint-disable prettier/prettier */
export const jwtConstants = {
    secret: 'your-secret-key',
  };

  export const jwtOptions = {
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '50h',
     
    },
  };