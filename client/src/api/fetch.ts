const BASE_URL = "http://localhost:4000/api";

enum Methods {
  POST = "POST",
  GET = "GET",
  UPDATE = "PUT",
  DELETE = "DELETE",
}

const fetchApi = async (method: string, path: string, body?: object) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body && JSON.stringify(body),
    });
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw Error("Could not fetch the data");
    }
  }
};

export const post = (body: object, path: string) => {
  return fetchApi(Methods.POST, path, body);
};

export const get = (path: string) => {
  return fetchApi(Methods.GET, path);
};

export const update = (body: object, path: string) => {
  return fetchApi(Methods.UPDATE, path, body);
};

// 'delete' is not allowed as a variable declaration name.ts(1389)
export const deleteItem = (path: string) => {
  return fetchApi(Methods.DELETE, path);
};
