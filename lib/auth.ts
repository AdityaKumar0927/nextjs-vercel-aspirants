import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    callback: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
    postLogoutRedirect: process.env.NEXT_PUBLIC_AUTH0_POST_LOGOUT_REDIRECT_URI
  },
  session: {
    rolling: true,
    rollingDuration: 7200, // 2 hours
    absoluteDuration: 86400 // 24 hours
  },
  secret: process.env.AUTH0_SECRET // Ensure the secret is in the correct place
});
