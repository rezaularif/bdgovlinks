"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ExternalLink, Building, Landmark, Scale, Globe, Users, Wallet, GraduationCap, Heart, Car, MapPin, ChevronRight, Shield, Phone, Book, Leaf, Zap, Droplets, Train, Plane, Anchor, Camera, Calendar, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// Government website data for Bangladesh with icons
const governmentWebsites = [
  {
    category: "Prime Minister's Office",
    icon: <Landmark className="h-5 w-5" />,
    websites: [
      { name: "Prime Minister's Office", url: "https://pmo.gov.bd" },
      { name: "Prime Minister's Office (Old)", url: "https://old.pmo.gov.bd" },
      { name: "Prime Minister's ICT Cell", url: "https://ictcell.pmo.gov.bd" },
    ]
  },
  {
    category: "Presidency",
    icon: <Shield className="h-5 w-5" />,
    websites: [
      { name: "President's Office", url: "https://president.gov.bd" },
      { name: "Vice President's Office", url: "https://vicepresident.gov.bd" },
    ]
  },
  {
    category: "Parliament",
    icon: <FileText className="h-5 w-5" />,
    websites: [
      { name: "Jatiya Sangsad (National Parliament)", url: "https://parliament.gov.bd" },
      { name: "Parliament Library", url: "https://library.parliament.gov.bd" },
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
      { name: "Ministry of Public Administration", url: "https://mpa.gov.bd" },
      { name: "Ministry of Law, Justice and Parliamentary Affairs", url: "https://mole.gov.bd" },
      { name: "Ministry of Local Government, Rural Development and Cooperatives", url: "https://mlgrd.gov.bd" },
      { name: "Ministry of Environment and Forest", url: "https://moef.gov.bd" },
      { name: "Ministry of Information", url: "https://moi.gov.bd" },
      { name: "Ministry of Labour and Employment", url: "https://mole.gov.bd" },
      { name: "Ministry of Women and Children Affairs", url: "https://mowca.gov.bd" },
      { name: "Ministry of Religious Affairs", url: "https://mora.gov.bd" },
      { name: "Ministry of Science and Technology", url: "https://most.gov.bd" },
      { name: "Ministry of Food", url: "https://mof.gov.bd" },
      { name: "Ministry of Water Resources", url: "https://mowr.gov.bd" },
      { name: "Ministry of Liberation War Affairs", url: "https://mlwa.gov.bd" },
    ]
  },
  {
    category: "Law and Judiciary",
    icon: <Scale className="h-5 w-5" />,
    websites: [
      { name: "Supreme Court of Bangladesh", url: "https://supremecourt.gov.bd" },
      { name: "Attorney General's Office", url: "https://ago.gov.bd" },
      { name: "Law Commission", url: "https://lawcommission.gov.bd" },
      { name: "Bangladesh Bar Council", url: "https://barcouncil.gov.bd" },
      { name: "Judicial Administration Training Institute", url: "https://jati.gov.bd" },
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
      { name: "Bangladesh Computer Council", url: "https://bcc.gov.bd" },
      { name: "Software Technology Park", url: "https://stp.gov.bd" },
      { name: "Access to Information Programme", url: "https://ati.gov.bd" },
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
      { name: "Bangladesh Post Office", url: "https://postal.gov.bd" },
      { name: "Teletalk Bangladesh", url: "https://teletalk.com.bd" },
      { name: "Bangladesh Betar", url: "https://betar.gov.bd" },
      { name: "BTV (Bangladesh Television)", url: "https://btv.gov.bd" },
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
      { name: "Export Promotion Bureau", url: "https://epb.gov.bd" },
      { name: "Bangladesh Krishi Bank", url: "https://bkb.gov.bd" },
      { name: "Rajshahi Krishi Unnayan Bank", url: "https://rkub.gov.bd" },
      { name: "Bangladesh House Building Finance Corporation", url: "https://bhbfc.gov.bd" },
    ]
  },
  {
    category: "Education and Research",
    icon: <GraduationCap className="h-5 w-5" />,
    websites: [
      { name: "University Grants Commission", url: "https://ugc.ac.bd" },
      { name: "Bangladesh Technical Education Board", url: "https://techedu.gov.bd" },
      { name: "National University", url: "https://nu.ac.bd" },
      { name: "Dhaka University", url: "https://du.ac.bd" },
      { name: "Bangladesh Open University", url: "https://bou.edu.bd" },
      { name: "Bangladesh Academy for Rural Development", url: "https://bard.gov.bd" },
      { name: "Institute of Water and Flood Management", url: "https://iwfm.buet.ac.bd" },
    ]
  },
  {
    category: "Health and Social Services",
    icon: <Heart className="h-5 w-5" />,
    websites: [
      { name: "Directorate General of Health Services", url: "https://dghealth.gov.bd" },
      { name: "Directorate General of Family Planning", url: "https://dgfp.gov.bd" },
      { name: "Directorate General of Drug Administration", url: "https://dgda.gov.bd" },
      { name: "Bangladesh Medical and Dental Council", url: "https://bmdc.gov.bd" },
      { name: "Institute of Epidemiology Disease Control and Research", url: "https://iedcr.gov.bd" },
      { name: "National Institute of Preventive and Social Medicine", url: "https://nipsm.edu.bd" },
    ]
  },
  {
    category: "Agriculture and Food Security",
    icon: <Leaf className="h-5 w-5" />,
    websites: [
      { name: "Department of Agricultural Extension", url: "https://dae.gov.bd" },
      { name: "Bangladesh Rice Research Institute", url: "https://brri.gov.bd" },
      { name: "Bangladesh Agricultural Research Institute", url: "https://bari.gov.bd" },
      { name: "Fisheries Department", url: "https://fisheries.gov.bd" },
      { name: "Department of Livestock Services", url: "https://dls.gov.bd" },
    ]
  },
  {
    category: "Energy and Power",
    icon: <Zap className="h-5 w-5" />,
    websites: [
      { name: "Ministry of Power, Energy and Mineral Resources", url: "https://mopemr.gov.bd" },
      { name: "Bangladesh Power Development Board", url: "https://bpdb.gov.bd" },
      { name: "Rural Electrification Board", url: "https://reb.gov.bd" },
      { name: "Sylhet Gas Fields Limited", url: "https://sgfl.gov.bd" },
    ]
  },
  {
    category: "Water Resources and Environment",
    icon: <Droplets className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Water Development Board", url: "https://bwdb.gov.bd" },
      { name: "Department of Environment", url: "https://doe.gov.bd" },
      { name: "Forest Department", url: "https://forest.gov.bd" },
      { name: "Bangladesh Meteorological Department", url: "https://bmd.gov.bd" },
    ]
  },
  {
    category: "Transport and Infrastructure",
    icon: <Car className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Road Transport Authority", url: "https://brta.gov.bd" },
      { name: "Civil Aviation Authority", url: "https://caab.gov.bd" },
      { name: "Bangladesh Bridge Authority", url: "https://bridgeauthority.gov.bd" },
      { name: "Bangladesh Railway", url: "https://railway.gov.bd" },
      { name: "Bangladesh Inland Water Transport Authority", url: "https://biwta.gov.bd" },
      { name: "Chittagong Port Authority", url: "https://cpa.gov.bd" },
      { name: "Mongla Port Authority", url: "https://mpa.gov.bd" },
      { name: "Bangladesh Highway Department", url: "https://bhd.gov.bd" },
    ]
  },
  {
    category: "Communication and IT",
    icon: <Phone className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Telecommunication Regulatory Commission", url: "https://btrc.gov.bd" },
      { name: "Posts and Telecommunications Division", url: "https://ptd.gov.bd" },
    ]
  },
  {
    category: "Tourism and Culture",
    icon: <Camera className="h-5 w-5" />,
    websites: [
      { name: "Ministry of Information and Communication Technology", url: "https://moict.gov.bd" },
      { name: "Bangladesh Tourism Board", url: "https://btb.gov.bd" },
      { name: "Department of Archaeology", url: "https://doa.gov.bd" },
      { name: "Liberation War Museum", url: "https://lwmuseum.org" },
    ]
  },
  {
    category: "Planning and Development",
    icon: <Calendar className="h-5 w-5" />,
    websites: [
      { name: "Planning Commission", url: "https://planningcommission.gov.bd" },
      { name: "General Economics Division", url: "https://ged.gov.bd" },
      { name: "Bangladesh Bureau of Statistics", url: "https://bbs.gov.bd" },
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

// Memoized WebsiteItem component
const WebsiteItem = ({ website }: { website: { name: string; url: string } }) => {
  // Function to generate favicon URL
  const getFaviconUrl = useCallback((url: string) => {
    try {
      const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch (e) {
      return '/favicon.ico'; // fallback
    }
  }, []);

  return (
    <li>
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
  );
};

// Memoized CategoryCard component
const CategoryCard = ({ category }: { category: typeof governmentWebsites[0] }) => {
  return (
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
            <WebsiteItem key={webIndex} website={website} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
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

  // Memoized filtered websites
  const filteredWebsites = useMemo(() => {
    if (!searchTerm) return governmentWebsites;
    
    return governmentWebsites
      .map(category => {
        const filteredSites = category.websites.filter(website => 
          website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...category, websites: filteredSites };
      })
      .filter(category => category.websites.length > 0);
  }, [searchTerm]);

  // Memoized website count
  const websiteCount = useMemo(() => {
    return filteredWebsites.reduce((acc, category) => acc + category.websites.length, 0);
  }, [filteredWebsites]);

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
                <p className="text-xs text-muted-foreground -mt-1">Unofficial Directory</p>
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
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
            <Landmark className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bangladesh Government Websites
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
            Unofficial Directory
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find all official government websites of Bangladesh in one place. This is an unofficial directory for easy access to government services and information.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search for government websites or categories..." 
              className="pl-12 py-6 text-base rounded-xl shadow-sm border-border focus-visible:ring-2 focus-visible:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            {websiteCount} websites found
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
              <div key={index} className="h-full">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
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
              This is an unofficial directory of government websites of Bangladesh. 
              All links open in a new tab for your convenience. If you find any broken links or 
              would like to suggest additions to this directory, please let us know.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer with Made by Arif */}
      <div className="py-6 text-center border-t border-border bg-background/50 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">
          Made by Arif
        </p>
      </div>
    </div>
  );
}