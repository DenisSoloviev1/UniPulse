export const handleAuth = () => {
  const clientId = "535684";
  const redirectUri = encodeURIComponent(`https://localhost/callback`);
  const state = "Ert2q5Z";
  const authUrl = `https://lk.donstu.ru/WebApp/#/Authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

  window.open(authUrl, "_blank", "width=500,height=600");
};
