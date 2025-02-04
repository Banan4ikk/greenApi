export type Error = {
  invokeStatus: {
    method: string;
    used: number;
    total: null;
    status: string;
    description: string;
  };
  correspondentsStatus: {
    method: string;
    used: number;
    total: number;
    status: string;
    description: string;
  };
};

export type Meta = {
  errors: string | null;
  loading: boolean;
};
