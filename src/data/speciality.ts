export interface Sp {
  readonly value: string;
  readonly label: string;
}
export const Speciality: readonly Sp[] = [
  { value: "gl", label: "Software Engineering " },
  {
    value: "stic",
    label: "Information and Communication Sciences and Technologies",
  },
  { value: "stiw", label: "Information Systems and Web Technologies" },
  { value: "rsd", label: "Networks and distributed systems" },
];
