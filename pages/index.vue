<template>
  <div class="min-h-screen bg-background">
    <header
      class="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70"
    >
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="rounded-lg bg-primary/10 p-2">
              <Landmark class="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            </div>
            <div>
              <span class="text-lg font-bold text-foreground sm:text-xl">BdGovLinks</span>
              <p class="-mt-0.5 text-[0.65rem] text-muted-foreground sm:-mt-1 sm:text-xs">
                {{ t('subtitle') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div
      class="relative container mx-auto px-4 pb-8 pt-0 before:absolute before:inset-x-0 before:top-0 before:h-[26rem] before:-z-10 before:bg-gradient-to-b before:from-primary/10 before:via-background/0 before:to-transparent before:content-[''] sm:pb-12"
    >
      <HeroParticles />
      <div
        class="relative z-10 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(16,122,74,0.1),_transparent_65%)] pt-4 text-center after:absolute after:inset-x-0 after:-bottom-12 after:h-20 after:bg-gradient-to-t after:from-background after:to-transparent after:opacity-80 after:content-[''] sm:mb-16 sm:pt-8"
      >
        <div class="relative z-10">
          <div class="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 shadow-lg sm:mb-8 sm:p-4">
            <BangladeshFlagIcon class="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h1
            class="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:mb-6 sm:text-5xl md:text-6xl md:leading-[1.1]"
          >
            {{ t('title') }}
          </h1>
          <h2
            class="mb-6 text-lg font-semibold text-primary text-balance sm:mb-8 sm:text-3xl md:text-4xl"
          >
            {{ t('subtitle') }}
          </h2>
          <p
            class="mx-auto px-4 text-base leading-relaxed text-muted-foreground text-pretty sm:max-w-4xl sm:text-xl"
          >
            {{ t('description') }}
          </p>
        </div>
      </div>

      <div class="mx-auto mb-10 mt-6 max-w-2xl sm:mb-14 sm:mt-10 sm:max-w-3xl">
        <div class="group relative">
          <SearchIcon
            class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-hover:text-foreground sm:left-5 sm:h-5 sm:w-5"
          />
          <input
            v-model="searchTerm"
            :placeholder="t('searchPlaceholder')"
            type="search"
            class="w-full rounded-xl border border-border bg-background/90 py-3.5 pl-11 pr-4 text-sm text-foreground shadow-[0_6px_16px_-8px_rgba(16,122,74,0.18)] transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 sm:py-4 sm:pl-12 sm:text-base"
          />
        </div>
      </div>

      <div class="mb-6 text-center sm:mb-8">
        <p class="text-sm text-muted-foreground sm:text-base">
          {{ t('websitesFound', websiteCount) }}
        </p>
      </div>

      <div
        v-if="filteredWebsites.length === 0"
        class="py-8 text-center sm:py-12"
      >
        <h3 class="mb-2 text-lg font-semibold sm:text-xl">{{ t('noWebsitesFound') }}</h3>
        <p class="text-sm text-muted-foreground sm:text-base">{{ t('tryAdjustingSearch') }}</p>
      </div>
      <div v-else class="mb-12 space-y-6 sm:mb-16 md:space-y-8">
        <div class="space-y-3 md:hidden">
          <details
            v-for="category in filteredWebsites"
            :key="`mobile-${category.category}`"
            class="group overflow-hidden rounded-xl border border-border/70 bg-gradient-to-b from-background/95 via-background to-secondary/5 shadow-sm transition-all duration-200 open:shadow-md"
          >
            <summary
              class="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors marker:hidden hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span class="flex items-center gap-3">
                <span
                  class="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/12 text-primary"
                >
                  <component :is="category.icon" class="h-5 w-5" />
                </span>
                <span class="text-base">
                  {{ t(`categories.${category.category}`) }}
                </span>
              </span>
              <ChevronDown
                class="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div class="border-t border-border/70 bg-background/90 px-4 pb-4 pt-3">
              <ul class="space-y-2">
                <li v-for="website in category.websites" :key="website.url">
                  <a
                    :href="website.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <LazyIcon
                      :src="website.iconPath"
                      alt="site icon"
                      class-name="mt-0.5 h-5 w-5 flex-shrink-0 rounded-sm border border-border/40 bg-card"
                    />
                    <span class="flex-grow text-sm font-medium text-foreground leading-snug">
                      {{ website.name }}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </details>
        </div>

        <div
        class="hidden md:flex md:flex-wrap gap-4 sm:gap-6 lg:gap-6"
        >
          <div
            v-for="category in filteredWebsites"
            :key="category.category"
            class="h-full w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]"
          >
              <div
                class="group flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
              <div class="px-4 pb-3 pt-4 flex-none">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/15 text-primary transition-colors duration-200 group-hover:bg-primary/20"
                  >
                    <component :is="category.icon" class="h-5 w-5" />
                  </div>
                  <h3 class="text-lg font-semibold">
                    {{ t(`categories.${category.category}`) }}
                  </h3>
                </div>
              </div>
              <div class="flex-grow px-4 pb-4 min-h-0">
                <ul class="space-y-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                  <li v-for="website in category.websites" :key="website.url">
                    <a
                      :href="website.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <LazyIcon
                        :src="website.iconPath"
                        alt="site icon"
                        class-name="h-5 w-5 flex-shrink-0 rounded-sm border border-border/40 bg-card"
                      />
                      <span class="flex-grow truncate text-sm font-medium text-foreground">
                        {{ website.name }}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 text-center sm:mt-16">
        <div class="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <a
            href="https://form.jotform.com/252802295373055"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full rounded-full border border-border bg-background px-4 py-2 text-center text-sm text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary/5 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
          >
            {{ t('reportBrokenLink') }}
          </a>
          <a
            href="https://form.jotform.com/252802295373055"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full rounded-full border border-border bg-background px-4 py-2 text-center text-sm text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary/5 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
          >
            {{ t('suggestNewWebsite') }}
          </a>
        </div>
        <div class="mx-auto max-w-2xl px-2 text-xs text-muted-foreground sm:text-sm">
          <p>
            {{ t('directoryInfo') }}
          </p>
          <p class="mt-2 text-[0.7rem] sm:text-xs">
            {{ language === 'bn' ? 'সর্বশেষ আপডেট: ২ জানুয়ারি ২০২৬' : 'Last updated: 2nd Jan 2026' }}
          </p>
        </div>
      </div>
    </div>

    <footer
      class="relative border-t border-border bg-background before:absolute before:inset-x-0 before:top-0 before:h-12 before:bg-gradient-to-b before:from-primary/10 before:via-background before:to-transparent before:content-['']"
    >
      <div class="container relative z-10 mx-auto px-4 py-6">
        <div class="flex flex-col items-center gap-4 md:grid md:grid-cols-2">
          <div class="order-1 flex justify-center md:order-2 md:justify-end">
            <div class="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 p-0.5 shadow-sm backdrop-blur-sm">
              <button
                type="button"
                aria-label="Switch to English"
                @click="setLanguage('en')"
                :class="[
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm',
                  language === 'en'
                    ? 'border border-primary/30 bg-primary/5 text-primary'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground',
                ]"
              >
                {{ t('english') }}
              </button>
              <button
                type="button"
                aria-label="Switch to Bangla"
                @click="setLanguage('bn')"
                :class="[
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm',
                  language === 'bn'
                    ? 'border border-primary/30 bg-primary/5 text-primary'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground',
                ]"
              >
                {{ t('bangla') }}
              </button>
            </div>
          </div>
          <div class="order-2 text-center text-xs text-muted-foreground md:order-1 md:text-left sm:text-sm">
            <span>
              © {{ currentYear }} BdGovLinks.
              {{ language === 'bn' ? 'তৈরি করেছেন' : 'Made by' }}
            </span>
            <a
              href="https://x.com/rezaul_arif"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground underline-offset-2 hover:underline"
            >
              {{ language === 'bn' ? 'আরিফ' : 'Arif' }}
            </a>
            <span v-if="language !== 'bn'">.</span>
          </div>
        </div>
      </div>
    </footer>

    <ScrollToTopButton />
  </div>
