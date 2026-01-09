import AnimationLayout from "@/components/layout/AnimationLayout";
import VariablesScene from "@/components/scenes/VariablesScene";

const VariablesPage = () => {
  return (
    <AnimationLayout 
      title="Variabili" 
      description="Contenitori dinamici che memorizzano e modificano valori"
    >
      <VariablesScene />
    </AnimationLayout>
  );
};

export default VariablesPage;
