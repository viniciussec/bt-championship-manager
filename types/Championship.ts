export type Championship = {
  id: string;
  category: string;
  name: string;
  numberOfParticipants: number;
  description: string;
  location: {
    id: string;
    name: string;
  };
  enrollStartDate: string;
  enrollEndDate: string;
  startDate: string;
  endDate: string;
};