</template>

<script setup lang="ts">
import {
  Building,
  Calendar,
  Car,
  ChevronDown,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  Leaf,
  MapPin,
  Phone,
  Scale,
  Users,
  Wallet,
  Zap,
} from 'lucide-vue-next';
import {
  Shield,
  Anchor,
  AlertTriangle,
  CheckCircle,
} from 'lucide-vue-next';
import type { Component } from 'vue';
import { computed, ref } from 'vue';

import BangladeshFlagIcon from '~/components/BangladeshFlagIcon.vue';
import HeroParticles from '~/components/HeroParticles.client.vue';
import LazyIcon from '~/components/LazyIcon.vue';
import ScrollToTopButton from '~/components/ScrollToTopButton.client.vue';
import SearchIcon from '~/components/SearchIcon.vue';
import { useLanguage } from '~/composables/useLanguage';
import iconOverridesJson from '~/utils/site-icons-overrides.json';
import iconMapJson from '~/utils/site-icons.json';
import { translations } from '~/utils/translations';

const iconMap = iconMapJson as Record<string, string>;
const iconOverrides = iconOverridesJson as Record<string, string>;

type WebsiteEntry = {
  name: string;
  url: string;
};

type WebsiteEntryWithMeta = WebsiteEntry & {
  iconPath: string;
  nameLower: string;
};

