export type TAccessToken = {
  access_token: string;
};

export interface ITokens extends TAccessToken {
  refresh_token: string;
}
