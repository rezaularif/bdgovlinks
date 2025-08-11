"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Building, Landmark, Scale, Globe, Users, Wallet, GraduationCap, Heart, Car, MapPin, ChevronRight, Shield, Phone, Book, Leaf, Zap, Droplets, Train, Plane, Anchor, Camera, Calendar, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import BangladeshFlagIcon from "@/components/BangladeshFlagIcon";
import HeroParticles from "@/components/HeroParticles";
import SearchIcon from "@/components/SearchIcon";
import { cn } from "@/lib/utils";
import iconMap from "@/lib/site-icons.json" assert { type: "json" };
import iconOverrides from "@/lib/site-icons-overrides.json" assert { type: "json" };

// Government website data for Bangladesh with icons - rearranged for better UX
const governmentWebsites = [
  {
    category: "Core Government",
    icon: <Landmark className="h-5 w-5" />,
    websites: [
      { name: "Prime Minister's Office", url: "https://pmo.gov.bd" },
      { name: "President's Office", url: "https://president.gov.bd" },
      { name: "Jatiya Sangsad (National Parliament)", url: "https://www.parliament.gov.bd" },
      { name: "Prime Minister's Office (Old)", url: "https://old.pmo.gov.bd" },
      { name: "Cabinet Division", url: "https://cabinet.gov.bd" },
      { name: "Chief Adviser's Office", url: "https://cao.gov.bd" },
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
      { name: "Ministry of Planning", url: "https://mop.gov.bd" },
      { name: "Ministry of Commerce", url: "https://mincom.gov.bd" },
      { name: "Ministry of Industries", url: "https://moind.gov.bd" },
    ]
  },
  {
    category: "Public Services",
    icon: <Users className="h-5 w-5" />,
    websites: [
      { name: "Passport Office", url: "https://passport.gov.bd" },
      { name: "e-Passport", url: "https://www.epassport.gov.bd" },
      { name: "National Identity Registration", url: "https://nidw.gov.bd" },
      { name: "NBR e-Tax", url: "https://etaxnbr.gov.bd" },
      { name: "BRTA Service Portal", url: "https://bsp.brta.gov.bd/?lan=en" },
      { name: "Bangladesh Post Office", url: "https://bdpost.gov.bd" },
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
        { name: "e-GP (Electronic Government Procurement)", url: "https://www.eprocure.gov.bd" },
        { name: "Access to Information (a2i)", url: "https://a2i.gov.bd" },
      { name: "Bangladesh Computer Council", url: "https://bcc.gov.bd" },
        { name: "MyGov", url: "https://mygov.bd" },
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
        { name: "Judiciary of Bangladesh", url: "https://judiciary.gov.bd" },
        { name: "Bangladesh Laws (BDLaws)", url: "http://bdlaws.minlaw.gov.bd" },
    ]
  },
  {
    category: "Economic Institutions",
    icon: <Wallet className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Bank", url: "https://www.bb.org.bd" },
      { name: "National Board of Revenue (NBR)", url: "https://nbr.gov.bd" },
      { name: "Securities and Exchange Commission (SEC)", url: "https://sec.gov.bd" },
      { name: "BIDA (Bangladesh Investment Development Authority)", url: "https://bida.gov.bd" },
      { name: "Export Promotion Bureau", url: "https://epb.gov.bd" },
      { name: "BEZA (Bangladesh Economic Zones Authority)", url: "https://beza.gov.bd" },
      { name: "BEPZA (Bangladesh Export Processing Zones Authority)", url: "https://www.bepza.gov.bd" },
      { name: "Bangladesh Steel & Engineering Corporation (BSEC)", url: "https://bsec.gov.bd" },
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
        { name: "DSHE (Directorate of Secondary and Higher Education)", url: "https://dshe.gov.bd" },
        { name: "SHED (Secondary and Higher Education Division)", url: "https://shed.gov.bd" },
        { name: "DPE (Directorate of Primary Education)", url: "https://dpe.gov.bd" },
        { name: "Education Board Results", url: "http://www.educationboardresults.gov.bd" },
    ]
  },
  {
    category: "Health Services",
    icon: <Heart className="h-5 w-5" />,
    websites: [
        { name: "Directorate General of Health Services", url: "https://dghs.gov.bd" },
      { name: "Directorate General of Family Planning", url: "https://dgfp.gov.bd" },
      { name: "Directorate General of Drug Administration", url: "https://dgda.gov.bd" },
        { name: "Bangladesh Medical and Dental Council", url: "https://bmdc.gov.bd" },
        { name: "IEDCR", url: "https://iedcr.gov.bd" },
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
        { name: "BARC (Bangladesh Agricultural Research Council)", url: "https://barc.gov.bd" },
        { name: "BARI (Bangladesh Agricultural Research Institute)", url: "https://bari.gov.bd" },
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
        { name: "Petrobangla", url: "https://petrobangla.org.bd" },
        { name: "PGCB (Power Grid Company of Bangladesh)", url: "https://pgcb.org.bd" },
        { name: "DESCO", url: "https://www.desco.org.bd" },
        { name: "DPDC", url: "https://www.dpdc.org.bd" },
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
        { name: "Roads and Highways Department", url: "https://rhd.gov.bd" },
    ]
  },
  {
    category: "Communication and IT",
    icon: <Phone className="h-5 w-5" />,
    websites: [
      { name: "Bangladesh Telecommunication Regulatory Commission", url: "https://btrc.gov.bd" },
      { name: "Posts and Telecommunications Division", url: "https://ptd.gov.bd" },
      { name: "ICT Division", url: "https://ictd.gov.bd" },
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
        { name: "Sylhet City Corporation", url: "https://scc.gov.bd" },
        { name: "Gazipur City Corporation", url: "https://gcc.gov.bd" },
    ]
  },
  {
    category: "Additional Ministries",
    icon: <Building className="h-5 w-5" />,
    websites: [
      { name: "Ministry of Public Administration", url: "https://mpa.gov.bd" },
      { name: "Ministry of Law, Justice and Parliamentary Affairs", url: "https://minlaw.gov.bd" },
      { name: "Ministry of Environment and Forest", url: "https://moef.gov.bd" },
      { name: "Ministry of Water Resources", url: "https://mowr.gov.bd" },
      { name: "Ministry of Information and Broadcasting", url: "https://moi.gov.bd" },
      { name: "Ministry of Cultural Affairs", url: "https://moca.gov.bd" },
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
        { name: "Department of Social Services", url: "https://dss.gov.bd" },
    ]
  },
  {
    category: "Planning and Development",
    icon: <Calendar className="h-5 w-5" />,
    websites: [
      { name: "Planning Commission", url: "https://planningcommission.gov.bd" },
      { name: "General Economics Division", url: "https://ged.gov.bd" },
        { name: "Bangladesh Bureau of Statistics", url: "https://bbs.gov.bd" },
        { name: "Bangladesh Public Procurement Authority (BPPA)", url: "https://bppa.gov.bd" },
        { name: "Economic Relations Division", url: "https://erd.gov.bd" },
    ]
  }
  ,
  {
      category: "Administrative Directory",
      icon: <FileText className="h-5 w-5" />,
      websites: [
        { name: "Ministries & Divisions (List)", url: "https://bangladesh.gov.bd/site/view/ministry_n_directorate_list" },
        { name: "Directorates & Other Offices (List)", url: "https://bangladesh.gov.bd/site/page/3c1910f1-686d-4a57-9400-0b2743241438/Directorates-and-Other-Offices" },
        { name: "Divisions (8)", url: "https://bangladesh.gov.bd/site/view/division-list/List-of-Divisions" },
        { name: "Districts (64)", url: "https://bangladesh.gov.bd/site/view/district-list/District-List" },
        { name: "Upazilas (495)", url: "https://bangladesh.gov.bd/site/view/upazila-list/Upazilla-List" },
        { name: "Unions (4554)", url: "https://bangladesh.gov.bd/site/view/union-list/Union-List" },
      ]
    }
];

