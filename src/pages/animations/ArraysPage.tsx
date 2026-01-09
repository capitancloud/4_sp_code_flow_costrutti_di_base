import AnimationLayout from "@/components/layout/AnimationLayout";
import ArrayScene from "@/components/scenes/ArrayScene";

const ArraysPage = () => {
  return (
    <AnimationLayout 
      title="Array / Liste" 
      description="Strutture dati lineari con inserimento, accesso e rimozione"
    >
      <ArrayScene />
    </AnimationLayout>
  );
};

export default ArraysPage;
