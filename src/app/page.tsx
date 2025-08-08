"use client";

import { useState, useEffect } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ExternalLink, Building, Landmark, Scale, Globe, Users, Wallet, GraduationCap, Heart, Car, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
      { name: "Khulna City Corporation", url: "https://kcc.gov.bd" },
      { name: "Rajshahi City Corporation", url: "https://rcc.gov.bd" },
      { name: "Barishal City Corporation", url: "https://barcc.gov.bd" },
      { name: "Sylhet City Corporation", url: "https://sylcc.gov.bd" },
      { name: "Rangpur City Corporation", url: "https://rangpurcc.gov.bd" },
      { name: "Mymensingh City Corporation", url: "https://mcc.gov.bd" },
      { name: "Comilla City Corporation", url: "https://comillacitycorporation.gov.bd" },
      { name: "Gazipur City Corporation", url: "https://gcc.gov.bd" },
      { name: "Narayanganj City Corporation", url: "https://narayanganj.gov.bd" },
      { name: "Savar Upazila Parishad", url: "https://savarup.gov.bd" },
    ]
  }
];

// Category icons mapping
const categoryIcons = {
  "Prime Minister's Office": <Landmark className="h-5 w-5" />,
  "Ministries": <Building className="h-5 w-5" />,
  "Law and Judiciary": <Scale className="h-5 w-5" />,
  "E-Governance": <Globe className="h-5 w-5" />,
  "Public Services": <Users className="h-5 w-5" />,
  "Economic and Financial Institutions": <Wallet className="h-5 w-5" />,
  "Education and Research": <GraduationCap className="h-5 w-5" />,
  "Health and Social Services": <Heart className="h-5 w-5" />,
  "Transport and Infrastructure": <Car className="h-5 w-5" />,
  "Local Government": <MapPin className="h-5 w-5" />,
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Function to generate favicon URL
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch (e) {
      return '/favicon.ico'; // fallback
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header with scroll effect */}
      <header className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent border-b border-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">GovBD</h1>
                <p className="text-xs text-muted-foreground -mt-1">Official Directory</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Feedback
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Help
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 pt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6"
          >
            <Landmark className="h-10 w-10 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Government of Bangladesh
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6"
          >
            Official Website Directory
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Find all official government websites of Bangladesh in one place. Access government services, information, and resources.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search for government websites or categories..." 
              className="pl-12 py-6 text-base rounded-xl shadow-sm border-border focus-visible:ring-2 focus-visible:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="text-muted-foreground">
            {filteredWebsites.reduce((acc, category) => acc + category.websites.length, 0)} websites found
          </p>
        </motion.div>

        {filteredWebsites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold mb-2">No websites found</h3>
            <p className="text-muted-foreground">Try adjusting your search term</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {filteredWebsites.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="h-full"
              >
                <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {category.icon}
                      </div>
                      <CardTitle className="text-lg font-semibold">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {category.websites.map((website, webIndex) => (
                        <li key={webIndex}>
                          <a 
                            href={website.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 group p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <img 
                              src={getFaviconUrl(website.url)} 
                              alt={`${website.name} favicon`}
                              className="w-5 h-5 rounded-sm"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/favicon.ico';
                              }}
                            />
                            <span className="text-foreground group-hover:text-primary transition-colors flex-grow text-sm">
                              {website.name}
                            </span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="outline" className="rounded-full px-6">
              Report Broken Link
            </Button>
            <Button variant="outline" className="rounded-full px-6">
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
        </motion.div>
      </div>
      <MadeWithDyad />
    </div>
  );
}