// Memoized WebsiteItem component with local favicon cache fallback
const WebsiteItem = ({ website }: { website: { name: string; url: string } }) => {
  const getLocalIconPath = useCallback((url: string) => {
    try {
      const { hostname } = new URL(url);
      const override = (iconOverrides as Record<string, string>)[hostname];
      if (override) return override;
      const mapped = (iconMap as Record<string, string>)[hostname];
      if (mapped) return mapped;
      // If no known mapping, use our local universal fallback to avoid flicker
      return '/site-icons/fall_back-favicon.png';
    } catch {
      return '/site-icons/fall_back-favicon.png';
    }
  }, []);

  return (
    <li>
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/40 transition-colors"
      >
        <img
          src={getLocalIconPath(website.url)}
          alt="site icon"
          className="w-5 h-5 rounded-sm border border-border/40 bg-card flex-shrink-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/site-icons/fall_back-favicon.png';
          }}
        />
        <span className="text-foreground flex-grow text-sm">
          {website.name}
        </span>
      </a>
    </li>
  );
};

// Memoized CategoryCard component with simplified, clean style
const CategoryCard = ({ category }: { category: typeof governmentWebsites[0] }) => {
  const { t } = useLanguage();

  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-200 overflow-hidden",
      "rounded-xl border border-border/70 bg-gradient-to-br from-primary/5 via-background to-secondary/5",
      "shadow-sm hover:shadow"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 border border-green-200 flex items-center justify-center">
            {category.icon}
          </div>
          <CardTitle className="text-lg font-semibold">
            {t(`categories.${category.category}`)}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
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
  const [isClient, setIsClient] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Handle scroll effect for header
  useEffect(() => {
    setIsClient(true);
    
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

  // Function to handle opening email with subject
  const handleEmailClick = (subject: string) => {
    const email = "support@bdgovlinks.com";
    const body = "";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Don't render scroll-dependent elements until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <header className="sticky top-0 z-10 bg-transparent border-b border-transparent">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Landmark className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-foreground">BdGovLinks</h1>
                  <p className="text-[0.65rem] sm:text-xs text-muted-foreground -mt-0.5 sm:-mt-1">{t('subtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Rest of the page content would go here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "BdGovLinks - Bangladesh Government Website Directory",
            "url": "https://bdgovlinks.com",
            "description": "Unofficial directory of Bangladesh government websites. Find all government services, ministries, and public services in one place.",
            "keywords": "Bangladesh government websites, Bangladesh government directory, government services Bangladesh, Bangladesh public services",
            "inLanguage": "en",
            "publisher": {
              "@type": "Organization",
              "name": "BdGovLinks",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bdgovlinks.com/logo.png"
              }
            }
          })
        }}
      />
      
      {/* Header with scroll effect */}
      <header className={`sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent border-b border-transparent'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Landmark className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">BdGovLinks</h1>
                <p className="text-[0.65rem] sm:text-xs text-muted-foreground -mt-0.5 sm:-mt-1">{t('subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12 relative">
        <HeroParticles />
        <div className="text-center mb-10 sm:mb-16 pt-4 sm:pt-8 relative z-10">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 mb-6 sm:mb-8 shadow-lg">
            <BangladeshFlagIcon className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
            {t('title')}
          </h1>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-primary mb-6 sm:mb-8">
            {t('subtitle')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl sm:max-w-4xl mx-auto px-4 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="max-w-2xl sm:max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="relative group">
            <SearchIcon className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-200 w-5 h-5 sm:w-6 sm:h-6" />
            <Input
              placeholder={t('searchPlaceholder')}
              className="pl-12 sm:pl-14 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-md border-border focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-200"
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
              <div
                key={index}
                className={cn(
                  "h-full",
                  category.category === 'Administrative Directory' && "lg:col-span-2"
                )}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button 
              variant="outline" 
              className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              onClick={() => handleEmailClick(t('reportBrokenLink'))}
            >
              {t('reportBrokenLink')}
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              onClick={() => handleEmailClick(t('suggestNewWebsite'))}
            >
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="flex items-center gap-2">
              <BangladeshFlagIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-foreground text-sm sm:text-base">BdGovLinks</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
                {t('copyright', new Date().getFullYear())}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border ${language === 'en' ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground hover:text-foreground'}`}
                >
                  {t('english')}
                </button>
                <button 
                  onClick={() => setLanguage('bn')}
                  className={`text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border ${language === 'bn' ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground hover:text-foreground'}`}
                >
                  {t('bangla')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}