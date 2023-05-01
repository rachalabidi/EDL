export interface Role {
  readonly value: string;
  readonly label: string;
}
export const Role: readonly Role[] = [
  { value: "Student", label: "Student" },
  { value: "Teacher", label: "Teacher" },
  { value: "DEAN", label: "VICE DEAN " },
  { value: "CFD", label: "The president of the CFD" },
];
