import AnimationLayout from "@/components/layout/AnimationLayout";
import FunctionsScene from "@/components/scenes/FunctionsScene";

const FunctionsPage = () => {
  return (
    <AnimationLayout 
      title="Funzioni" 
      description="Blocchi di codice riutilizzabili con input, trasformazione e output"
    >
      <FunctionsScene />
    </AnimationLayout>
  );
};

export default FunctionsPage;
