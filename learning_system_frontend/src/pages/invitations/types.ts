export interface CreatedBy_Int {
  _id: string;
  name: string;
  email: string;
  userClass: string;
  userSec: string;
}

export interface projectRefrence_int {
  _id: string;
  projectTitle: string;
  projectDescription?: string;
}

export interface Get_Invitation_API_Response_int {
  _id: string;
  createdAt: Date;
  createdBy: CreatedBy_Int;
  invitedUsers?: {};
  projectRefrence: projectRefrence_int;
}
