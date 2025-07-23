import axios, { AxiosProxyConfig } from "axios";
import { Client } from "../src/client";
import type { Options as ClientOptions } from "../src/client";

type Options = {
  proxy?: AxiosProxyConfig,
} & ClientOptions;

export class ClientAxios extends Client {
  proxy?: AxiosProxyConfig;

  constructor({ proxy, ...options }: Options) {
    super(options);
    this.proxy = proxy;
  }

  async request<REQ, RES>(
    method: string,
    url: string,
    requestData?: REQ,
  ): Promise<RES> {
    const response = await axios.request<RES>({
      method,
      url,
      data: requestData,
      headers: {
        'x-api-key': this.apiKey,
      },
    });
    const { data: responseData } = response;
    return responseData;
  }
}
