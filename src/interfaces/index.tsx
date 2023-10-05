export interface JobRequirements {
    "content": string;
    "items": string[];
};

export interface JobDuties extends JobRequirements{};

export interface Job {
    "id": number;
    "company": string;
    "logo": string;
    "logoBackground": string;
    "position": string;
    "postedAt": string;
    "contract": string;
    "location": string;
    "website": string;
    "apply": string;
    "description": string;
    "requirements": JobRequirements;
    "role": JobDuties;
};