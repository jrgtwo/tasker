export type User = {
  date :string,
  email: string
  fname: string,
  id: string | number,
  lastlogin: string,
  lname:  string,
  userId: string,
  picture: string
}

export type GoogleLoginData = {
  sub: string, 
  given_name: string, 
  family_name: string, 
  email: string, 
  picture: string
}