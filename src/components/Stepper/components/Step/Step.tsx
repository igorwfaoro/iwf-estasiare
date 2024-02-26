export interface StepperStepProps {
  children: React.ReactNode;
  label?: string;
}

export default function StepperStep({ children }: StepperStepProps) {
  return <>{children}</>;
}
