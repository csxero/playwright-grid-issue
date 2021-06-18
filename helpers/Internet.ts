import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { TestInfo } from "./testingInfo";

class Internet {
  /**
   * Delete request using axios
   * @param url
   * @param headers
   */
  async delete(url: string): Promise<AxiosResponse> {
    axiosRetry(axios, { retries: 3 });
    let response: AxiosResponse;
    try {
      response = await axios({
        method: "DELETE",
        url,
        timeout: 30000,
        headers: TestInfo.DEFAULT_HEADERS,
      });
    } catch (error) {
      throw new Error(`${error} - DELETE Method -  ${url}`);
    }
    return response;
  }

  /**
   * Delete request using axios
   * @param url
   * @param headers
   */
  async get(url: string): Promise<AxiosResponse> {
    axiosRetry(axios, { retries: 3 });
    let response: AxiosResponse;
    try {
      response = await axios({
        method: "GET",
        url,
        timeout: 30000,
        headers: TestInfo.DEFAULT_HEADERS,
      });
    } catch (error) {
      throw new Error(`${error} - GET Method -  ${url}`);
    }
    return response;
  }

  /**
   * Post request using axios
   * @param url
   * @param data
   * @param headers
   */
  async post(url: string, data: any): Promise<AxiosResponse> {
    axiosRetry(axios, { retries: 3 });
    let response: AxiosResponse;
    try {
      response = await axios({
        method: "POST",
        url,
        data: JSON.stringify(data),
        timeout: 30000,
        headers: TestInfo.DEFAULT_HEADERS,
      });
    } catch (error) {
      throw new Error(`${error} - POST Method -  ${url}`);
    }
    return response;
  }
}

export default new Internet();
