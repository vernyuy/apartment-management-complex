export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
};

export type AddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  streetAddress: Scalars['String']['input'];
};

export type Apartment = {
  __typename?: 'Apartment';
  apartmentNumber: Scalars['String']['output'];
  apartmentStatus: ApartmentStatus;
  apartmentType: ApartmentType;
  building: Building;
  caretaker: User;
  createdOn: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  kitchen: Scalars['Boolean']['output'];
  numberOfRooms: Scalars['Int']['output'];
  tenant: User;
};

export type ApartmentInput = {
  apartmentNumber: Scalars['String']['input'];
  apartmentStatus: ApartmentStatus;
  apartmentType: ApartmentType;
  buildingId: Scalars['String']['input'];
  kitchen: Scalars['Boolean']['input'];
  numberOfRooms: Scalars['Int']['input'];
};

export enum ApartmentStatus {
  Occupied = 'OCCUPIED',
  Vacant = 'VACANT'
}

export enum ApartmentType {
  DoubleRoom = 'DOUBLE_ROOM',
  SingleRoom = 'SINGLE_ROOM',
  Villa = 'VILLA'
}

export type Booking = {
  __typename?: 'Booking';
  apartmentId: Scalars['String']['output'];
  bookingStatus: BookingStatus;
  createdOn: Scalars['AWSDateTime']['output'];
  endDate: Scalars['AWSDate']['output'];
  id: Scalars['ID']['output'];
  startDate: Scalars['AWSDate']['output'];
  updateOn: Scalars['AWSDateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export enum BookingStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING'
}

export type Building = {
  __typename?: 'Building';
  address: Address;
  apartments?: Maybe<Array<Apartment>>;
  createdOn: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  numberOfApartments: Scalars['Int']['output'];
  updateOn: Scalars['AWSDateTime']['output'];
  userId: Scalars['String']['output'];
};

export type BuildingInput = {
  address: AddressInput;
  name: Scalars['String']['input'];
  numberOfApartments: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type CreateBookingInput = {
  apartmentId: Scalars['String']['input'];
  bookingStatus: BookingStatus;
  endDate: Scalars['AWSDate']['input'];
  startDate: Scalars['AWSDate']['input'];
  userId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApartment: Apartment;
  createApartmentBooking: Scalars['Boolean']['output'];
  createBuilding: Building;
  createUserAccount: User;
  deleteUserAccount: Scalars['Boolean']['output'];
  updateUserAccount: User;
};


export type MutationCreateApartmentArgs = {
  input?: InputMaybe<ApartmentInput>;
};


export type MutationCreateApartmentBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateBuildingArgs = {
  input: BuildingInput;
};


export type MutationCreateUserAccountArgs = {
  input: UserInput;
};


export type MutationDeleteUserAccountArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserAccountArgs = {
  input: UpdateUserInput;
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllBookingsPerApartment: Array<Booking>;
  getAllUserAccounts: UsersResult;
  getUserAccount: User;
};


export type QueryGetAllBookingsPerApartmentArgs = {
  apartmentId: Scalars['String']['input'];
};


export type QueryGetAllUserAccountsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGetUserAccountArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userType: UserType;
  verified: Scalars['Boolean']['input'];
};

export type User = {
  __typename?: 'User';
  createdOn: Scalars['AWSDateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  updatedOn?: Maybe<Scalars['AWSDateTime']['output']>;
  userType: UserType;
  verified: Scalars['Boolean']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userType: UserType;
  verified: Scalars['Boolean']['input'];
};

export enum UserType {
  Admin = 'ADMIN',
  Caretaker = 'CARETAKER',
  Tenant = 'TENANT'
}

export type UsersResult = {
  __typename?: 'UsersResult';
  items: Array<User>;
  nextToken?: Maybe<Scalars['String']['output']>;
};
