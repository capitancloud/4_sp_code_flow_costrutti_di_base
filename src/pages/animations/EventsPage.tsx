import AnimationLayout from "@/components/layout/AnimationLayout";
import EventsScene from "@/components/scenes/EventsScene";

const EventsPage = () => {
  return (
    <AnimationLayout 
      title="Eventi" 
      description="Programmazione reattiva con trigger, listener e callback"
    >
      <EventsScene />
    </AnimationLayout>
  );
};

export default EventsPage;