type CategoryName = keyof typeof translations.en.categories;

type GovernmentCategorySeed = {
  category: CategoryName | (string & {});
  icon: Component;
  websites: WebsiteEntry[];
};

type GovernmentCategory = {
  category: CategoryName | (string & {});
  icon: Component;
  websites: WebsiteEntryWithMeta[];
  categoryLower: string;
};

const normalizeText = (value: string) => value.toLowerCase();

const getLocalIconPath = (url: string): string => {
  try {
    const { hostname } = new URL(url);
    if (iconOverrides[hostname]) return iconOverrides[hostname];
    if (iconMap[hostname]) return iconMap[hostname];
    return '/site-icons/fall_back-favicon.png';
  } catch {
    return '/site-icons/fall_back-favicon.png';
  }
};

const buildWebsiteEntry = (website: WebsiteEntry): WebsiteEntryWithMeta => ({
  ...website,
  iconPath: getLocalIconPath(website.url),
  nameLower: normalizeText(website.name),
});

const governmentWebsitesSeed: GovernmentCategorySeed[] = [
  {
    category: 'Core Government',
    icon: Landmark,
    websites: [
      { name: "Prime Minister's Office", url: 'https://pmo.gov.bd' },
      { name: "President's Office", url: 'https://president.gov.bd' },
      { name: 'Jatiya Sangsad (National Parliament)', url: 'https://www.parliament.gov.bd' },
      { name: "Prime Minister's Office (Old)", url: 'https://old.pmo.gov.bd' },
      { name: 'Cabinet Division', url: 'https://cabinet.gov.bd' },
      { name: "Chief Adviser's Office", url: 'https://cao.gov.bd' },
    ],
  },
  {
    category: 'Key Ministries',
    icon: Building,
    websites: [
      { name: 'Ministry of Finance', url: 'https://mof.gov.bd' },
      { name: 'Ministry of Foreign Affairs', url: 'https://mofa.gov.bd' },
      { name: 'Ministry of Home Affairs', url: 'https://mha.gov.bd' },
      { name: 'Ministry of Education', url: 'https://moedu.gov.bd' },
      { name: 'Ministry of Health and Family Welfare', url: 'https://mohfw.gov.bd' },
      { name: 'Ministry of Agriculture', url: 'https://moa.gov.bd' },
      { name: 'Ministry of Planning', url: 'https://mop.gov.bd' },
      { name: 'Ministry of Commerce', url: 'https://mincom.gov.bd' },
      { name: 'Ministry of Industries', url: 'https://moind.gov.bd' },
    ],
  },
  {
    category: 'Public Services',
    icon: Users,
    websites: [
      { name: 'Passport Office', url: 'https://passport.gov.bd' },
      { name: 'e-Passport', url: 'https://www.epassport.gov.bd' },
      { name: 'National Identity Registration', url: 'https://nidw.gov.bd' },
      { name: 'NBR e-Tax', url: 'https://etaxnbr.gov.bd' },
      { name: 'BRTA Service Portal', url: 'https://bsp.brta.gov.bd/?lan=en' },
      { name: 'Bangladesh Post Office', url: 'https://bdpost.gov.bd' },
      { name: 'Land Administration', url: 'https://landadministration.gov.bd' },
      { name: 'Teletalk Bangladesh', url: 'https://teletalk.com.bd' },
      { name: 'Department of Immigration & Passports', url: 'https://dip.gov.bd' },
      { name: 'Online Visa Portal', url: 'https://visa.gov.bd' },
      { name: 'Bangladesh Customs', url: 'https://customs.gov.bd' },
    ],
  },
  {
    category: 'E-Governance',
    icon: Globe,
    websites: [
      { name: 'Bangladesh Portal', url: 'https://bangladesh.gov.bd' },
      { name: 'Digital Bangladesh', url: 'https://digitalbangladesh.gov.bd' },
      { name: 'e-GP (Electronic Government Procurement)', url: 'https://www.eprocure.gov.bd' },
      { name: 'Access to Information (a2i)', url: 'https://a2i.gov.bd' },
      { name: 'Bangladesh Computer Council', url: 'https://bcc.gov.bd' },
      { name: 'MyGov', url: 'https://mygov.bd' },
      { name: 'National Dashboard', url: 'https://dashboard.gov.bd' },
      { name: 'Government Gazette (DPP)', url: 'https://dpp.gov.bd' },
    ],
  },
  {
    category: 'Law and Judiciary',
    icon: Scale,
    websites: [
      { name: 'Supreme Court of Bangladesh', url: 'https://supremecourt.gov.bd' },
      { name: "Attorney General's Office", url: 'https://ago.gov.bd' },
      { name: 'Bangladesh Bar Council', url: 'https://barcouncil.gov.bd' },
      { name: 'Law Commission', url: 'https://lawcommission.gov.bd' },
      { name: 'Judiciary of Bangladesh', url: 'https://judiciary.gov.bd' },
      { name: 'Bangladesh Laws (BDLaws)', url: 'http://bdlaws.minlaw.gov.bd' },
    ],
  },
  {
    category: 'Economic Institutions',
    icon: Wallet,
    websites: [
      { name: 'Bangladesh Bank', url: 'https://www.bb.org.bd' },
      { name: 'National Board of Revenue (NBR)', url: 'https://nbr.gov.bd' },
      { name: 'Securities and Exchange Commission (SEC)', url: 'https://sec.gov.bd' },
      { name: 'BIDA (Bangladesh Investment Development Authority)', url: 'https://bida.gov.bd' },
      { name: 'Export Promotion Bureau', url: 'https://epb.gov.bd' },
      { name: 'BEZA (Bangladesh Economic Zones Authority)', url: 'https://beza.gov.bd' },
      { name: 'BEPZA (Bangladesh Export Processing Zones Authority)', url: 'https://www.bepza.gov.bd' },
      { name: 'Bangladesh Steel & Engineering Corporation (BSEC)', url: 'https://bsec.gov.bd' },
      { name: 'Bangladesh Trade Portal', url: 'https://bangladeshtradeportal.gov.bd' },
      { name: 'Bangladesh Trade & Tariff Commission', url: 'https://btc.gov.bd' },
    ],
  },
  {
    category: 'Education and Research',
    icon: GraduationCap,
    websites: [
      { name: 'University Grants Commission', url: 'https://ugc.ac.bd' },
      { name: 'National University', url: 'https://nu.ac.bd' },
      { name: 'Dhaka University', url: 'https://du.ac.bd' },
      { name: 'Bangladesh Open University', url: 'https://bou.edu.bd' },
      { name: 'Bangladesh Technical Education Board', url: 'https://techedu.gov.bd' },
      { name: 'DSHE (Directorate of Secondary and Higher Education)', url: 'https://dshe.gov.bd' },
      { name: 'SHED (Secondary and Higher Education Division)', url: 'https://shed.gov.bd' },
      { name: 'DPE (Directorate of Primary Education)', url: 'https://dpe.gov.bd' },
      { name: 'Education Board Results', url: 'http://www.educationboardresults.gov.bd' },
    ],
  },
  {
    category: 'Health Services',
    icon: Heart,
    websites: [
      { name: 'Directorate General of Health Services', url: 'https://dghs.gov.bd' },
      { name: 'Directorate General of Family Planning', url: 'https://dgfp.gov.bd' },
      { name: 'Directorate General of Drug Administration', url: 'https://dgda.gov.bd' },
      { name: 'Bangladesh Medical and Dental Council', url: 'https://bmdc.gov.bd' },
      { name: 'IEDCR', url: 'https://iedcr.gov.bd' },
    ],
  },
  {
    category: 'Agriculture and Environment',
    icon: Leaf,
    websites: [
      { name: 'Department of Agricultural Extension', url: 'https://dae.gov.bd' },
      { name: 'Bangladesh Rice Research Institute', url: 'https://brri.gov.bd' },
      { name: 'Department of Environment', url: 'https://doe.gov.bd' },
      { name: 'Forest Department', url: 'https://forest.gov.bd' },
      { name: 'BARC (Bangladesh Agricultural Research Council)', url: 'https://barc.gov.bd' },
      { name: 'BARI (Bangladesh Agricultural Research Institute)', url: 'https://bari.gov.bd' },
      { name: 'Department of Fisheries', url: 'https://fisheries.gov.bd' },
      { name: 'Department of Cooperatives', url: 'https://coop.gov.bd' },
      { name: 'Bangladesh Water Development Board', url: 'https://bwdb.gov.bd' },
    ],
  },
  {
    category: 'Energy and Utilities',
    icon: Zap,
    websites: [
      { name: 'Ministry of Power, Energy and Mineral Resources', url: 'https://mopemr.gov.bd' },
      { name: 'Bangladesh Power Development Board', url: 'https://bpdb.gov.bd' },
      { name: 'Rural Electrification Board', url: 'https://reb.gov.bd' },
      { name: 'Sylhet Gas Fields Limited', url: 'https://sgfl.gov.bd' },
      { name: 'Petrobangla', url: 'https://petrobangla.org.bd' },
      { name: 'PGCB (Power Grid Company of Bangladesh)', url: 'https://pgcb.org.bd' },
      { name: 'DESCO', url: 'https://www.desco.org.bd' },
      { name: 'DPDC', url: 'https://www.dpdc.org.bd' },
    ],
  },
  {
    category: 'Transport and Infrastructure',
    icon: Car,
    websites: [
      { name: 'Bangladesh Road Transport Authority', url: 'https://brta.gov.bd' },
      { name: 'Bangladesh Railway', url: 'https://railway.gov.bd' },
      { name: 'Civil Aviation Authority', url: 'https://caab.gov.bd' },
      { name: 'Bangladesh Bridge Authority', url: 'https://bridgeauthority.gov.bd' },
      { name: 'Bangladesh Inland Water Transport Authority', url: 'https://biwta.gov.bd' },
      { name: 'Roads and Highways Department', url: 'https://rhd.gov.bd' },
      { name: 'Chittagong Port Authority', url: 'https://cpa.gov.bd' },
      { name: 'Department of Shipping', url: 'https://dos.gov.bd' },
    ],
  },
  {
    category: 'Communication and IT',
    icon: Phone,
    websites: [
      { name: 'Bangladesh Telecommunication Regulatory Commission', url: 'https://btrc.gov.bd' },
      { name: 'Posts and Telecommunications Division', url: 'https://ptd.gov.bd' },
      { name: 'ICT Division', url: 'https://ictd.gov.bd' },
      { name: 'Software Technology Park', url: 'https://stp.gov.bd' },
    ],
  },
  {
    category: 'Local Government',
    icon: MapPin,
    websites: [
      { name: 'Dhaka City Corporation', url: 'https://dcc.gov.bd' },
      { name: 'Chittagong City Corporation', url: 'https://ccc.gov.bd' },
      { name: 'Khulna City Corporation', url: 'https://kcc.gov.bd' },
      { name: 'Rajshahi City Corporation', url: 'https://rcc.gov.bd' },
      { name: 'Barishal City Corporation', url: 'https://barcc.gov.bd' },
      { name: 'Sylhet City Corporation', url: 'https://scc.gov.bd' },
      { name: 'Gazipur City Corporation', url: 'https://gcc.gov.bd' },
      { name: 'Rangpur City Corporation', url: 'https://rpcc.gov.bd' },
      { name: 'Narayanganj City Corporation', url: 'https://ncc.gov.bd' },
      { name: 'Comilla City Corporation', url: 'https://comillacc.gov.bd' },
      { name: 'Mymensingh City Corporation', url: 'https://mymensinghcc.gov.bd' },
    ],
  },
  {
    category: 'Additional Ministries',
    icon: Building,
    websites: [
      { name: 'Ministry of Public Administration', url: 'https://mopa.gov.bd' },
      {
        name: 'Ministry of Law, Justice and Parliamentary Affairs',
        url: 'https://minlaw.gov.bd',
      },
      { name: 'Ministry of Environment and Forest', url: 'https://moef.gov.bd' },
      { name: 'Ministry of Water Resources', url: 'https://mowr.gov.bd' },
      { name: 'Ministry of Information and Broadcasting', url: 'https://moi.gov.bd' },
      { name: 'Ministry of Cultural Affairs', url: 'https://moca.gov.bd' },
      { name: 'Ministry of Defence', url: 'https://mod.gov.bd' },
      { name: 'Ministry of Shipping', url: 'https://mos.gov.bd' },
      { name: 'Ministry of Food', url: 'https://mofood.gov.bd' },
      { name: 'Ministry of Textiles & Jute', url: 'https://motj.gov.bd' },
      { name: 'Ministry of Disaster Management & Relief', url: 'https://modmr.gov.bd' },
      { name: 'Ministry of Expatriates Welfare', url: 'https://probashi.gov.bd' },
      { name: 'Ministry of Science & Technology', url: 'https://most.gov.bd' },
      { name: 'Ministry of Youth & Sports', url: 'https://moysports.gov.bd' },
    ],
  },
  {
    category: 'Social Services',
    icon: Users,
    websites: [
      { name: 'Ministry of Women and Children Affairs', url: 'https://mowca.gov.bd' },
      { name: 'Ministry of Religious Affairs', url: 'https://mora.gov.bd' },
      { name: 'Ministry of Labour and Employment', url: 'https://mole.gov.bd' },
      { name: 'BRDB (Bangladesh Rural Development Board)', url: 'https://brdb.gov.bd' },
      { name: 'Department of Social Services', url: 'https://dss.gov.bd' },
    ],
  },
  {
    category: 'Planning and Development',
    icon: Calendar,
    websites: [
      { name: 'Planning Commission', url: 'https://planningcommission.gov.bd' },
      { name: 'General Economics Division', url: 'https://ged.gov.bd' },
      { name: 'Bangladesh Bureau of Statistics', url: 'https://bbs.gov.bd' },
      {
        name: 'Bangladesh Public Procurement Authority (BPPA)',
        url: 'https://bppa.gov.bd',
      },
      { name: 'Economic Relations Division', url: 'https://erd.gov.bd' },
    ],
  },
  {
    category: 'Security and Defense',
    icon: Shield,
    websites: [
      { name: 'Bangladesh Police', url: 'https://www.police.gov.bd' },
      { name: 'Bangladesh Army', url: 'https://www.army.mil.bd' },
      { name: 'Bangladesh Navy', url: 'https://www.navy.mil.bd' },
      { name: 'Bangladesh Air Force', url: 'https://www.baf.mil.bd' },
      { name: 'Border Guard Bangladesh (BGB)', url: 'https://www.bgb.gov.bd' },
      { name: 'Rapid Action Battalion (RAB)', url: 'https://www.rab.gov.bd' },
      { name: 'ISPR (Inter Services Public Relations)', url: 'https://ispr.gov.bd' },
      { name: 'Special Branch', url: 'https://specialbranch.gov.bd' },
      { name: 'National Defence College', url: 'https://ndc.gov.bd' },
    ],
  },
  {
    category: 'Regulatory Commissions',
    icon: CheckCircle,
    websites: [
      { name: 'Bangladesh Election Commission', url: 'https://ecs.gov.bd' },
      { name: 'Anti-Corruption Commission', url: 'https://acc.gov.bd' },
      { name: 'Bangladesh Public Service Commission', url: 'https://bpsc.gov.bd' },
      { name: 'Bangladesh Atomic Energy Commission', url: 'https://baec.gov.bd' },
      { name: 'Bangladesh Food Safety Authority', url: 'https://bfsa.gov.bd' },
      { name: 'Information Commission', url: 'https://infocom.gov.bd' },
      { name: 'Human Rights Commission', url: 'https://nhrc.org.bd' },
      { name: 'Bangladesh Energy Regulatory Commission', url: 'https://berc.gov.bd' },
    ],
  },
  {
    category: 'Disaster and Emergency',
    icon: AlertTriangle,
    websites: [
      { name: 'Fire Service & Civil Defence', url: 'https://fireservice.gov.bd' },
      { name: 'Department of Disaster Management', url: 'https://ddm.gov.bd' },
      { name: 'Bangladesh Meteorological Department', url: 'https://bmd.gov.bd' },
      { name: 'Flood Forecasting & Warning Centre', url: 'https://ffwc.gov.bd' },
      { name: 'Cyclone Preparedness Programme', url: 'https://cpp.gov.bd' },
      { name: 'Space Research & Remote Sensing (SPARRSO)', url: 'https://sparrso.gov.bd' },
    ],
  },
  {
    category: 'Maritime and Ports',
    icon: Anchor,
    websites: [
      { name: 'Mongla Port Authority', url: 'https://mpa.gov.bd' },
      { name: 'Payra Port Authority', url: 'https://ppa.gov.bd' },
      { name: 'Bangladesh Shipping Corporation', url: 'https://bsc.gov.bd' },
      { name: 'Department of Mercantile Marine', url: 'https://dmm.gov.bd' },
      { name: 'Bangladesh Maritime University', url: 'https://bsmrmu.edu.bd' },
    ],
  },
  {
    category: 'Administrative Directory',
    icon: FileText,
    websites: [
      {
        name: 'Ministries & Divisions (List)',
        url: 'https://bangladesh.gov.bd/site/view/ministry_n_directorate_list',
      },
      {
        name: 'Directorates & Other Offices (List)',
        url: 'https://bangladesh.gov.bd/site/page/3c1910f1-686d-4a57-9400-0b2743241438/Directorates-and-Other-Offices',
      },
      {
        name: 'Divisions (8)',
        url: 'https://bangladesh.gov.bd/site/view/division-list/List-of-Divisions',
      },
      {
        name: 'Districts (64)',
        url: 'https://bangladesh.gov.bd/site/view/district-list/District-List',
      },
      {
        name: 'Upazilas (495)',
        url: 'https://bangladesh.gov.bd/site/view/upazila-list/Upazilla-List',
      },
      {
        name: 'Unions (4554)',
        url: 'https://bangladesh.gov.bd/site/view/union-list/Union-List',
      },
    ],
  },
];

