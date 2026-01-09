import AnimationLayout from "@/components/layout/AnimationLayout";
import IfElseScene from "@/components/scenes/IfElseScene";

const IfElsePage = () => {
  return (
    <AnimationLayout 
      title="IF / ELSE" 
      description="Osserva come il flusso viene deviato in base a una condizione binaria"
    >
      <IfElseScene />
    </AnimationLayout>
  );
};

export default IfElsePage;
