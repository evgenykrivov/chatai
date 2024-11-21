export type JWTPayload = {
  sub: number;
  email: string;
  role: string;
};

export type JWTPayloadCWithUserId = Omit<JWTPayload, 'sub'> & {
  userId: number;
};

export type JWTPayloadKeys = keyof JWTPayloadCWithUserId;
