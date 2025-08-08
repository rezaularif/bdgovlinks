"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ExternalLink, Building, Landmark, Scale, Globe, Users, Wallet, GraduationCap, Heart, Car, MapPin, ChevronRight, Shield, Phone, Book, Leaf, Zap, Droplets, Train, Plane, Anchor, Camera, Calendar, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

// Government website data for Bangladesh with icons - rearranged for better UX
const governmentWebsites = [
  {
    category: "Core Government",
    icon: <Landmark className="h-5 w-5" />,
    websites: [
      { name: "Prime Minister's Office", url: "https://pmo.gov.bd" },
      { name: "President's Office", url: "https://president.gov.bd" },
      { name: "Jatiya Sangsad (National Parliament)", url: "https://parliament.gov.bd" },
      { name: "Prime Minister's Office (Old)", url: "https://old.pmo.gov.bd" },
      { name: "Vice President's Office", url: "https://vicepresident.gov.bd" },
    ]
  },
  {
    category: "Key Ministries",
    icon: <Building className="h-5 w-5" />,
    websites: [
      { name: "Ministry of Finance", url: "https://mof.gov.bd" },
      { name: "Ministry of Foreign Affairs", url: "https://mofa.gov.bd" },
      { name: "Ministry of Home Affairs", url: "https://mha.gov.bd" },
      { name: "Ministry of Education", url: "https://moedu.gov.bd" },
      { name: "Ministry of Health and Family Welfare", url: "https://mohfw.gov.bd" },
      { name: "Ministry of Agriculture", url: "https://moa.gov.bd" },
    ]
  },
  {
    category: "Public Services",
    icon: <Users className="h-5 w-5" />,
    websites: [
      { name: "Passport Office", url: "https://passport.gov.bd" },
      { name: "National Identity Registration", url: "https://nidw.gov.bd" },
      { name: "Bangladesh Post Office", url: "https://postal.gov.bd" },
      { name: "Land Administration", url: "https://landadministration.gov.bd" },
      { name: "Teletalk Bangladesh", url: "https://teletalk.com.bd" },
    ]
  },
  {
    category: "E-Governance",
    icon: <Globe className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Portal", url: "https://bangladesh.gov.bd" },
      { name: "Digital Bangladesh", url: "https://digitalbangladesh.gov.bd" },
      { name: "e-GP (Electronic Government Procurement)", url: "https://egp.gov.bd" },
      { name: "Access to Information Programme", url: "https://ati.gov.bd" },
      { name: "Bangladesh Computer Council", url: "https://bcc.gov.bd" },
    ]
  },
  {
    category: "Law and Judiciary",
    icon: <Scale className="h-5 w-5" />,
    websites: [
      { name: "Supreme Court of Bangladesh", url: "https://supremecourt.gov.bd" },
      { name: "Attorney General's Office", url: "https://ago.gov.bd" },
      { name: "Bangladesh Bar Council", url: "https://barcouncil.gov.bd" },
      { name: "Law Commission", url: "https://lawcommission.gov.bd" },
    ]
  },
  {
    category: "Economic Institutions",
    icon: <Wallet className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Bank", url: "https://bangladeshbank.org.bd" },
      { name: "SEC Bangladesh", url: "https://sec.gov.bd" },
      { name: "BSEC (Bangladesh Securities and Exchange Commission)", url: "https://bsec.gov.bd" },
      { name: "BIDA (Bangladesh Investment Development Authority)", url: "https://bida.gov.bd" },
      { name: "Export Promotion Bureau", url: "https://epb.gov.bd" },
    ]
  },
  {
    category: "Education and Research",
    icon: <GraduationCap className="h-5 w-5" />,
    websites: [
      { name: "University Grants Commission", url: "https://ugc.ac.bd" },
      { name: "National University", url: "https://nu.ac.bd" },
      { name: "Dhaka University", url: "https://du.ac.bd" },
      { name: "Bangladesh Open University", url: "https://bou.edu.bd" },
      { name: "Bangladesh Technical Education Board", url: "https://techedu.gov.bd" },
    ]
  },
  {
    category: "Health Services",
    icon: <Heart className="h-5 w-5" />,
    websites: [
      { name: "Directorate General of Health Services", url: "https://dghealth.gov.bd" },
      { name: "Directorate General of Family Planning", url: "https://dgfp.gov.bd" },
      { name: "Directorate General of Drug Administration", url: "https://dgda.gov.bd" },
      { name: "Bangladesh Medical and Dental Council", url: "https://bmdc.gov.bd" },
    ]
  },
  {
    category: "Agriculture and Environment",
    icon: <Leaf className="h-5 w-5" />,
    websites: [
      { name: "Department of Agricultural Extension", url: "https://dae.gov.bd" },
      { name: "Bangladesh Rice Research Institute", url: "https://brri.gov.bd" },
      { name: "Department of Environment", url: "https://doe.gov.bd" },
      { name: "Forest Department", url: "https://forest.gov.bd" },
    ]
  },
  {
    category: "Energy and Utilities",
    icon: <Zap className="h-5 w-5" />,
    websites: [
      { name: "Ministry of Power, Energy and Mineral Resources", url: "https://mopemr.gov.bd" },
      { name: "Bangladesh Power Development Board", url: "https://bpdb.gov.bd" },
      { name: "Rural Electrification Board", url: "https://reb.gov.bd" },
      { name: "Sylhet Gas Fields Limited", url: "https://sgfl.gov.bd" },
    ]
  },
  {
    category: "Transport and Infrastructure",
    icon: <Car className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Road Transport Authority", url: "https://brta.gov.bd" },
      { name: "Bangladesh Railway", url: "https://railway.gov.bd" },
      { name: "Civil Aviation Authority", url: "https://caab.gov.bd" },
      { name: "Bangladesh Bridge Authority", url: "https://bridgeauthority.gov.bd" },
      { name: "Bangladesh Inland Water Transport Authority", url: "https://biwta.gov.bd" },
    ]
  },
  {
    category: "Communication and IT",
    icon: <Phone className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Telecommunication Regulatory Commission", url: "https://btrc.gov.bd" },
      { name: "Posts and Telecommunications Division", url: "https://ptd.gov.bd" },
      { name: "Software Technology Park", url: "https://stp.gov.bd" },
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
    ]
  },
  {
    category: "Additional Ministries",
    icon: <Building className="h-5 w-5" />,
    websites: [
      { name: "Ministry of Industries", url: "https://moind.gov.bd" },
      { name: "Ministry of Commerce", url: "https://moc.gov.bd" },
      { name: "Ministry of Public Administration", url: "https://mpa.gov.bd" },
      { name: "Ministry of Law, Justice and Parliamentary Affairs", url: "https://mole.gov.bd" },
      { name: "Ministry of Environment and Forest", url: "https://moef.gov.bd" },
    ]
  },
  {
    category: "Social Services",
    icon: <Users className="h-5 w-5" />,
    websites: [
      { name: "Ministry of Women and Children Affairs", url: "https://mowca.gov.bd" },
      { name: "Ministry of Religious Affairs", url: "https://mora.gov.bd" },
      { name: "Ministry of Labour and Employment", url: "https://mole.gov.bd" },
      { name: "BRDB (Bangladesh Rural Development Board)", url: "https://brdb.gov.bd" },
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
          className="w-5 h-5 rounded-sm flex-shrink-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/favicon.ico';
          }}
        />
        <span className="text-foreground group-hover:text-primary transition-colors flex-grow text-sm">
          {website.name}
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 flex-shrink-0" />
      </a>
    </li>
  );
};

