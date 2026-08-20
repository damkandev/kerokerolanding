import { DecisionAreas } from "./DecisionAreas";
import { DecisionInfrastructure } from "./DecisionInfrastructure";
import { ContactSection } from "./ContactSection";
import { SiteFooter } from "./SiteFooter";

export function PlaceholderSections() {
  return (
    <>
      <DecisionAreas />
      <DecisionInfrastructure />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
