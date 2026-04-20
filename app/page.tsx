import Hero from "@/app/components/Hero";
import Services from "@/app/components/Services";
import SolutionsLab from "@/app/components/SolutionsLab";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <SolutionsLab />
    </div>
  );
}