// Memoized CategoryCard component with auto-adjusting height
const CategoryCard = ({ category }: { category: typeof governmentWebsites[0] }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-border bg-card/50 backdrop-blur-sm h-full bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
            {category.icon}
          </div>
          <CardTitle className="text-lg font-semibold">{t(`categories.${category.category}`)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <ul className="space-y-1">
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
  const { language, setLanguage, t } = useLanguage();

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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Landmark className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">GovBD</h1>
                <p className="text-[0.65rem] sm:text-xs text-muted-foreground -mt-0.5 sm:-mt-1">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-2 py-1 h-8 text-xs sm:text-sm">
                  {t('feedback')}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-2 py-1 h-8 text-xs sm:text-sm">
                  {t('help')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12 pt-2 sm:pt-4">
          <div className="inline-flex items-center justify-center p-2 sm:p-3 rounded-full bg-primary/10 mb-4 sm:mb-6">
            <Landmark className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t('title')}
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-4 sm:mb-6">
            {t('subtitle')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto px-2">
            {t('description')}
          </p>
        </div>

        <div className="max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
            <Input 
              placeholder={t('searchPlaceholder')} 
              className="pl-10 sm:pl-12 py-5 sm:py-6 text-sm sm:text-base rounded-full shadow-sm border-border focus-visible:ring-2 focus-visible:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 sm:mb-8 text-center">
          <p className="text-muted-foreground text-sm sm:text-base">
            {t('websitesFound', websiteCount)}
          </p>
        </div>

        {filteredWebsites.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{t('noWebsitesFound')}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{t('tryAdjustingSearch')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {filteredWebsites.map((category, index) => (
              <div key={index} className="h-full">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button variant="outline" className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
              {t('reportBrokenLink')}
            </Button>
            <Button variant="outline" className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
              {t('suggestNewWebsite')}
            </Button>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-2">
            <p>
              {t('directoryInfo')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Minimal Footer with Language Selector */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="font-medium text-foreground text-sm sm:text-base">GovBD</span>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center">
              {t('copyright', new Date().getFullYear())}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ${language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t('english')}
              </button>
              <button 
                onClick={() => setLanguage('bn')}
                className={`text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ${language === 'bn' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {t('bangla')}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}