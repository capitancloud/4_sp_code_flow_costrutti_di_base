import AnimationLayout from "@/components/layout/AnimationLayout";
import BubbleSortScene from "@/components/scenes/sorting/BubbleSortScene";

const BubbleSortPage = () => {
  return (
    <AnimationLayout 
      title="Bubble Sort" 
      description="Osserva come gli elementi vengono confrontati e scambiati fino all'ordinamento completo"
    >
      <BubbleSortScene />
    </AnimationLayout>
  );
};

export default BubbleSortPage;
