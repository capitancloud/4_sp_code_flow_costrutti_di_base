import AnimationLayout from "@/components/layout/AnimationLayout";
import IfElseIfScene from "@/components/scenes/IfElseIfScene";

const IfElseIfPage = () => {
  return (
    <AnimationLayout 
      title="IF / ELSE IF / ELSE" 
      description="Valutazione sequenziale a cascata di condizioni multiple"
    >
      <IfElseIfScene />
    </AnimationLayout>
  );
};

export default IfElseIfPage;
