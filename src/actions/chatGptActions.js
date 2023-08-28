const promptAction = async ({ selection, currentSelection }) => {
  const method = "POST";
  const headers = { "Content-Type": "application/json" };
  const url = `${import.meta.env.VITE_BFF_CHATGPT_URL}/text`;

  const prompt = `${selection}: ${currentSelection}`;
  const body = JSON.stringify({ prompt });
  return await (await fetch(url, { method, headers, body })).json();
};

export { promptAction };
