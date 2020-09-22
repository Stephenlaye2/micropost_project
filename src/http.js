/**
 * EasyHTTP Library
 * Library for making HTTP Request
 *
 * @version 1.0
 * @author Ayebogbon Stephen Orowole
 * @license MIT
 *
 */

class EasyHTTP {
  //  make an HTTP get request

  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();

    return resData;
  }

  // make an HTTP post request

  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    return resData;
  }

  // Make a put HTTP request

  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    return resData;
  }

  // Make an HTTP DELETE request

  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });

    const resData = await response.json();

    return resData;
  }
}

export const http = new EasyHTTP();
