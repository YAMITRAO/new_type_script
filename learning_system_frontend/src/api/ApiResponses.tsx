// for success response

// user signup response success
export interface SigUpUserDetails {
  name: string;
  email: string;
}

export interface LoginUserDetails {
  name: string;
  email: string;
  token: string;
}

export interface ApiResponse<T> {
  message: number;
  data: T;
}

// For error response

export interface ApiErrorResponse {
  message: string;
  data?: SigUpUserDetails;
}
