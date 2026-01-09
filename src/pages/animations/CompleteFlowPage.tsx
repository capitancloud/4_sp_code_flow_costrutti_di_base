import AnimationLayout from "@/components/layout/AnimationLayout";
import CompleteFlowScene from "@/components/scenes/integrated/CompleteFlowScene";

const CompleteFlowPage = () => {
  return (
    <AnimationLayout 
      title="Flusso Completo" 
      description="Variabili, array, cicli, condizioni e funzioni che lavorano insieme"
    >
      <CompleteFlowScene />
    </AnimationLayout>
  );
};

export default CompleteFlowPage;
