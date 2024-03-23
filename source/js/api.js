export const sendData = async (url, body, onSuccess, onFail, onFinally) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body,
    });
    if (!response.ok) {
      throw new Error(`${response.status} – ${response.statusText}`);
    }
    onSuccess(response);
  } catch {
    onFail();
  } finally {
    onFinally();
  }
};
