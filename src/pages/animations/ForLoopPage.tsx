import AnimationLayout from "@/components/layout/AnimationLayout";
import ForLoopScene from "@/components/scenes/ForLoopScene";

const ForLoopPage = () => {
  return (
    <AnimationLayout 
      title="FOR Loop" 
      description="Ripetizione controllata con contatore e condizione di uscita"
    >
      <ForLoopScene />
    </AnimationLayout>
  );
};

export default ForLoopPage;
