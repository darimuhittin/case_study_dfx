export interface CompanyType {
  name: string
  catchPhrase: string
  bs: string
}

export interface GeoType {
  lat: string
  lng: string
}

export interface AddressType {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: GeoType
}

export interface UserType {
  id: number
  name: string
  email: string
  phone: string
  username: string
  website: string
  address: AddressType
  company: CompanyType
}
