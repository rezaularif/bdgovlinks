import { MadeWithDyad } from "@/components/made-with-dyad";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

// Government website data for Bangladesh
const governmentWebsites = [
  {
    category: "Prime Minister's Office",
    websites: [
      { name: "Prime Minister's Office", url: "https://pmo.gov.bd" },
      { name: "Prime Minister's Office (Old)", url: "https://old.pmo.gov.bd" },
    ]
  },
  {
    category: "Ministries",
    websites: [
      { name: "Ministry of Finance", url: "https://mof.gov.bd" },
      { name: "Ministry of Foreign Affairs", url: "https://mofa.gov.bd" },
      { name: "Ministry of Home Affairs", url: "https://mha.gov.bd" },
      { name: "Ministry of Education", url: "https://moedu.gov.bd" },
      { name: "Ministry of Health and Family Welfare", url: "https://mohfw.gov.bd" },
      { name: "Ministry of Agriculture", url: "https://moa.gov.bd" },
      { name: "Ministry of Industries", url: "https://moind.gov.bd" },
      { name: "Ministry of Commerce", url: "https://moc.gov.bd" },
    ]
  },
  {
    category: "Law and Judiciary",
    websites: [
      { name: "Supreme Court of Bangladesh", url: "https://supremecourt.gov.bd" },
      { name: "Attorney General's Office", url: "https://ago.gov.bd" },
      { name: "Law Commission", url: "https://lawcommission.gov.bd" },
    ]
  },
  {
    category: "E-Governance",
    websites: [
      { name: "Bangladesh Portal", url: "https://bangladesh.gov.bd" },
      { name: "Digital Bangladesh", url: "https://digitalbangladesh.gov.bd" },
      { name: "e-GP (Electronic Government Procurement)", url: "https://egp.gov.bd" },
      { name: "National Portal", url: "https://nationallibrary.gov.bd" },
    ]
  },
  {
    category: "Public Services",
    websites: [
      { name: "Passport Office", url: "https://passport.gov.bd" },
      { name: "National Identity Registration", url: "https://nidw.gov.bd" },
      { name: "Land Administration", url: "https://landadministration.gov.bd" },
      { name: "BRDB (Bangladesh Rural Development Board)", url: "https://brdb.gov.bd" },
    ]
  },
  {
    category: "Economic and Financial Institutions",
    websites: [
      { name: "Bangladesh Bank", url: "https://bangladeshbank.org.bd" },
      { name: "SEC Bangladesh", url: "https://sec.gov.bd" },
      { name: "BSEC (Bangladesh Securities and Exchange Commission)", url: "https://bsec.gov.bd" },
      { name: "BIDA (Bangladesh Investment Development Authority)", url: "https://bida.gov.bd" },
    ]
  },
  {
    category: "Education and Research",
    websites: [
      { name: "University Grants Commission", url: "https://ugc.ac.bd" },
      { name: "Bangladesh Technical Education Board", url: "https://techedu.gov.bd" },
      { name: "National University", url: "https://nu.ac.bd" },
    ]
  },
  {
    category: "Health and Social Services",
    websites: [
      { name: "Directorate General of Health Services", url: "https://dghealth.gov.bd" },
      { name: "Directorate General of Family Planning", url: "https://dgfp.gov.bd" },
    ]
  },
  {
    category: "Transport and Infrastructure",
    websites: [
      { name: "Bangladesh Road Transport Authority", url: "https://brta.gov.bd" },
      { name: "Civil Aviation Authority", url: "https://caab.gov.bd" },
      { name: "Bangladesh Bridge Authority", url: "https://bridgeauthority.gov.bd" },
    ]
  },
  {
    category: "Local Government",
    websites: [
      { name: "Dhaka City Corporation", url: "https://dcc.gov.bd" },
      { name: "Chittagong City Corporation", url: "https://ccc.gov.bd" },
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Government of Bangladesh
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Official Website Directory
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find all official government websites of Bangladesh in one place. Access government services, information, and resources.
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for government websites..." 
              className="pl-10 py-6 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {governmentWebsites.map((category, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {category.websites.map((website, webIndex) => (
                    <li key={webIndex}>
                      <a 
                        href={website.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 hover:underline transition-colors block py-1"
                      >
                        {website.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            This directory contains official websites of the Government of Bangladesh. 
            All links open in a new tab for your convenience.
          </p>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
}