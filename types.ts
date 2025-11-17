
export interface LGA {
  id: string;
  name: string;
}

export interface CorpsMember {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  ppa: string; // Place of Primary Assignment
}

export interface CorpsMemberBatch {
  id: string;
  batch: string; // e.g., "2024 Batch A Stream 1"
  members: CorpsMember[];
}

export interface ClearanceRecord {
  id: string;
  month: string;
  year: number;
  cleared: number;
  absent: number;
}

export interface DisciplinaryCase {
  id:string;
  corpMemberName: string;
  offense: string;
  date: string;
  status: 'Pending' | 'Resolved' | 'Queried';
}

export interface TrainingCenter {
  id: string;
  name: string;
  memberCount: number;
  fee: number; // in Naira
}

export interface CDSGroupMember {
  id: string;
  name: string;
}

export interface CDGroup {
  id: string;
  name: string;
  members: CDSGroupMember[];
}