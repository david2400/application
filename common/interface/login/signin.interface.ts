export interface JwtSign {
  access_token: string
  refresh_token: string
}

export interface JwtPayload {
  sub: number
  username: string
  roles: any[]
}

export interface Payload {
  userId: string
  username: string
  roles: string[]
}
