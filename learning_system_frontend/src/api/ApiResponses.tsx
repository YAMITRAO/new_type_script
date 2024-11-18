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
  _id: string;
  isProjectRegistered: boolean;
  role: string;
}

export interface ProjectRegDetails extends LoginUserDetails {
  projectTitle: string;
  teamName: string;
  teamMembers: string;
  projectDescription: string;
}

// export interface SingleProjectDetails {
//   projectTitle: string;
//   teamName: string;
//   teamMembers: string;
//   projectDescription: string;
// }

export interface ApiResponse<T> {
  message: string;
  data: T;
}

// For error response

export interface ApiErrorResponse {
  message: string;
  data?: SigUpUserDetails;
}
