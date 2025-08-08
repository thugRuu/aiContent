type Candidate = {
  content: {
    parts: {
      text: string;
    }[];
    role: string;
  };
  finishReason: string;
  avgLogprobs: number;
};

export type CandidatesResponse = {
  candidates: Candidate[];
};
