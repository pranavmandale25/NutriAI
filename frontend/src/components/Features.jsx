import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="features">

      <FeatureCard
        icon="🤖"
        title="AI Analysis"
        description="Describe your meal and AI estimates calories instantly."
      />

      <FeatureCard
        icon="📊"
        title="Daily Tracking"
        description="Track your daily calorie intake and monitor progress."
      />

      <FeatureCard
        icon="⚖️"
        title="BMI Calculator"
        description="Know your BMI and maintain a healthy lifestyle."
      />

      <FeatureCard
        icon="🥗"
        title="Healthy Suggestions"
        description="Get personalized meal suggestions from AI."
      />

    </section>
  );
}

export default Features;
