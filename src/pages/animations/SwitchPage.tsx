import AnimationLayout from "@/components/layout/AnimationLayout";
import SwitchScene from "@/components/scenes/SwitchScene";

const SwitchPage = () => {
  return (
    <AnimationLayout 
      title="SWITCH / CASE" 
      description="Selezione multipla con percorsi paralleli basati sul valore"
    >
      <SwitchScene />
    </AnimationLayout>
  );
};

export default SwitchPage;
