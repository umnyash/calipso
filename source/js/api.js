export async function sendData(url, body, onSuccess = () => {}, onFail = () => {}, onFinally = () => {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body,
    });
    if (!response.ok) {
      throw new Error(`${response.status} – ${response.statusText}`);
    }
    // const data = await response.json();
    onSuccess();
  } catch {
    onFail();
  } finally {
    onFinally();
  }
}

export async function getData(url, onSuccess = () => {}, onFail = () => {}, onFinally = () => {}) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} – ${response.statusText}`);
    }
    // const data = await response.json();
    onSuccess();
  } catch {
    onFail();
  } finally {
    onFinally();
  }
}
