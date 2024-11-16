export const handleAuth = () => {
  const clientId = "553671";
  const redirectUri = encodeURIComponent(`https://localhost/callback`);
  const state = "Ert2q5Z";
  const authUrl = `https://lk.donstu.ru/WebApp/#/Authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

  window.location.href = authUrl;
};