const governmentWebsites: GovernmentCategory[] = governmentWebsitesSeed.map((category) => ({
  ...category,
  categoryLower: normalizeText(category.category),
  websites: category.websites.map(buildWebsiteEntry),
}));

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BdGovLinks - Bangladesh Government Website Directory',
  url: 'https://bdgovlinks.com',
  description:
    'Unofficial directory of Bangladesh government websites. Find all government services, ministries, and public services in one place.',
  keywords:
    'Bangladesh government websites, Bangladesh government directory, government services Bangladesh, Bangladesh public services',
  inLanguage: 'en',
  publisher: {
    '@type': 'Organization',
    name: 'BdGovLinks',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bdgovlinks.com/logo.png',
    },
  },
};

const structuredDataJson = JSON.stringify(structuredData);

useHead({
  script: [
    {
      key: 'structured-data',
      type: 'application/ld+json',
      innerHTML: structuredDataJson,
    },
  ],
});

const searchTerm = ref('');

const filteredWebsites = computed(() => {
  const rawTerm = searchTerm.value.trim();
  if (!rawTerm) {
    return governmentWebsites;
  }

  const searchLower = rawTerm.toLowerCase();
  const searchWords =
    searchLower.length > 2
      ? searchLower.split(/\s+/).filter((word) => word.length > 0)
      : [];

  const filterCategory = (category: GovernmentCategory) => {
    const categoryLower = category.categoryLower;

    if (searchLower.length <= 2) {
      const filteredSites = category.websites.filter((website) => {
        const websiteLower = website.nameLower;
        return (
          websiteLower.includes(searchLower) || categoryLower.includes(searchLower)
        );
      });

      return filteredSites.length > 0
        ? { ...category, websites: filteredSites }
        : null;
    }

    const filteredSites = category.websites.filter((website) => {
      const websiteLower = website.nameLower;
      const combinedText = `${websiteLower} ${categoryLower}`;

      if (combinedText.includes(searchLower)) {
        return true;
      }

      const allWordsMatch = searchWords.every(
        (word) => websiteLower.includes(word) || categoryLower.includes(word),
      );
      if (allWordsMatch) {
        return true;
      }

      if (combinedText.includes(searchWords.join(''))) {
        return true;
      }

      if (searchWords.length > 1) {
        const regexPattern = searchWords.join('[\\s\\-_]*');
        try {
          const regex = new RegExp(regexPattern, 'i');
          return regex.test(combinedText);
        } catch {
          return false;
        }
      }

      return false;
    });

    return filteredSites.length > 0
      ? { ...category, websites: filteredSites }
      : null;
  };

  return governmentWebsites
    .map(filterCategory)
    .filter((category): category is GovernmentCategory => Boolean(category));
});

const websiteCount = computed(() =>
  filteredWebsites.value.reduce((total, category) => total + category.websites.length, 0),
);

const currentYear = new Date().getFullYear();

const { language, setLanguage, t } = useLanguage();
</script>
