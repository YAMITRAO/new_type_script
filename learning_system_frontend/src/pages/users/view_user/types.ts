export interface SingelUser {
  _id: string;
  name: string;
  email: string;
  dob: string;
  userClass: string;
  userSec: string;
  isBlocked: boolean;
}

export interface projectDetails {
  _id: string;
  projectTitle: string;
  teamName: string;
  teamMembers: string;
  projectDescription: string;
  owner: string;
}

export interface userDashboard {
  message: string;
  data: {
    userDetails: SingelUser;
    projectDetails: projectDetails[];
  };
}
