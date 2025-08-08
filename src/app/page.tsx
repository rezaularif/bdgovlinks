"use client";

import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ExternalLink, Building, Landmark, Scale, Globe, Users, Wallet, GraduationCap, Heart, Car, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Government website data for Bangladesh with icons
const governmentWebsites = [
  {
    category: "Prime Minister's Office",
    icon: <Landmark className="h-5 w-5" />,
    websites: [
      { name: "Prime Minister's Office", url: "https://pmo.gov.bd" },
      { name: "Prime Minister's Office (Old)", url: "https://old.pmo.gov.bd" },
    ]
  },
  {
    category: "Ministries",
    icon: <Building className="h-5 w-5" />,
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
    icon: <Scale className="h-5 w-5" />,
    websites: [
      { name: "Supreme Court of Bangladesh", url: "https://supremecourt.gov.bd" },
      { name: "Attorney General's Office", url: "https://ago.gov.bd" },
      { name: "Law Commission", url: "https://lawcommission.gov.bd" },
    ]
  },
  {
    category: "E-Governance",
    icon: <Globe className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Portal", url: "https://bangladesh.gov.bd" },
      { name: "Digital Bangladesh", url: "https://digitalbangladesh.gov.bd" },
      { name: "e-GP (Electronic Government Procurement)", url: "https://egp.gov.bd" },
      { name: "National Portal", url: "https://nationallibrary.gov.bd" },
    ]
  },
  {
    category: "Public Services",
    icon: <Users className="h-5 w-5" />,
    websites: [
      { name: "Passport Office", url: "https://passport.gov.bd" },
      { name: "National Identity Registration", url: "https://nidw.gov.bd" },
      { name: "Land Administration", url: "https://landadministration.gov.bd" },
      { name: "BRDB (Bangladesh Rural Development Board)", url: "https://brdb.gov.bd" },
    ]
  },
  {
    category: "Economic and Financial Institutions",
    icon: <Wallet className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Bank", url: "https://bangladeshbank.org.bd" },
      { name: "SEC Bangladesh", url: "https://sec.gov.bd" },
      { name: "BSEC (Bangladesh Securities and Exchange Commission)", url: "https://bsec.gov.bd" },
      { name: "BIDA (Bangladesh Investment Development Authority)", url: "https://bida.gov.bd" },
    ]
  },
  {
    category: "Education and Research",
    icon: <GraduationCap className="h-5 w-5" />,
    websites: [
      { name: "University Grants Commission", url: "https://ugc.ac.bd" },
      { name: "Bangladesh Technical Education Board", url: "https://techedu.gov.bd" },
      { name: "National University", url: "https://nu.ac.bd" },
    ]
  },
  {
    category: "Health and Social Services",
    icon: <Heart className="h-5 w-5" />,
    websites: [
      { name: "Directorate General of Health Services", url: "https://dghealth.gov.bd" },
      { name: "Directorate General of Family Planning", url: "https://dgfp.gov.bd" },
    ]
  },
  {
    category: "Transport and Infrastructure",
    icon: <Car className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Road Transport Authority", url: "https://brta.gov.bd" },
      { name: "Civil Aviation Authority", url: "https://caab.gov.bd" },
      { name: "Bangladesh Bridge Authority", url: "https://bridgeauthority.gov.bd" },
    ]
  },
  {
    category: "Local Government",
    icon: <MapPin className="h-5 w-5" />,
    websites: [
      { name: "Dhaka City Corporation", url: "https://dcc.gov.bd" },
      { name: "Chittagong City Corporation", url: "https://ccc.gov.bd" },
    ]
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter websites based on search term
  const filteredWebsites = governmentWebsites
    .map(category => {
      const filteredSites = category.websites.filter(website => 
        website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...category, websites: filteredSites };
    })
    .filter(category => category.websites.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
            <Landmark className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Government of Bangladesh
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Official Website Directory
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find all official government websites of Bangladesh in one place. Access government services, information, and resources.
          </p>
        </header>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search for government websites or categories..." 
              className="pl-12 py-6 text-base rounded-xl shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            {filteredWebsites.reduce((acc, category) => acc + category.websites.length, 0)} websites found
          </p>
        </div>

        {filteredWebsites.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No websites found</h3>
            <p className="text-muted-foreground">Try adjusting your search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredWebsites.map((category, index) => (
              <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {category.websites.map((website, webIndex) => (
                      <li key={webIndex}>
                        <a 
                          href={website.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <span className="text-foreground group-hover:text-primary transition-colors">
                            {website.name}
                          </span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="outline" className="rounded-full">
              Report Broken Link
            </Button>
            <Button variant="outline" className="rounded-full">
              Suggest New Website
            </Button>
          </div>
          <div className="text-sm text-muted-foreground max-w-2xl mx-auto">
            <p>
              This directory contains official websites of the Government of Bangladesh. 
              All links open in a new tab for your convenience. If you find any broken links or 
              would like to suggest additions to this directory, please let us know.
            </p>
          </div>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
}